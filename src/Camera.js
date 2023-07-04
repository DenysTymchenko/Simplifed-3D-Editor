import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import EventEmitter from './Utils/EventEmmiter.js';
import Experience from './Experience.js';

export default class Camera extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      250,
    );
    this.instance.position.set(0, 15, 20);

    this.scene.add(this.instance);
  }

  setOrbitControls(renderer) {
    this.orbitControls = new OrbitControls(this.instance, renderer.domElement);
    this.orbitControls.rotateSpeed = 0.5
  }

  setTransformControls(renderer) {
    this.transformControls = new TransformControls(this.instance, renderer.domElement);
    this.scene.add(this.transformControls);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }
}
