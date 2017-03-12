'use strict';

const test = require('ava');

const Emitter = require('../');
const Rx = require('rxjs/Rx');

test.cb('Subscribe method returns data passed to the publish', t => {
  t.plan(1);
  const emitter = new Emitter();

  emitter.subscribe('event', (result) => {
    t.is(result, 'data');
    t.end();
  });
  emitter.publish('event', 'data');
});

test.cb('Combine several events', t => {
  t.plan(2);
  const emitter = new Emitter();

  Rx.Observable
    .combineLatest(
      emitter.subject('event1'),
      emitter.subject('event2')
    )
    .subscribe(([event1, event2]) => {
      t.is(event1, 'data1');
      t.is(event2, 'data2');

      t.end();
    }, err => t.fail(err.message));

  emitter.publish('event1', 'data1');
  emitter.publish('event2', 'data2');
});

test.cb('Events can be combined or used separately', t => {
  t.plan(4);

  const emitter = new Emitter();

  emitter.subscribe('event1', data => {
    t.is(data, 'data1');
  });

  emitter.subscribe('event2', data => {
    t.is(data, 'data2');
  });

  Rx.Observable.combineLatest(
    emitter.subject('event1'),
    emitter.subject('event2')
  ).subscribe(([event1, event2]) => {
    t.is(event1, 'data1');
    t.is(event2, 'data2');

    t.end();
  }, err => t.fail(err.message));

  emitter.publish('event1', 'data1');
  emitter.publish('event2', 'data2');
});

test.cb('Configure emitter with ReplaySubject', t => {
  t.plan(1);
  const emitter = new Emitter({
    event: () => new Rx.ReplaySubject(1)
  });
  emitter.publish('event', 'data');

  emitter.subscribe('event', result => {
    t.is(result, 'data');
    t.end();
  });
});
