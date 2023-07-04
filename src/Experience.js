import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';
import Loaders from './Utils/Loaders';
import ControlPanel from './ControlPanel';

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
    this.world = new World();
    this.loaders = new Loaders();
    this.controlPanel = new ControlPanel();

    this.sizes.on('resize', () => this.resize());
    this.time.on('tick', () => this.update());
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.renderer.update();
  }
}
