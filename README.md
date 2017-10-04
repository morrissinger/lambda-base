# Lambda Base

A base project for developing functions for [Amazon Web Services](http://aws.amazon.com) [Lambda](https://aws.amazon.com/lambda/). This is
set up to allow development in the ECMAScript2017, using many of the latest
language features, whether or not supported by the Lambda runtime, and includes
a number of tools that are useful when developing Lambda functions.

## Why this Exists

As I began to develop more interesting Lambda functions, I found that I needed
a more full assortment of features available by-default. Transpiling from
EC2017 was an early initial requirement, which led me to install Babel. At that
point, I needed a build system, which led me to install Gulp. I needed to be
able to do test-driven development of my work, which led to a number of
additional development dependencies. I wanted clean code, requiring ESLint.
Finally, I wanted to automate the task of packaging up the code for deployment
into Lambda.

This base embodies a number of opinions, but it shouldn't be too much trouble
to make modifications to the setup if your opinions should be different.

## Getting Started

To get started, you must install dependencies using `npm`:

```sh
npm install
```

You should also have the [Gulp](https://gulpjs.com/) CLI installed globally:

```sh
npm install -g gulp-cli
```

To run the Lambda, use `npm`:

```sh
npm start
```

## Workflow
General workflow is write code -> build -> test -> trigger -> package.

Build lambda into compatible JavaScript for Lambda runtime:
```sh
npm run build
```

Run tests:
```sh
npm test
```

Trigger the lambda locally, providing optional JSON for event and context
arguments:
```sh
gulp trigger --event="$(cat myEventJson.json)" --context="$(cat myContextJson.json)"
```

Package the lambda into a zip file that can be uploaded to S3 and specified
during Lambda creation using the AWS management console or CLI:
```sh
npm run package
```

## Features

The base project contains a number of useful features, as follows.

### ECMAScript2017 via Babel
Babel is included by default, with ES17 code going in the `./src` directory, with
the transpiled target in `./lib`. You can control which language features you
allow via the `.babelrc` file. You can transpile using NPM:

```sh
npm run build
```


### ESlint
Even Lambda functions should be free from lint! [ESLint](https://eslint.org) works out of the box:

```sh
npm run lint
```

By default, the `.eslintrc.json` file is configured for the [AirBnB Style Guide](https://github.com/airbnb/javascript).

### Gulp
You should generally build, test, and package using `npm` because the scripts
defined there are responsible for setting the correct Node environment per
phase. However, if you are interested in the task definitions, they are defined
here.

Gulp tasks are organized in the `./tasks` directory, and included in via the
base `gulpfile.babel.js`. You can author tasks using ES2017 and Gulp is
configured to be able to understand everything, including `import` statements.

Included tasks fall into three categories: (i) building (or transpiling); (ii)
testing; and (iii) packaging for Lambda. The following is a description of all
available tasks:

#### Building
1. `build-babel`: Transpile all ES17 in `./src` into the `./lib` target,
recursively.
2. `build-assets`: Copy all additional assets from `./src` into the `./lib`
target, recursively.
3. `build-clean`: Remove the `./lib` directory, cleaning the target.
4. `build`: Combination of (1) and (2), above.

#### Testing
1. `test`: Run all tests in the `./test` directory.
2. `watch`: Watch the source directory for changes and continually re-run tests
automatically.

#### Packaging
1. `package-build`: Organize all files needed for upload to Lambda into the
`./pkg` target.
2. `package-zip`: Zip all files in the `./pkg` target into `lambda.zip` at the
root of the project.
3. `package-clean`: Remove the `./pkg` directory, cleaning the target.
4. `package-remove`: Remove the `lambda.zip` file, if it exists.
5. `package`: Combination of (1), (2), and (3), above, in order.

### Testing
Tests run in the [Ava](https://github.com/avajs/ava) test runner. [Sinon](http://sinonjs.org/),
and [Babel-Plugin-Rewire](https://github.com/speedskater/babel-plugin-rewire) are
available in the project by default.

A Sinon spy can be fed to the Lambda function as the callback during unit
tests, and Rewire can be used to monkey-patch external dependencies (including)
other AWS services that your Lambda function would ordinarily have access to
IAM roles in production. This makes it possible to fully unit test Lambda
functions.
