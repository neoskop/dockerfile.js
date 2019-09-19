import yargs from 'yargs';
import path from 'path';
import fs from 'fs';
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
    }), async argv => {
        try {
            if (argv.typescript || argv.file!.match(/\.ts$/)) {
                require('ts-node/register');
            }

            const file = path.resolve(argv.file!);

            if(!fs.existsSync(file)) {
                throw new Error(`Cannot find file '${file}'`);
            }

            let content = require(file);

            if ('default' in content) {
                content = content.default;
            }

            if (typeof content === 'function') {
                content = content();
            }

            content = await content;

            if (!(content instanceof Dockerfile)) {
                throw new Error('Expected Dockerfile as default export');
            }

            process.stdout.write(content.toString());
        } catch (e) {
            console.error(e.message);
            console.log();
            yargs.showHelp();
            process.exit(1);
        }
    }).parse();


}