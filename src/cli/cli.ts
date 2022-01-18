import yargs from "yargs";
import path from "path";
import fs from "fs-extra";
import { Dockerfile } from "../lib/dockerfile";
import glob from "glob-promise";

export function cli() {
    yargs
        .option("typescript", {
            alias: "t",
            description: "Force loading of ts-node",
            type: "boolean",
            default: false,
        })
        .option("out-file", {
            alias: "f",
            description: "Outfile (default to terminal)",
            type: "string",
            default: "-",
        })
        .option("out-dir", {
            alias: "o",
            description: "Outdir (required for globs)",
            type: "string",
        })
        .command(
            "$0 <file>",
            "Generate Dockerfile",
            (args) =>
                args.positional("file", {
                    type: "string",
                    required: true,
                }),
            async (argv) => {
                try {
                    if (argv.typescript || argv.file!.match(/\.ts$/)) {
                        require("ts-node/register");
                    }

                    if (isGlobbing(argv.file!) && !argv.outDir) {
                        throw new Error(
                            '"out-dir" is required for glob inputs'
                        );
                    }

                    if (isGlobbing(argv.file!)) {
                        const files = await glob(argv.file!);
                        const outDir = path.resolve(argv.outDir!);
                        for(const file of files) {
                            const basename = path.basename(file, path.extname(file));
                            const content = await convertFile(file);
                            await writeTo(content, path.join(outDir, `${basename}.Dockerfile`));
                        }
                    } else {
                        const content = await convertFile(argv.file!);
                        await writeTo(content, argv.outFile);
                        process.stdout.write(content.toString());
                    }

                } catch (e) {
                    console.error(
                        (e as { message: string }).message ?? String(e)
                    );
                    console.log();
                    yargs.showHelp();
                    process.exit(1);
                }
            }
        )
        .parse();
}

async function convertFile(file: string): Promise<Dockerfile> {
    file = path.resolve(file);

    if (!fs.existsSync(file)) {
        throw new Error(`Cannot find file '${file}'`);
    }

    let content = require(file);

    if ("default" in content) {
        content = content.default;
    }

    if (typeof content === "function") {
        content = content();
    }

    content = await content;

    if (!(content instanceof Dockerfile)) {
        throw new Error("Expected Dockerfile as default export");
    }

    return content;
}

async function writeTo(content: Dockerfile, out: string) {
    if('-' === out) {
        console.log(content.toString());
    } else {
        const filePath = path.resolve(out);
        const dirname = path.dirname(filePath);
        await fs.mkdirp(dirname);
        await fs.writeFile(filePath, content.toString());
    }
}

function isGlobbing(file: string): boolean {
    return file.includes("*") || file.includes("{") || file.includes("(");
}

if(require.main === module) {
    cli();
}
