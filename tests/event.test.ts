import test from 'node:test';
import assert from 'node:assert/strict';
import {getEventState,currentSlot} from '../src/config/event.ts';
const at=(s:string)=>Date.parse(s);
test('registration windows use IST and include all of 6 October',()=>{
 assert.equal(getEventState(at('2026-09-28T23:59:59+05:30')).key,'soon');
 assert.equal(getEventState(at('2026-09-29T00:00:00+05:30')).key,'open');
 assert.equal(getEventState(at('2026-10-06T23:59:59+05:30')).key,'open');
 assert.equal(getEventState(at('2026-10-07T00:00:00+05:30')).key,'closed');
});
test('live, completed and capacity states',()=>{
 assert.equal(getEventState(at('2026-10-09T08:00:00+05:30')).key,'live');
 assert.equal(getEventState(at('2026-10-09T18:00:00+05:30')).key,'complete');
 assert.equal(getEventState(at('2026-10-01T08:00:00+05:30'),0).key,'full');
 assert.equal(getEventState(at('2026-10-09T08:00:00+05:30'),0).key,'live');
});
test('timeline boundaries and unscheduled gap remain honest',()=>{
 assert.equal(currentSlot(at('2026-10-09T10:00:00+05:30')),2);
 assert.equal(currentSlot(at('2026-10-09T13:30:00+05:30')),3);
 assert.equal(currentSlot(at('2026-10-09T09:45:00+05:30')),-1);
 assert.equal(currentSlot(at('2026-10-10T10:00:00+05:30')),-1);
});
