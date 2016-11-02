# Rx-Emitter

Simple emitter based on Rx.Subject.

[![npm version](https://badge.fury.io/js/rx-emitter.svg)](https://www.npmjs.com/package/rx-emitter)
[![Build Status](https://travis-ci.org/zemd/rx-emitter.svg?branch=master)](https://travis-ci.org/zemd/rx-emitter)
[![Code Climate](https://codeclimate.com/github/zemd/rx-emitter/badges/gpa.svg)](https://codeclimate.com/github/zemd/rx-emitter)
[![CircleCI](https://circleci.com/gh/zemd/rx-emitter/tree/master.svg?style=svg)](https://circleci.com/gh/zemd/rx-emitter/tree/master)


## Installation

```sh
npm install rx-emitter
```

or

```sh
yarn add rx-emitter
```

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

## Donate

[![](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/red_rabbit)
[![](https://img.shields.io/badge/flattr-donate-yellow.svg)](https://flattr.com/profile/red_rabbit)

