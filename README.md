# @neoskop/dockerfile.js

Write configurable, scriptable, reusable dockerfiles in Typescript or plain Javascript.

Master  
[![Travis master][travis-master-image]][travis-master-url]
[![Test coverage master][coveralls-master-image]][coveralls-master-url]

Develop  
[![Travis develop][travis-develop-image]][travis-develop-url]
[![Test coverage develop][coveralls-develop-image]][coveralls-develop-url]

## Usage

### CLI

`dockerfile-js dockerfile.ts` Generates the dockerfile  
`dockerfile-js dockerfile.ts | docker build -f - .` Build a docker image from the generated dockerfile

### Typescript:
```typescript
import { dockerfile, stage, image, run } from "@neoskop/dockerfile.js";

export default dockerfile().stages(
    stage().from(image('node'))
           .commands(
               run('node --version')
            )
);
```

### Javascript:  
```javascript
const { dockerfile, stage, image, run } = require("@neoskop/dockerfile.js");

module.exports = dockerfile().stages(
    stage().from(image('node'))
           .commands(
               run('node --version')
            )
);
```

Static, factory and async factory export possible.

```typescript
export default dockerfile().stages(...);
export default () => dockerfile().stages(...);
export default async () => dockerfile().stages(...);

module.exports = dockerfile().stages(...);
module.exports = () => dockerfile().stages(...);
module.exports = async () => dockerfile().stages(...);
```

### Documentation

See [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/) for general dockerfile usage. Documentation for dockerfile.js not yet available. Look at the sources for usage details.

**Commands**

* [ADD](./src/lib/commands/add.ts)
* [ARG](./src/lib/commands/arg.ts)
* [CMD](./src/lib/commands/cmd.ts)
* [COPY](./src/lib/commands/copy.ts)
* [ENTRYPOINT](./src/lib/commands/entrypoint.ts)
* [ENV](./src/lib/commands/env.ts)
* [EXPOSE](./src/lib/commands/expose.ts)
* [FROM](./src/lib/commands/from.ts)
* [HEALTHCHECK](./src/lib/commands/healthcheck.ts)
* [LABEL](./src/lib/commands/label.ts)
* [ONBUILD](./src/lib/commands/onbuild.ts)
* [RUN](./src/lib/commands/run.ts)
* [STOPSIGNAL](./src/lib/commands/stopsignal.ts)
* [USER](./src/lib/commands/user.ts)
* [VOLUME](./src/lib/commands/volume.ts)
* [WORKDIR](./src/lib/commands/workdir.ts)
* [RAW](./src/lib/commands/raw.ts)

**Misc**

* [Dockfile](./src/lib/dockerfile.ts)
* [Stage](./src/lib/stage.ts)
* [Multistage](./src/lib/multistage.ts)
* [Image](./src/lib/image.ts)


## Testing

This package uses Jest with the ts-jest extension for testing. The following test commands are available

`yarn test` Single test run  
`yarn test:watch` Reruns the tests on file changes  
`yarn test:cov` Generates a coverage report  
`yarn test:debug` Start the test in debug mode  

## Versioning

This package follows [SemVer](https://semver.org/) and uses [@neoskop/flow-bump](https://github.com/neoskop/flow-bump) for versioning.

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details

[travis-master-image]: https://img.shields.io/travis/neoskop/dockerfile.js/master.svg
[travis-master-url]: https://travis-ci.org/neoskop/dockerfile.js
[travis-develop-image]: https://img.shields.io/travis/neoskop/dockerfile.js/develop.svg
[travis-develop-url]: https://travis-ci.org/neoskop/dockerfile.js
[coveralls-master-image]: https://coveralls.io/repos/github/neoskop/dockerfile.js/badge.svg?branch=master
[coveralls-master-url]: https://coveralls.io/github/neoskop/dockerfile.js?branch=master
[coveralls-develop-image]: https://coveralls.io/repos/github/neoskop/dockerfile.js/badge.svg?branch=develop
[coveralls-develop-url]: https://coveralls.io/github/neoskop/dockerfile.js?branch=develop