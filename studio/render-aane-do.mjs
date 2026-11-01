import path from 'node:path';
import {mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill} from '@remotion/renderer';
const studio=path.dirname(fileURLToPath(import.meta.url));
const out=path.resolve(studio,'../examples/aane-do');
await mkdir(out,{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(studio,'src/index.ts')});
for(const [id,name] of [['AaneDoWhatIfFrame','wide'],['AaneDoClose','close'],['AaneDoDetail','detail']]) {
 const composition=await selectComposition({serveUrl,id});
 const output=path.join(out,`${name}.png`);
 await renderStill({serveUrl,composition,frame:0,output,overwrite:true});
 console.log(output);
}
