from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from pathlib import Path
W,H=595.28,841.89
out=Path('public/documents/codeverse-rulebook.pdf')
c=canvas.Canvas(str(out),pagesize=(W,H));c.setTitle('CodeVerse 2.0 - Public Rulebook');c.setAuthor('DJS CODEAI')
ink=HexColor('#20261d');muted=HexColor('#5d6653');red=HexColor('#bc3027');paper=HexColor('#f2efe5')
def text(x,y,s,size=11,font='Helvetica',color=ink):
 c.setFillColor(color);c.setFont(font,size);c.drawString(x,y,s)
def base(n,label):
 c.setFillColor(paper);c.rect(0,0,W,H,fill=1,stroke=0)
 c.setFillColor(red);c.rect(44,H-48,507,3,fill=1,stroke=0)
 text(44,H-76,'DJS CODEAI / CODEVERSE 2.0',9,'Helvetica-Bold')
 text(44,45,'PUBLIC INTELLIGENCE / 09 OCTOBER 2026',8,color=muted)
 text(490,45,f'{n:02d} / 04',8,color=muted)
 text(44,H-128,label,30,'Helvetica-Bold')
def block(y,label,lines):
 text(44,y,label,15,'Helvetica-Bold',red)
 for line in lines:
  y-=20;text(44,y,line,11)
 return y-38
base(1,'THE HEIST. THE RULES.')
c.drawImage('public/media/hero.webp',44,400,width=507,height=285,mask='auto',preserveAspectRatio=False)
text(44,362,'45 CREWS. 2-3 PER CREW. ONE MINT.',18,'Helvetica-Bold')
y=block(323,'THE OPERATION',[
 '9 October 2026 | 08:00 to 18:00 IST',
 'Dwarkadas J. Sanghvi College of Engineering, Mumbai',
 'A heist-themed technology event by DJS CODEAI.',
 'Get in. Take control of the mint. Get out before the walls close in.'
])
y=block(y,'BEFORE YOU REGISTER',[
 'Registration: 29 September to 6 October 2026, via Unstop.',
 'Fee: INR 99. Per-person or per-crew basis is yet to be confirmed.',
 'The final Unstop link will be supplied by the event team.',
 'Contact Adish Shah: +91 98194 86535 for confirmation.'
])
text(44,85,'Fan-inspired event theme. Not affiliated with Netflix.',9,color=muted)
c.showPage();base(2,'CREW PROTOCOL')
y=block(660,'01 / TWO OR THREE TO A CREW',[
 'Minimum two, maximum three participants per crew. No solo entries.',
 'A maximum of 45 crews enter the operation.',
 'Open to everyone: any college, any branch, any experience level.'
])
y=block(y,'02 / BRING YOUR TOOLS',[
 'Laptop, laptop charger and college ID.',
 'Arrive during the 08:00 to 09:00 registration window.',
 'Attend the opening ceremony and rules briefing.'
])
y=block(y,'03 / KEEP IT ORIGINAL',[
 'Original work only. No plagiarism.',
 'No one gets hurt. Respect other crews and the event team.',
 'Task details and operational instructions are provided on event day.'
])
y=block(y,'04 / YOUR CREW ID',[
 'The website generates a downloadable codename souvenir locally.',
 'Your name is not uploaded by the crew ID generator.',
 'A souvenir crew ID is not a registration confirmation or entry pass.'
])
text(44,118,'The plan is only as good as the crew executing it.',15,'Helvetica-Oblique')
text(44,92,'THE PROFESSOR',9,color=red)
c.showPage();base(3,'THE PLAN & THE TIMELINE')
y=block(660,'PHASE 01 / INSIDE THE MINT',[
 '10:00 to 13:30. Complete the tasks fast, and complete them right.',
 'Only the top 10 crews advance. Task details remain classified.'
])
y=block(y,'PHASE 02 / THE ESCAPE',[
 '14:30 to 16:30. Every decision matters.',
 'The first crew to collect every hint wins.',
 'The actual route and task details are revealed at the briefing.'
])
text(44,y,'OPERATION TIMELINE / ALL TIMES IST',14,'Helvetica-Bold',red);y-=35
slots=[('08:00 - 09:00','Crew registration'),('09:00 - 09:30','Opening ceremony and rules briefing'),('10:00 - 13:30','Phase 01: Inside the Mint'),('13:30 - 14:30','Break / reset'),('14:30 - 16:30','Phase 02: The Escape'),('16:30 - 17:15','Final score evaluation'),('17:15 - 18:00','Prize distribution')]
for time,label in slots:
 c.setStrokeColor(HexColor('#d6d7c8'));c.line(44,y-13,551,y-13)
 text(44,y,time,10,'Helvetica-Bold');text(167,y,label,11);y-=36
c.showPage();base(4,'THE PAYOFF & THE TARGET')
y=block(660,'INR 25,000 / TOTAL PRIZE POOL',[
 'First crew out: INR 12,000 + trophy',
 'Second crew out: INR 8,000 + trophy',
 'Third crew out: INR 5,000 + trophy',
 'Every participant receives an e-certificate.'
])
y=block(y,'THE MINT / DJSCE MUMBAI',[
 'Dwarkadas J. Sanghvi College of Engineering',
 'Bhaktivedanta Swami Marg, Vile Parle (West), Mumbai',
 '9 October 2026. Registration desk opens at 08:00.'
])
y=block(y,'CONTACT THE EVENT TEAM',[
 'Adish Shah | +91 98194 86535',
 'Call or WhatsApp: +91 98194 86535',
 'Instagram: @djscodeai'
])
c.linkURL('https://wa.me/919819486535',(44,y+30,360,y+115),relative=0)
text(44,155,'THE PROFESSOR HAS A PLAN.',23,'Helvetica-Bold')
text(44,120,'ALL HE NEEDS IS YOUR CREW.',23,'Helvetica-Bold',red)
c.save()
print(out)
