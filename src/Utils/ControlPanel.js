import Experience from '../Experience.js';

export default class ControlPanel {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.world = this.experience.world;

    this.configureTab = document.getElementById('configure-tab');
    this.buttons = [
      this.addModelbtn = document.getElementById('add-model'),
      this.setModelEnvMapBtn = document.getElementById('set-model-envMap'),
      this.setBackgroundBtn = document.getElementById('set-bg'),
      this.setMap = document.getElementById('set-map'),
      this.setNormalMap = document.getElementById('set-normalMap'),
    ]; // All control panel elements that needed for loading files are stored in this array
    this.inputs = [
      this.colorInput = document.getElementById('color'),
      this.opacityInput = document.getElementById('opacity'),
      this.metalnessInput = document.getElementById('metalness'),
      this.roughnessInput = document.getElementById('roughness'),
    ]; // All inputs, that changes properties of active model are stored in this array

    this.buttons.forEach(button => button.addEventListener('click', (e) => this.loadFile(e)));
    this.inputs.forEach(input => input.addEventListener('input', () => this.world.models.changeMaterial(input)));
  }

  //In this method we're getting files from users pc by emitting click on input.type = 'file';
  loadFile(e) {
    const pressedBtn = e.target.id;
    const input = document.createElement('input');
    input.type = 'file';

    input.addEventListener('change', () => {
      const file = input.files[0];
      const path = URL.createObjectURL(file);
      const type = file.name.split('.').pop();

      if ((pressedBtn === 'set-bg' || pressedBtn === 'set-model-envMap') && (type !== 'jpg' && type !== 'hdr')) {
        this.experience.triggerErrorHintDiv('Wrong file format selected');
      } else if ((pressedBtn === 'set-map' || pressedBtn === 'set-normalMap') && type !== 'jpg') {
        this.experience.triggerErrorHintDiv('Wrong file format selected');
      } else if (pressedBtn === 'add-model' && (type !== 'gltf' && type !== 'glb' && type !== 'fbx')) {
        this.experience.triggerErrorHintDiv('Wrong file format selected');
      } else {
        this.resources.load(path, type, pressedBtn);
      }
    });

    input.click();
  }

  disableModelConfiguration() {
    this.configureTab.classList.add('disabled');
  }

  enableModelConfiguration() {
    this.configureTab.classList.remove('disabled');
  }
}
