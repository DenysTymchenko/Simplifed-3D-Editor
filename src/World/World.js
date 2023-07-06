import * as THREE from 'three'
import Experience from '../Experience.js';
import Environment from './Environment.js';
import Floor from './Floor.js';
import Objects from './Objects.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.environment = new Environment();
    this.floor = new Floor();
    this.objects = new Objects();

    this.resources.on('setBg', () => this.setBackground());
  }

  setBackground() {
    const envMap = this.resources.latestEnvMap;
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    envMap.colorSpace = THREE.SRGBColorSpace;
    
    this.scene.background = envMap;
  }
}
