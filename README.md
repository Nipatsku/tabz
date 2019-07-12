

## Deployment

Deploy website with
**npm run deploy**

Afterwards, site can be found in:
**https://nipatsku.github.io/tabz/**

## Automated tests

Unit tests are compiled from *TypeScript* files (test/), ran with *Mocha*, using *chai* as assertion library.

*tslint* is used for syntax and code safety testing.

Run tests with
**npm run test**

## Absolute imports

Not working with *create-react-app* 2
Don't want to upgrade to version 3, because it enforces *eslint* with no way of overriding rules. Sticking to shitty relative imports instead.

## Conflicts with .buildnames.json

Solution, run following command in local repository:
git update-index --skip-worktree .buildnames.json
