import { env } from './env';
import { variableTests } from './variable.tests';

describe('Env', () => {
    variableTests('ENV', false, env);
})