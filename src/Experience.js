import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import Renderer from './Renderer';
import _EffectComposer from './Utils/EffectComposer';
import World from './World/World';
import Resources from './Utils/Resources';
import ControlPanel from './Utils/ControlPanel.js';
import Raycaster from './Raycaster';

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) return instance;
    instance = this;

    this.errorHintDiv = document.querySelector('.error-hint');
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.effectComposer = new _EffectComposer();
    this.resources = new Resources();
    this.world = new World();
    this.controlPanel = new ControlPanel(); // The logic of all control panel (it's buttons, inputs, etc.) contains here
    this.raycater = new Raycaster();

    this.scene.background = new THREE.Color('#323232');

    this.sizes.on('resize', () => this.resize());
    this.time.on('tick', () => this.update());
  }

  triggerErrorHintDiv(text) {
    this.errorHintDiv.innerText = text;
    this.errorHintDiv.classList.remove('hidden');

    setTimeout(() => this.errorHintDiv.classList.add('hidden'), 4500);
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.effectComposer.resize();
  }

  update() {
    //Enabling configuration menu, when there is an active model
    !this.world.models.active
      ? this.controlPanel.disableModelConfiguration()
      : this.controlPanel.enableModelConfiguration();
    this.effectComposer.update();
  }
}
