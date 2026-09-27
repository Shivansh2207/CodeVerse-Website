import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const errors=[],results=[];page.on('pageerror',e=>errors.push(e.message));
await page.addInitScript(()=>sessionStorage.setItem('cv-entered','1'));
const test=async(name,fn)=>{await fn();results.push(name);console.log('PASS',name)};
const position=async()=>{await page.evaluate(()=>scrollTo({top:document.getElementById('briefing').offsetTop,behavior:'instant'}));await page.waitForTimeout(500)};
try{
 await page.goto('http://localhost:3000',{waitUntil:'networkidle'});await position();
 const section=page.locator('#briefing'),stops=section.getByRole('group',{name:'Explore briefing chapters'}).getByRole('button');
 const panel=section.getByRole('region',{name:'Selected briefing chapter'});
 const previous=section.getByRole('button',{name:'Previous briefing chapter'}),next=section.getByRole('button',{name:'Next briefing chapter'});
 await test('marquee separates hero and briefing and pause control works',async()=>{
  const marquee=page.getByRole('region',{name:'Operation at a glance'});
  await marquee.scrollIntoViewIfNeeded();await page.mouse.move(0,0);await page.waitForTimeout(150);
  const track=marquee.locator('[class*="track"]');
  const before=await track.evaluate(e=>getComputedStyle(e).transform);await page.waitForTimeout(200);assert.notEqual(await track.evaluate(e=>getComputedStyle(e).transform),before);
  await marquee.getByRole('button',{name:'Pause operation marquee'}).click();
  const stopped=await track.evaluate(e=>getComputedStyle(e).transform);await page.waitForTimeout(200);assert.equal(await track.evaluate(e=>getComputedStyle(e).transform),stopped);
  await marquee.getByRole('button',{name:'Play operation marquee'}).click();await page.waitForTimeout(200);assert.notEqual(await track.evaluate(e=>getComputedStyle(e).transform),stopped);
  assert.equal(await page.evaluate(()=>{const m=document.querySelector('[aria-label="Operation at a glance"]');return m.previousElementSibling.id==='home'&&m.nextElementSibling.id==='briefing'}),true);await position();
 });
 await test('four real route stops and no photographic background',async()=>{assert.equal(await stops.count(),4);assert.equal(await section.locator('img').count(),0);assert.equal(await section.evaluate(e=>getComputedStyle(e).backgroundImage),'none');assert.equal(await page.locator('h1').count(),1)});
 await test('all stops update chapter content and selected state',async()=>{for(let i=0;i<4;i++){await stops.nth(i).click();assert.equal(await stops.nth(i).getAttribute('aria-pressed'),'true');assert.equal(await section.locator('[aria-pressed=true]').count(),1);assert.match(await panel.textContent(),new RegExp('CHAPTER 0'+(i+1)+' / 04'))}});
 await test('previous and next controls respect chapter boundaries',async()=>{assert.equal(await next.isDisabled(),true);for(let i=3;i>0;i--)await previous.click();assert.equal(await previous.isDisabled(),true);await next.click();assert.equal(await stops.nth(1).getAttribute('aria-pressed'),'true')});
 await test('route keyboard navigation supports arrows, Home and End',async()=>{await stops.nth(1).focus();await page.keyboard.press('End');assert.equal(await stops.nth(3).getAttribute('aria-pressed'),'true');await page.keyboard.press('ArrowRight');assert.equal(await stops.nth(0).getAttribute('aria-pressed'),'true');await page.keyboard.press('ArrowDown');assert.equal(await stops.nth(1).getAttribute('aria-pressed'),'true');await page.keyboard.press('Home');assert.equal(await stops.nth(0).getAttribute('aria-pressed'),'true')});
 for(const [width,height] of [[1920,960],[1440,900],[1366,768],[1024,900],[768,1024],[430,932],[390,844],[360,800]]){
  await test(`route and story layout at ${width}px`,async()=>{
   await page.setViewportSize({width,height});await position();
   for(let i=0;i<4;i++){await stops.nth(i).click();await page.waitForTimeout(width<=900?650:350);assert.equal(await section.evaluate(e=>e.scrollWidth>innerWidth+1),false);assert.equal(await page.getByRole('region',{name:'Operation at a glance'}).evaluate(e=>e.scrollWidth>innerWidth+1),false);const box=await panel.boundingBox();assert.ok(box.x>=0&&box.x+box.width<=width+1);if(width<=900)assert.ok(box.y>=-1&&box.y<140,'mobile chapter scrolls into view at '+box.y);}
   await stops.nth(2).click();await page.evaluate(()=>document.activeElement.blur());await position();await page.waitForTimeout(500);
   await section.screenshot({path:`artifacts/briefing-route-${width}.png`,style:'.mobile-join{visibility:hidden}.skip-link{visibility:hidden}'});
  });
 }
 await test('reduced motion shows the complete route and static chapter',async()=>{await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:1440,height:900});await page.reload({waitUntil:'networkidle'});await position();await stops.nth(2).click();assert.equal(await panel.locator('article').evaluate(e=>getComputedStyle(e).animationName),'none');assert.equal(await section.locator('path[pathLength]').evaluate(e=>getComputedStyle(e).strokeDashoffset),'0px')});
 await test('reduced motion keeps marquee static and facts available',async()=>{const m=page.getByRole('region',{name:'Operation at a glance'});assert.equal(await m.locator('[class*=track]').evaluate(e=>getComputedStyle(e).animationName),'none');assert.equal(await m.getByRole('button').isVisible(),false);assert.match(await m.locator('p').textContent(),/45 crews/)});
 await test('assemble crew link reaches the existing crew section',async()=>{await section.getByRole('link',{name:'ASSEMBLE YOUR CREW'}).click();await page.waitForFunction(()=>document.getElementById('crew').getBoundingClientRect().top<130)});
 await test('no browser exceptions',async()=>assert.deepEqual(errors,[]));
 await fs.writeFile('artifacts/briefing-verification.json',JSON.stringify({passed:results,errors},null,2));
}finally{await browser.close()}
