import { chromium } from 'playwright';
import fs from 'node:fs';
const f=process.argv[2], x=+process.argv[3], y=+process.argv[4], w=+process.argv[5], h=+process.argv[6], z=+(process.argv[7]||2);
const uri='data:image/png;base64,'+fs.readFileSync(f).toString('base64');
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:Math.round(w*z),height:Math.round(h*z)}});
await p.setContent(`<style>html,body{margin:0;overflow:hidden}img{position:absolute;left:0;top:0;transform-origin:0 0;transform:scale(${z}) translate(${-x}px,${-y}px)}</style><img src="${uri}">`,{waitUntil:'load'});
await p.screenshot({path:process.argv[8]||'_crop.png'});
await b.close();
