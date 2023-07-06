import * as THREE from 'three';
import Experience from './Experience.js';

export default class Raycaster {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.world = this.experience.world;

    this.mouse = new THREE.Vector2();
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1;
      this.mouse.y = -(e.clientY / this.sizes.height) * 2 + 1;
    });

    window.addEventListener('click', () => this.castRay());
  }

  castRay() {
    this.instance = new THREE.Raycaster();
    this.instance.setFromCamera(this.mouse, this.camera.instance);

    this.intersect = this.instance.intersectObjects(this.resources.models)[0];

    if (this.intersect) {
      const item = this.resources.models.find(item => item.children[0] === this.intersect.object);
      this.world.models.setActive(item);
    }
  }
}
