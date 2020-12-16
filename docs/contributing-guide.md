# Contributing Guide

## Code of Conduct

Read our [contributing guide](#) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to React.

## Branch Organization

Submit all changes to the `dev` branch.

Code that lands in `master` must be compatible with the latest stable release. It may contain additional features, but no breaking changes.

## Bugs

We are using [GitHub Issues](https://github.com/qbaonguyen98/nashtech-de-nodejs-assignment-3/issues) for our public bugs. We keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new task, try to make sure your problem doesn’t already exist.

## Style Guide

We use an automatic code formatter called [Prettier](https://prettier.io/). Run `npm prettier` after making any changes to the code.

[ESLint](https://eslint.org/) linter will catch most issues that may exist in your code. You can check the status of your code styling by simply running `npm run lint:fix`.
