# `@azz/generator-npm-package`

[![Travis](https://img.shields.io/travis/azz/generator-npm-package.svg?style=flat-square)](https://travis-ci.org/azz/generator-npm-package)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/@azz/generator-npm-package.svg?style=flat-square)](https://npmjs.org/packages/@azz/generator-npm-package)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)

> An opinionated npm package bootstrapper

## Features

* [`prettier`](https://prettier.io)
* [`pretty-quick`](https://github.com/azz/pretty-quick) and [`husky`](https://github.com/typicode/husky)
* [`eslint`](https://eslint.org/) with:
  * `eslint:recommended`
  * `eslint-plugin-prettier`
  * `eslint-plugin-jest`
* [`babel`](https://babeljs.io) with `babel-preset-env`
* [`jest`](https://facebook.github.io/jest/)
* [`semantic-release`](https://github.com/semantic-release/semantic-release)

## Install

First, install [Yeoman](http://yeoman.io) and generator-npm-package using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
yarn global add yo @azz/generator-npm-package
```

## Use

```bash
yo @azz/npm-package
```

## Prompt

```shellsession
$ yo @azz/npm-package
  _ __  _ __  _ __ ___        _ __   __ _  ___| | ____ _  __ _  ___
 | '_ \| '_ \| '_ ` _ \ _____| '_ \ / _` |/ __| |/ / _` |/ _` |/ _ \
 | | | | |_) | | | | | |_____| |_) | (_| | (__|   < (_| | (_| |  __/
 |_| |_| .__/|_| |_| |_|     | .__/ \__,_|\___|_|\_\__,_|\__, |\___|
       |_|                   |_|                         |___/
? package name? my-pkg
? package description? My package description
? full name (First Last)? John Citizen
? GitHub username or organization? jcitizen
```

## Produces

```shellsession
$ tree -I node_modules
.
├── LICENSE
├── README.md
├── dist
│   └── index.js
├── package.json
├── src
│   └── index.js
└── yarn.lock

2 directories, 6 files
```
