import {chromium} from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
await page.addInitScript(()=>{sessionStorage.setItem('cv-entered','1');Element.prototype.requestPointerLock=()=>{};Element.prototype.setPointerCapture=()=>{};});
page.on('pageerror',e=>console.log('ERROR:',e.message));
await page.goto('http://localhost:3000',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
const selectors=['#home','#briefing','#crew','.breach','#plan','.elimination','#escape','#vault','#loot','#identity','#rules','#schedule','#venue','#join'];
const shots=[];
for(const [i,s] of selectors.entries()){await page.locator(s).evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY,behavior:'instant'}));await page.waitForTimeout(200);const path=`artifacts/section-${i}.jpg`;await page.screenshot({path,quality:78});shots.push(path);}
const tiles=await Promise.all(shots.map(p=>sharp(p).resize(360,225).toBuffer()));await sharp({create:{width:1440,height:900,channels:3,background:'#222'}}).composite(tiles.map((input,i)=>({input,left:i%4*360,top:Math.floor(i/4)*225}))).jpeg({quality:90}).toFile('artifacts/sections.jpg');
await page.setViewportSize({width:390,height:844});await page.goto('http://localhost:3000',{waitUntil:'networkidle'});await page.screenshot({path:'artifacts/mobile-hero.png'});
console.log('Overflow:',await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth})));
await browser.close();
