# Rx-Emitter

Simple emitter based on Rx.Subject.

[![Build Status](https://travis-ci.org/zemd/rx-emitter.svg?branch=master)](https://travis-ci.org/zemd/rx-emitter)
[![Code Climate](https://codeclimate.com/github/zemd/rx-emitter/badges/gpa.svg)](https://codeclimate.com/github/zemd/rx-emitter)

## Usage

```javascript
class Application extends Emitter {
}

const app = new Application();

app.subscribe('loaded', () => {
  console.log('Loaded event has been fired successfully!');
});

Rx.Observable.combineLatest(
  app.subject('loaded'),
  app.subject('model-ready')
)
.subscribe(() => {
  console.log('Two events were fired in any order');
});


app.publish('loaded');

```

## Configuration

You can configure emitter with different types of Subject.

Example:

```javascript

class Application extends Emitter {
  constructor() {
    super({
      loaded: () => new Rx.ReplaySubject(1)
    });

    this.publish('loaded');
  }
}

const app = new Application();
app.subscribe('loaded', () => {
  console.log('Application loaded!');
});

```

## License
Rx-Emitter is released under the Apache 2.0 license.

[pull-request]: https://github.com/zemd/rx-emitter/pull/new/master
