

## Deployment

Deploy website with
**npm run deploy**

Afterwards, site can be found in:
**https://nipatsku.github.io/tabz/**

## Automated tests

Run tests with
**npm run test**

### Unit tests

Unit test source files are located in **test/\*.test.ts**

Used tools:

- *Mocha*
    - Testing framework
- *chai*
    - Assertion library
- *sinon*
    - Mainly used for spying on method calls
- *typemoq*
    - Type-safe mocking

### Syntax and code-convention tests

*tslint*

## Absolute imports

Not working with *create-react-app* 2
Don't want to upgrade to version 3, because it enforces *eslint* with no way of overriding rules. Sticking to shitty relative imports instead.

## Conflicts with .buildnames.json

Solution, run following command in local repository:

`git update-index --skip-worktree .buildnames.json`
