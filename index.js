'use strict';

const Rx = require('rxjs');

// private store for all subjects
const subjects = new WeakMap();
const configs = new WeakMap();

const createSubject = (context, key) => {
  const conf = configs.get(context);
  return typeof conf[key] === 'function' ? conf[key]() : new Rx.Subject();
};

const getSubject = (context, key) => {
  let v = subjects.get(context);
  if (!(key in v)) {
    v[key] = createSubject(context, key);
    subjects.set(context, v);
  }
  return v[key];
};

class Emitter {

  constructor(config) {
    subjects.set(this, Object.create(null));
    configs.set(this, config || {});
  }

  subscribe(name, successFn, errorFn) {
    return getSubject(this, name).subscribe(successFn, errorFn);
  }

  subject(name) {
    return getSubject(this, name).asObservable();
  }

  publish(name, data) {
    let subj = getSubject(this, name);
    subj.next(data);
    return this;
  }
}

module.exports = Emitter;
