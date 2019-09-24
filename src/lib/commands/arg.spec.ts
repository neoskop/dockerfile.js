import { arg } from './arg';
import { variableTests } from './variable.tests';

describe('Arg', () => {
    variableTests('ARG', true, arg);
})