# @neoskop/dockerfile.js

Write configurable, scriptable, reusable dockerfiles in Typescript or plain Javascript.

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

module.exports dockerfile().stages(...);
module.exports () => dockerfile().stages(...);
module.exports async () => dockerfile().stages(...);
```

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