import {chromium} from 'playwright';
import fs from 'node:fs/promises';
// Existing, reviewed artwork is edited into a short film. No network media dependencies.
const browser=await chromium.launch({channel:'chrome'});
const page=await browser.newPage();
await page.goto('http://localhost:3000/?intro=0',{waitUntil:'domcontentloaded'});
for(const portrait of [false,true]){
 const data=await page.evaluate(async(portrait)=>{
  const load=src=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error(src));image.src=src;});
  const [brief,city,crew,hero,...frames]=await Promise.all([
   '/media/briefing-room-v2.webp','/media/escape-city.webp','/media/crew-final-cta.jpg','/media/hero-reference-v4.webp',
   ...Array.from({length:45},(_,i)=>`/vault-frames/frame_${String(i+1).padStart(3,'0')}.webp`)
  ].map(load));
  const canvas=document.createElement('canvas');const W=canvas.width=portrait?720:1600,H=canvas.height=portrait?1280:900;
  const c=canvas.getContext('2d');const stream=canvas.captureStream(30);
  const recorder=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp9',videoBitsPerSecond:portrait?2200000:3200000});
  const chunks=[];recorder.ondataavailable=e=>chunks.push(e.data);const ended=new Promise(resolve=>recorder.onstop=resolve);
  function shot(img,x,y,w,h,zoom=1,fx=.5,fy=.5){c.save();c.beginPath();c.rect(x,y,w,h);c.clip();const scale=Math.max(w/img.width,h/img.height)*zoom;const dw=img.width*scale,dh=img.height*scale;c.drawImage(img,x+(w-dw)*fx,y+(h-dh)*fy,dw,dh);c.restore();}
  recorder.start();const start=performance.now();
  await new Promise(resolve=>{function frame(now){const t=(now-start)/1000;c.fillStyle='#050505';c.fillRect(0,0,W,H);
   if(t<2.1){
    c.filter='grayscale(1) contrast(1.2) brightness(.72)';
    const photos=[city,frames[0],brief];
    photos.forEach((img,i)=>{const x=portrait?0:i*W/3,y=portrait?i*H/3:0,w=portrait?W:W/3,h=portrait?H/3:H;shot(img,x+3,y+3,w-6,h-6,1.12+t*.018,i===2?.24:.55,.5);});
    c.filter='none';c.fillStyle='rgba(25,42,39,.17)';c.fillRect(0,0,W,H);
    c.fillStyle='rgba(0,0,0,.25)';for(let y=0;y<H;y+=5)c.fillRect(0,y,W,1);
    c.fillStyle='rgba(223,30,24,.12)';c.fillRect(0,(t*.4%1)*H,W,3);
   }else if(t<4.1){shot(brief,0,0,W,H,1.03+(t-2.1)*.055,portrait?.10:.35,.55);}
   else if(t<6.8){const p=(t-4.1)/2.7;const index=Math.min(44,Math.floor(Math.pow(p,.8)*44));shot(frames[index],0,0,W,H,1.18-p*.18,.54,.5);}
   else if(t<8.2){const p=(t-6.8)/1.4;shot(crew,0,0,W,H,1.14-p*.08,portrait?.38:.5,.52);}
   else {shot(hero,0,0,W,H,1.04,.65,.5);c.fillStyle=`rgba(0,0,0,${Math.min(1,(t-8.2)*4)})`;c.fillRect(0,0,W,H);}
   // Restrained red light leak on edit points, never a full-screen flash.
   const edge=Math.min(...[2.1,4.1,6.8].map(v=>Math.abs(t-v)));
   if(edge<.18){const g=c.createLinearGradient(0,0,W,0);g.addColorStop(0,`rgba(190,15,7,${(.18-edge)*1.6})`);g.addColorStop(.6,'transparent');c.fillStyle=g;c.fillRect(0,0,W,H);}
   const vignette=c.createRadialGradient(W*.5,H*.48,W*.13,W*.5,H*.5,Math.max(W,H)*.7);vignette.addColorStop(0,'transparent');vignette.addColorStop(1,'rgba(0,0,0,.72)');c.fillStyle=vignette;c.fillRect(0,0,W,H);
   if(t<8.6)requestAnimationFrame(frame);else resolve();}requestAnimationFrame(frame);});
  recorder.stop();await ended;stream.getTracks().forEach(track=>track.stop());const bytes=new Uint8Array(await new Blob(chunks).arrayBuffer());let binary='';for(let i=0;i<bytes.length;i+=32768)binary+=String.fromCharCode(...bytes.subarray(i,i+32768));return btoa(binary);
 },portrait);
 const filename=`public/media/heist-intro${portrait?'-mobile':''}.webm`;await fs.writeFile(filename,Buffer.from(data,'base64'));console.log(filename,Buffer.from(data,'base64').length);
}
await browser.close();

