import * as THREE from 'three'
import Experience from '../Experience';

export default class Objects {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.transformControls = this.experience.camera.transformControls;
    this.resources = this.experience.resources;
    this.controlPanel = this.experience.controlPanel;

    this.active = null;
    this.outline = null;

    this.resources.on('newModel', () => this.addNewModelToTheScene());
  }

  addNewModelToTheScene() {
    const newModel = this.resources.items[this.resources.items.length - 1];
    newModel.addEventListener('click', () => console.log('check'))
    this.scene.add(newModel);
    this.setActive(newModel)
  }

  setActive(model) {
    this.removeActive();

    const geometry = new THREE.EdgesGeometry(model.children[0].geometry);
    this.outline = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: 0xffffff }));
    this.scene.add(this.outline);

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
    this.scene.remove(this.outline);
    this.outline = null;

    this.active = null;
    this.transformControls.detach();
  }

  updateActiveOutline() {
    this.outline?.position.copy(this.active?.position);
  }

  changeMaterial(input) {
    this.active.materials.forEach(material => {
      input.id === 'color' ? material.color.set(input.value) : material[input.id] = input.value;
    });
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
