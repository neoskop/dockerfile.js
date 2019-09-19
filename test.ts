import { image, workdir, stage, from, copy, run, arg, dockerfile } from "./dist";

const nodeImage = image('node', { tag: '10-alpine' });

const wd = workdir('/opt/app');

const base = stage('base')
    .from(nodeImage)
    .commands(
        wd,
        copy('package.json', 'package.raw.json'),
        copy('yarn.lock'),
        run(`node -e "const pkg = require('./package.raw.json'); 
        delete pkg.version; 
        console.log(JSON.stringify(pkg))" > package.dev.json`),
        run(`node -e "const pkg = require('./package.raw.json'); 
        delete pkg.version; 
        delete pkg.devDependencies; 
        console.log(JSON.stringify(pkg))" > package.json`)
    )

const npmrc = arg('NPMRC');
const build = stage()
    .from(base)
    .commands(
        wd,
        npmrc,
        run(`echo "${npmrc}" > /root/.npmrc`)
    )

export default async () => dockerfile().stages(base, build);