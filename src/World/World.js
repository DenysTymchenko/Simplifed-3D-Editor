import Experience from '../Experience.js';
import Floor from './Floor.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.floor = new Floor();
  }
}
