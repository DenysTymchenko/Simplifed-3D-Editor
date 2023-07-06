import * as THREE from 'three'
import Experience from '../Experience';

export default class Models {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.transformControls = this.experience.camera.transformControls;
    this.resources = this.experience.resources;

    this.active = null;

    this.resources.on('newModel', () => this.addNewModelToTheScene());
    this.resources.on('setModelEnvMap', () => this.setEnvMap());
  }

  addNewModelToTheScene() {
    const newModel = this.resources.latestModel;
    this.scene.add(newModel);
    this.setActive(newModel);
  }

  setActive(model) {
    this.removeActive();

    this.active = model;
    this.active.materials = this.getModelMaterials(model);
    this.transformControls.attach(model);

    this.updateInputs();
  }

  getModelMaterials(model, materials = []) {
    if (model.material) {
      model.material.transparent = true;
      materials.push(model.material);
    }

    if (model.children) model.children.forEach(child => this.getModelMaterials(child, materials));

    return materials;
  }

  removeActive() {
    this.active = null;
    this.transformControls.detach();
  }

  changeMaterial(input) {
    this.active.materials.forEach(material => {
      input.id === 'color' ? material.color.set(input.value) : material[input.id] = input.value;
    });
  }

  setEnvMap() {
    this.active.materials.forEach(material => material.envMap = this.resources.latestEnvMap);
  }

  updateInputs() {
    this.active.materials.forEach(material => {
      this.experience.controlPanel.colorInput.value = `#${material.color.getHexString()}`;
      this.experience.controlPanel.opacityInput.value = material.opacity;
      this.experience.controlPanel.metalnessInput.value = material.metalness;
      this.experience.controlPanel.roughnessInput.value = material.roughness;
    });
  }
}
