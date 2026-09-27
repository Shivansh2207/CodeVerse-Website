import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const browser=await chromium.launch({channel:'chrome',headless:true});
const url=process.env.TEST_URL||'http://localhost:3000';
const results=[];
const errors=[];
const context=await browser.newContext({viewport:{width:1440,height:900}});
await context.addInitScript(()=>sessionStorage.setItem('cv-entered','1'));
const page=await context.newPage();
page.on('pageerror',e=>errors.push(e.message));
const check=async(name,fn)=>{await fn();results.push(name);console.log('PASS',name);};
try {
 await page.goto(url,{waitUntil:'networkidle'});
 const hero=page.locator('#home');
 const stage=hero.locator('[data-unlocked]');
 const scene=hero.locator('[data-scene-state]');
 await scene.waitFor();
 await page.waitForTimeout(1900);
 await check('semantic hero and loaded cutout',async()=>{
  assert.equal(await page.locator('h1').count(),1);
  assert.match(await hero.locator('h1').getAttribute('aria-label'),/CodeVerse 2.0/);
  assert.equal(await hero.locator('img').evaluate(el=>el.complete&&el.naturalWidth>0),true);
 });
 await check('pointer drives real scene depth and lighting',async()=>{
  await page.mouse.move(1050,300);await page.waitForTimeout(450);
  const a=await scene.getAttribute('data-scene-state');
  await page.mouse.move(280,380);await page.waitForFunction(()=>Number(document.querySelector('#home [data-scene-state]').dataset.sceneState.split(',')[0])<-.3);
  const b=await scene.getAttribute('data-scene-state');
  assert.notEqual(a,b);assert.ok(Number(b.split(',')[0])<-.3);
  assert.equal(await stage.getAttribute('data-pointer'),'active');
 });
 await check('seal opens geometry and keyboard rearms it',async()=>{
  await page.getByRole('button',{name:'Break the seal',exact:true}).click();
  await page.waitForFunction(()=>Number(document.querySelector('#home [data-scene-state]').dataset.sceneState.split(',')[3])>.95);
  assert.equal(await stage.getAttribute('data-unlocked'),'true');
  assert.ok(Number((await scene.getAttribute('data-scene-state')).split(',')[3])>.95);
  assert.match(await hero.getByRole('status').innerText(),/ACCESS GRANTED/);
  await page.screenshot({path:'artifacts/hero-final-unlocked.png'});
  await page.getByRole('button',{name:'Rearm security',exact:true}).focus();
  await page.keyboard.press('Enter');await page.waitForFunction(()=>Number(document.querySelector('#home [data-scene-state]').dataset.sceneState.split(',')[3])<.05);
  assert.equal(await stage.getAttribute('data-unlocked'),'false');
  assert.ok(Number((await scene.getAttribute('data-scene-state')).split(',')[3])<.05);
 });
 await check('scroll advances the pinned scene and reaches existing content',async()=>{
  await page.evaluate(()=>scrollTo({top:300,behavior:'instant'}));await page.waitForTimeout(250);
  assert.ok(Number((await scene.getAttribute('data-scene-state')).split(',')[2])>.4);
  assert.ok(Math.abs(await stage.evaluate(el=>el.getBoundingClientRect().top))<2);
  await hero.getByRole('link',{name:'The plan',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#briefing').getBoundingClientRect().top<120);
  assert.ok(await page.locator('#briefing').evaluate(el=>el.getBoundingClientRect().top<120));
 });
 for(const [width,height] of [[1920,1080],[1440,900],[1366,768],[1024,900],[768,1024],[430,932],[390,844],[360,800]]){
  await check(`hero layout and controls at ${width}px`,async()=>{
   await page.setViewportSize({width,height});await page.goto(url,{waitUntil:'networkidle'});await page.waitForTimeout(1850);
   assert.equal(await hero.evaluate(el=>el.scrollWidth>innerWidth+1),false);
   if(width>=390)assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
   const cta=hero.getByRole('link',{name:'Join the crew',exact:true});const box=await cta.boundingBox();
   assert.ok(box&&box.x>=0&&box.x+box.width<=width&&box.y+box.height<Math.max(height,850));
   await page.getByRole('button',{name:'Break the seal',exact:true}).click();
   assert.equal(await stage.getAttribute('data-unlocked'),'true');
   await page.getByRole('button',{name:'Rearm security',exact:true}).click();
   await page.mouse.move(0,0);await page.waitForTimeout(1100);
   await page.screenshot({path:`artifacts/hero-final-${width}.png`});
  });
 }
 await check('reduced motion disables the scroll pin and continuous motion',async()=>{
  await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'networkidle'});await scene.waitFor();
  assert.equal(await scene.getAttribute('data-motion'),'reduced');
  assert.equal(await stage.evaluate(el=>getComputedStyle(el).position),'relative');
  const before=await scene.getAttribute('data-scene-state');await page.waitForTimeout(350);
  assert.equal(await scene.getAttribute('data-scene-state'),before);
  await page.getByRole('button',{name:'Break the seal',exact:true}).click();await page.waitForTimeout(100);
  assert.equal((await scene.getAttribute('data-scene-state')).split(',')[3],'1.00');
 });
 await check('WebGL-unavailable fallback keeps hero and controls usable',async()=>{
  const fallback=await browser.newContext({viewport:{width:390,height:844}});
  await fallback.addInitScript(()=>{sessionStorage.setItem('cv-entered','1');const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(kind,...args){if(String(kind).includes('webgl'))return null;return original.call(this,kind,...args);};});
  const p=await fallback.newPage();await p.goto(url,{waitUntil:'networkidle'});await p.waitForTimeout(1500);
  assert.equal(await p.locator('#home canvas').count(),0);
  assert.equal(await p.locator('#home img').evaluate(el=>el.complete&&el.naturalWidth>0),true);
  await p.getByRole('button',{name:'Break the seal',exact:true}).click();
  assert.equal(await p.locator('#home [data-unlocked]').getAttribute('data-unlocked'),'true');
  await p.screenshot({path:'artifacts/hero-fallback.png'});await fallback.close();
 });
 await check('no browser exceptions',async()=>assert.deepEqual(errors,[]));
 await fs.writeFile('artifacts/hero-verification.json',JSON.stringify({passed:results,errors},null,2));
} finally {await browser.close();}
