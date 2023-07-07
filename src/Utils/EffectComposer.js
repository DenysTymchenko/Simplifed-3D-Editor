import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import Experience from '../Experience.js';
import * as THREE from 'three';

export default class _EffectComposer {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;

    this.setInstance();
    this.setRenderPass();
    this.setOutlinePass();
  }

  setInstance() {
    this.instance = new EffectComposer(this.renderer.instance);
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.instance.setSize(this.sizes.width, this.sizes.height);
  }

  setRenderPass() {
    this.renderPass = new RenderPass(this.scene, this.camera.instance);
    this.instance.addPass(this.renderPass);
  }

  setOutlinePass() {
    this.outlinePass = new OutlinePass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.scene,
      this.camera.instance,
    );
    this.instance.addPass(this.outlinePass);
  }
}
