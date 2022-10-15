export class EventEmitter<E> {
  readonly #event = new EventTarget();
  on<PT = any>(eventName: E, listener: (event: CustomEvent<PT>) => void) {
    return this.#event.addEventListener(eventName as any, listener as any);
  }
  once<PT = any>(eventName: E, listener: (event: CustomEvent<PT>) => void) {
    return this.#event.addEventListener(eventName as any, listener as any, {
      once: true,
    });
  }
  off<PT = any>(eventName: E, listener: (event: CustomEvent<PT>) => void) {
    return this.#event.removeEventListener(eventName as any, listener as any);
  }
  emit<T = any>(eventName: E, detail?: T) {
    return this.#event.dispatchEvent(
      new CustomEvent(eventName as any, { detail, cancelable: true })
    );
  }
}
