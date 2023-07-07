import Experience from '../Experience';

export default class Models {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.transformControls = this.experience.camera.transformControls;
    this.resources = this.experience.resources;
    this.effectComposer = this.experience.effectComposer;

    this.active = null;

    this.resources.on('newModelLoaded', () => this.scene.add(this.resources.latestModel));
    this.resources.on('envMapLoaded', () => this.setEnvMap());
    this.resources.on('mapLoaded', () => this.setMap());
    this.resources.on('normalMapLoaded', () => this.setNormalMap())
  }

  setActive(model) {
    this.removeActive();

    this.active = model;
    this.active.material.transparent = true; // Making material transparent, so we could change its opacity when it's needed.
    this.transformControls.attach(model); // Adding TransformControls to model
    this.effectComposer.outlinePass.selectedObjects = [model]; // Applying outline to model.

    this.updateInputs(); // updating control panel inputs with model values.
  }

  removeActive() {
    this.active = null;
    this.transformControls.detach();
    this.effectComposer.outlinePass.selectedObjects = [];
  }

  changeMaterial(input) {
    // Color is the only property, that changes atypically. That's why we need this ternary checking
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
    // getHexString() - gives value like FFFF, but we need it to be #FFFF.
    this.experience.controlPanel.colorInput.value = `#${this.active.material.color.getHexString()}`;
    this.experience.controlPanel.opacityInput.value = this.active.material.opacity;
    this.experience.controlPanel.metalnessInput.value = this.active.material.metalness;
    this.experience.controlPanel.roughnessInput.value = this.active.material.roughness;
  }
}
