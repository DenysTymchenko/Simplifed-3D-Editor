import * as THREE from 'three'
import Experience from '../Experience.js';
import Environment from './Environment.js';
import Floor from './Floor.js';
import Models from './Models.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.environment = new Environment();
    this.floor = new Floor();
    this.models = new Models();

    this.resources.on('setBg', () => this.setBackground());
  }

  setBackground() {
    this.scene.background = this.resources.latestEnvMap;
  }
}
