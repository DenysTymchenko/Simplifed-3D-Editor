import * as THREE from 'three';
import Experience from '../Experience';

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.GridHelper(25, 10);
    this.scene.add(this.instance);
  }
}
