import * as THREE from 'three'
import Experience from '../Experience.js';
import Environment from './Environment.js';
import Floor from './Floor.js';
import Objects from './Objects.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.scene = this.experience.scene;

    this.environment = new Environment();
    this.floor = new Floor();
    this.objects = new Objects();
  }

  setBackground(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    this.scene.background = texture;
  }
}
