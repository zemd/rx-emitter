# Rx-Emitter

Simple emitter based on Rx.Subject.

[![npm version](https://badge.fury.io/js/rx-emitter.svg)](https://badge.fury.io/js/rx-emitter)
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

[![gitcheese.com](https://api.gitcheese.com/v1/projects/22444f9f-460b-4d48-8fc4-a185328f4d0e/badges)](https://www.gitcheese.com/app/#/projects/22444f9f-460b-4d48-8fc4-a185328f4d0e/pledges/create)
