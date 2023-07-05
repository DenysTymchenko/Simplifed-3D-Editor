import * as THREE from 'three'
import Experience from '../Experience';

export default class Objects {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.transformControls = this.experience.camera.transformControls;
    this.resources = this.experience.resources;

    this.active = null;

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
    this.active = model;
    this.transformControls.attach(model);
  }

  removeActive() {
    this.active = null;
    this.transformControls.detach()
  }

  updateActiveOutline() {
    this.outline?.position.copy(this.active?.position);
  }
}
