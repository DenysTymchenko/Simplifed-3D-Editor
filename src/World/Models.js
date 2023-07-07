import * as THREE from 'three';
import Experience from '../Experience';

export default class Models {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.transformControls = this.experience.camera.transformControls;
    this.resources = this.experience.resources;
    this.effectComposer = this.experience.effectComposer;

    this.active = null;

    this.resources.on('newModel', () => this.scene.add(this.resources.latestModel));
    this.resources.on('setModelEnvMap', () => this.setEnvMap());
    this.resources.on('setMap', () => this.setMap());
    this.resources.on('setEnvMap', () => this.setNormalMap())
  }

  setActive(model) {
    this.removeActive();

    this.active = model;
    this.active.material.transparent = true;
    this.transformControls.attach(model);
    this.effectComposer.outlinePass.selectedObjects = [model];

    this.updateInputs();
  }

  removeActive() {
    this.active = null;
    this.transformControls.detach();
  }

  changeMaterial(input) {
    input.id === 'color'
      ? this.active.material.color.set(input.value)
      : this.active.material[input.id] = input.value;
  }

  setEnvMap() {
    this.active.material.envMap = this.resources.latestTexture;
  }

  setMap() {
    this.active.material.map = this.resources.latestTexture;
  }

  setNormalMap() {
    this.active.material.normalMap = this.resources.latestTexture;
  }

  updateInputs() {
    this.experience.controlPanel.colorInput.value = `#${this.active.material.color.getHexString()}`;
    this.experience.controlPanel.opacityInput.value = this.active.material.opacity;
    this.experience.controlPanel.metalnessInput.value = this.active.material.metalness;
    this.experience.controlPanel.roughnessInput.value = this.active.material.roughness;
  }
}
