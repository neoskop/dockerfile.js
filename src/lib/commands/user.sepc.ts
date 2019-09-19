import { user } from './user';

describe('User', () => {
    it('should render user', () => {
        expect(user('usr').toDockerCommand()).toEqual('USER usr');
    });
    
    it('should render user with group', () => {
        expect(user('usr', 'grp').toDockerCommand()).toEqual('USER usr:grp');
    });
})