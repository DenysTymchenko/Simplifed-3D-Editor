import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';
import Resources from './Utils/Resources';
import ControlPanel from './ControlPanel';
import Raycaster from './Raycaster';

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) return instance;
    instance = this;

    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources();
    this.world = new World();
    this.controlPanel = new ControlPanel(); // The logic of all control panel (it's buttons, inputs, etc.) contains here
    this.raycater = new Raycaster();

    this.sizes.on('resize', () => this.resize());
    this.time.on('tick', () => this.update());
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    !this.world.models.active
      ? this.controlPanel.disableModelConfiguration()
      : this.controlPanel.enableModelConfiguration();
    this.world.models.updateActiveOutline();
    this.renderer.update();
  }
}
