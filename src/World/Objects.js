import * as THREE from 'three'
import Experience from '../Experience';

export default class Objects {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.transformControls = this.experience.camera.transformControls;
    this.resources = this.experience.resources;

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

    const geometry = new THREE.EdgesGeometry(model.geometry ? model.geometry : model.children[0].geometry);
    this.outline = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: 0xffffff }));
    this.scene.add(this.outline);

    this.active = model;
    this.transformControls.attach(model);
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
}
