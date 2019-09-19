import yargs from 'yargs';
import path from 'path';
import { Dockerfile } from '../lib/dockerfile';

export function cli() {
    yargs.option('typescript', {
        alias: 't',
        description: 'Force loading of ts-node',
        type: 'boolean',
        default: false
    }).command('$0 <file>', 'Generate Dockerfile', args => args.positional('file', {
        type: 'string',
        required: true
    }), argv => {
        if(argv.typescript || argv.file!.match(/\.ts$/)) {
            require('ts-node/register');
        }

        let content = require(path.resolve(argv.file!));

        if('default' in content) {
            content = content.default;
        }

        if(!(content instanceof Dockerfile)) {
            throw new Error('Expected Dockerfile as default export');
        }
        
        process.stdout.write(content.toString());
    }).parse();

    
}