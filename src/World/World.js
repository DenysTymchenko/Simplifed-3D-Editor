import Experience from '../Experience.js';
import Environment from './Environment.js';
import Floor from './Floor.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.environment = new Environment();
    this.floor = new Floor();
  }
}
