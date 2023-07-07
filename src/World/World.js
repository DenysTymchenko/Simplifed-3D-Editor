import Experience from '../Experience.js';
import Environment from './Environment.js';
import Floor from './Floor.js';
import Models from './Models.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.environment = new Environment(); // Lights are stored here
    this.floor = new Floor();
    this.models = new Models(); // All work with added models is stored here

    this.resources.on('bgLoaded', () => {
      this.scene.background = this.resources.latestTexture;
    });
  }
}
