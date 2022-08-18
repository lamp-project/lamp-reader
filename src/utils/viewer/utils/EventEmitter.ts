import EE, { Emitter } from 'event-emitter';

class Base {}

export class EventEmitter implements Emitter {
  #emitter = EE(Base.prototype);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emit(type: string, ...args: any[]): void {
    return this.#emitter.emit(type, ...args);
  }
  off(type: string, listener: EE.EventListener) {
    return this.#emitter.off(type, listener);
  }
  on(type: string, listener: EE.EventListener) {
    return this.#emitter.on(type, listener);
  }
  once(type: string, listener: EE.EventListener) {
    return this.#emitter.once(type, listener);
  }
}
