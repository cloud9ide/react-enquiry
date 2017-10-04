'use strict';

const _ = require('underscore');
const chalk = require('chalk');
const fs = require('fs');
const os = require('os');
const path = require('path');
const SDC = require('statsd-client');
const superagent = require('superagent');
const url = require('url');

chalk.enabled = true;

exports.config = {
  colors: true,
  dir: null,
  json: false,
  metrics: true,
  name: os.hostname(),
  statsdUrl: null
};

const streams = {};
let sync = false;
let closed = false;
let sdc;

const LEVELS = ['error', 'warn', 'success', 'info', 'debug'];

const COLORS = {
  debug: chalk.grey,
  error: chalk.red,
  success: chalk.green,
  warn: chalk.yellow
};

const SDC_MAP = {mark: 'set', gauge: 'gauge', time: 'timing'};

const DATADOG_EVENTS_API_URL = 'https://app.datadoghq.com/api/v1/events';

const getStream = target =>
  streams[target] ||
  (streams[target] = fs.createWriteStream(target, {flags: 'a'}));

const getSdc = () => {
  const statsdUrl = exports.config.statsdUrl;
  if (sdc || !statsdUrl) return sdc;
  const parsed = url.parse(statsdUrl);
  return sdc = new SDC({
    prefix: exports.config.name,
    tcp: parsed.protocol === 'tcp:',
    host: parsed.hostname,
    port: parsed.port
  });
};

const write = (type, str) => {
  str += '\n';
  const dir = exports.config.dir;
  if (!dir) return process[type === 'error' ? 'stderr' : 'stdout'].write(str);
  const target = path.resolve(dir, type + '.log');
  if (sync || closed) return fs.appendFileSync(target, str);
  getStream(target).write(str);
};

const log = (level, index, message) => {
  const config = exports.config;
  const max = config.level;
  if (max && LEVELS.indexOf(level) > LEVELS.indexOf(max)) return;
  const iso = (new Date()).toISOString();
  const name = config.name;
  if (config.json) {
    return write(level, JSON.stringify({
      '@timestamp': iso,
      name,
      level,
      message
    }));
  }
  message = `${iso} [${name}] ${level.toUpperCase()} ${message}`;
  const color = !config.dir && config.colors !== false && COLORS[level];
  write(level, color ? color(message) : message);
};

_.each(LEVELS, (level, index) => {
  exports[level] = _.partial(log, level, index);
});

const metric = (type, name, metric) => {
  const sdc = getSdc();
  if (sdc) sdc[SDC_MAP[type]](name, metric);
  if (exports.config.metrics === false) return;
  write('metrics', JSON.stringify({
    '@timestamp': (new Date()).toISOString(),
    app_name: exports.config.name,
    tags: [type],
    service: name,
    metric: metric
  }));
};

exports.mark = _.partial(metric, 'mark', _, 1);

exports.gauge = _.partial(metric, 'gauge');

exports.duration = _.partial(metric, 'time');

exports.time = cb => {
  const start = Date.now();
  cb(name => exports.duration(name, Date.now() - start));
};

exports.sync = () => sync = true;

exports.async = () => { if (!closed) sync = false; };

exports.close = cb => {
  if (closed) return;
  closed = true;
  sync = true;
  let completed = 0;
  const total = Object.keys(streams).length;
  const done = () => { if (++completed === total && cb) cb(); };
  for (const name in streams) streams[name].on('finish', done).end();
  if (sdc) sdc.close();
};

// See http://docs.datadoghq.com/api/#events for options.
exports.event = (data, cb) => {
  if (!cb) cb = _.noop;
  const apiKey = exports.config.datadogApiKey;
  if (!apiKey) return cb();
  superagent
    .post(DATADOG_EVENTS_API_URL)
    .query({api_key: apiKey})
    .send(data)
    .end(cb);
};
