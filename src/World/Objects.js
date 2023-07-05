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
    this.active = model;

    const edges = new THREE.EdgesGeometry(model.children[0].geometry);
    this.outline = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));

    this.scene.add(this.outline);
    this.transformControls.attach(model);
  }

  updateActiveOutline() {
    this.outline?.position.copy(this.active?.position);
  }
}
