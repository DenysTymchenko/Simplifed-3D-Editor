import EventEmitter from './EventEmmiter'

export default class Time extends EventEmitter {
  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16; // 0 can cause an error. The value is 16 - because default screens are running at 16 fps.

    window.requestAnimationFrame(() => this.tick());
  }

  tick() {
    const newCurrentTime = Date.now();
    this.delta = newCurrentTime - this.current;
    this.elapsed += this.deltaTime;
    this.current = newCurrentTime;

    this.trigger('tick');

    window.requestAnimationFrame(() => this.tick());
  }
}
