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

    window.addEventListener('mousedown', (e) => {
      if (e.button === 0) { // checks if left mouse button pressed
        if (e.target.className === 'webgl') this.castRay();
      }
    });
  }

  castRay() {
    this.instance = new THREE.Raycaster();
    this.instance.setFromCamera(this.mouse, this.camera.instance);

    this.modelIntersect = this.instance.intersectObjects(this.resources.models)[0]; // Taking first intersecting model on scene
    this.sceneIntersect = this.instance.intersectObjects(this.experience.scene.children)[0]; // Taking first intersecting scene child

    const sceneIntersectType = this.sceneIntersect.object.type;

    if (this.modelIntersect) {
      if (this.modelIntersect.object !== this.world.models.active) {
        this.world.models.setActive(this.modelIntersect.object);
      }
    } else if (sceneIntersectType === 'TransformControlsPlane' || sceneIntersectType === 'Line') {
      // TransformControlsPlane - is background.
      // Line - is the line that TransformControls creating.
      // It's invisible, when we are not dragging controls, which can cause misunderstanding:
      // if Line is invisible and parallel with background, we can press on it accidentally instead of bg,
      // and don't understand why TransformControls didn't disappear.
      this.world.models.removeActive();
    }
  }
}
