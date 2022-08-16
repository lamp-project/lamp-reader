import EE, { Emitter } from 'event-emitter';

class Base {}
EE(Base.prototype);

export class EventEmitter implements Emitter {
  emit = (Base.prototype as Emitter).emit;
  off = (Base.prototype as Emitter).off;
  on = (Base.prototype as Emitter).on;
  once = (Base.prototype as Emitter).once;
}