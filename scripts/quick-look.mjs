import {chromium} from 'playwright';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
await page.addInitScript(()=>{sessionStorage.setItem('cv-entered','1');Element.prototype.requestPointerLock=()=>{};Element.prototype.setPointerCapture=()=>{};});
page.on('pageerror',e=>console.log('ERROR',e.message));
await page.goto('http://localhost:3000',{waitUntil:'networkidle'});await page.screenshot({path:'artifacts/hero-before.png'});
console.log(await page.locator('h1').textContent());await browser.close();
