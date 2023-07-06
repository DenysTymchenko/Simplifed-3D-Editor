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
    ];
    this.inputs = [
      this.colorInput = document.getElementById('color'),
      this.opacityInput = document.getElementById('opacity'),
      this.metalnessInput = document.getElementById('metalness'),
      this.roughnessInput = document.getElementById('roughness'),
    ];

    this.buttons.forEach(button => button.addEventListener('click', (e) => this.importData(e)));
    this.inputs.forEach(input => input.addEventListener('input', () => this.world.models.changeMaterial(input)));
  }

  importData(e) {
    const pressedBtn = e.target.id;

    const input = document.createElement('input');
    input.type = 'file';
    input.addEventListener('change', () => {
      const file = input.files[0];
      const path = URL.createObjectURL(file);
      const type = file.name.split('.').pop();

      if (pressedBtn === 'set-bg' || pressedBtn === 'set-model-envMap') {
        if (type !== 'jpg' && type !== 'hdr') alert('Wrong file format selected');
        else this.resources.load(path, type, pressedBtn);
      }
      else if (pressedBtn === 'add-model') {
        if (type === 'jpg' || type === 'hdr') alert('Wrong file format selected');
        else this.resources.load(path, type);
      }
    })

    input.click();
  }

  disableModelConfiguration() {
    this.configureTab.classList.add('disabled');
  }

  enableModelConfiguration() {
    this.configureTab.classList.remove('disabled');
  }
}
