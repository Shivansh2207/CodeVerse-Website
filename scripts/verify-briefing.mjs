import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const errors=[];const results=[];page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>sessionStorage.setItem('cv-entered','1'));
const test=async(name,fn)=>{await fn();results.push(name);console.log('PASS',name)};
const position=async()=>{await page.evaluate(()=>scrollTo({top:document.getElementById('briefing').offsetTop,behavior:'instant'}));await page.waitForTimeout(600)};
try{
 await page.goto('http://localhost:3000',{waitUntil:'networkidle'});await position();
 const section=page.locator('#briefing'),stage=section.locator('[data-chapter]'),tabs=section.getByRole('tab');
 await test('scene loads and briefing has one visible transcript',async()=>{
  assert.equal(await section.locator('img').evaluate(e=>e.complete&&e.naturalWidth>0),true);assert.equal(await section.getByRole('tabpanel').count(),1);assert.equal(await page.locator('h1').count(),1);
 });
 await test('chapter clicks and keyboard expose the matching transcript',async()=>{
  for(let i=0;i<3;i++){await tabs.nth(i).click();assert.equal(await tabs.nth(i).getAttribute('aria-selected'),'true');assert.equal(await section.getByRole('tabpanel').getAttribute('id'),'briefing-panel-'+i)}
  await tabs.nth(2).press('Home');assert.equal(await stage.getAttribute('data-chapter'),'0');await tabs.nth(0).press('ArrowRight');assert.equal(await stage.getAttribute('data-chapter'),'1');await tabs.nth(1).press('End');assert.equal(await stage.getAttribute('data-chapter'),'2');
 });
 await test('scroll advances all three chapters without trapping focus',async()=>{
  await page.evaluate(()=>document.activeElement.blur());
  for(const [p,i] of [[.5,1],[0,0],[.5,1],[.9,2]]){await page.evaluate(p=>{const e=document.getElementById('briefing');scrollTo({top:e.offsetTop+(e.offsetHeight-e.firstElementChild.offsetHeight)*p,behavior:'instant'})},p);await page.waitForTimeout(200);assert.equal(await stage.getAttribute('data-chapter'),String(i));assert.ok(Math.abs((await stage.boundingBox()).y)<2)}
 });
 await test('pointer adds restrained scene depth',async()=>{await page.mouse.move(200,220);await page.waitForTimeout(200);const before=await stage.evaluate(e=>e.style.getPropertyValue('--px'));await page.mouse.move(1200,350);await page.waitForTimeout(200);assert.notEqual(await stage.evaluate(e=>e.style.getPropertyValue('--px')),before)});
 for(const [width,height] of [[1920,1080],[1440,900],[1366,768],[1024,900],[768,1024],[430,932],[390,844],[360,800]]){
  await test(`responsive dossier and chapter controls at ${width}px`,async()=>{
   await page.setViewportSize({width,height});await position();assert.equal(await section.evaluate(e=>e.scrollWidth>innerWidth+1),false);
   for(let i=0;i<3;i++){
    await tabs.nth(i).click();await page.waitForTimeout(600);const panel=await section.getByRole('tabpanel').boundingBox();assert.ok(panel.x>=0&&panel.x+panel.width<=width);
    if(width>900){const footer=await section.locator('footer').boundingBox();const header=await section.locator('header').boundingBox();assert.ok(panel.y+panel.height<footer.y,`panel overlaps footer at ${width}, ${i}`);assert.ok(panel.y>header.y+header.height,`panel overlaps heading at ${width}`)}
   }
   await tabs.nth(0).click();await page.evaluate(()=>document.activeElement.blur());await position();await page.mouse.move(0,0);await page.waitForTimeout(700);
   if(width>900)await page.screenshot({path:`artifacts/briefing-final-${width}.png`});else await section.screenshot({path:`artifacts/briefing-final-${width}.png`,style:'.mobile-join{visibility:hidden}'});
  });
 }
 await test('reduced motion removes pinning and keeps every chapter accessible',async()=>{
  await page.setViewportSize({width:1440,height:900});await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'networkidle'});await position();assert.equal(await stage.evaluate(e=>getComputedStyle(e).position),'relative');await tabs.nth(2).click();assert.equal(await stage.getAttribute('data-chapter'),'2');assert.equal(await section.getByRole('tabpanel').evaluate(e=>getComputedStyle(e).animationName),'none');
 });
 await test('briefing CTA reaches crew selection',async()=>{await section.getByRole('link',{name:'ASSEMBLE YOUR CREW'}).click();await page.waitForFunction(()=>document.getElementById('crew').getBoundingClientRect().top<130)});
 await test('no browser exceptions',async()=>assert.deepEqual(errors,[]));
 await fs.writeFile('artifacts/briefing-verification.json',JSON.stringify({passed:results,errors},null,2));
}finally{await browser.close()}
