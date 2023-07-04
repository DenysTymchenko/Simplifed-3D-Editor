import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import Renderer from './Renderer';

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
    //this.resources = new Resources();
    //this.world = new World();

    this.sizes.on('resize', () => this.resize());
    this.time.on('tick', () => this.update());
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.controls.update();
    this.renderer.update();
  }
}
