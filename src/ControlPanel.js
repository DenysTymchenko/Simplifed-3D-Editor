import Experience from './Experience';

export default class ControlPanel {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.world = this.experience.world;

    this.addModelbtn = document.getElementById('add-model');
    this.configureTab = document.getElementById('configure-tab');
    this.configureTab.inputs = [
      this.colorInput = document.getElementById('color'),
      this.opacityInput = document.getElementById('opacity'),
      this.metalnessInput = document.getElementById('metalness'),
      this.roughnessInput = document.getElementById('roughness'),
    ];
    this.setBackgroundBtn = document.getElementById('set-bg');

    this.addModelbtn.addEventListener('click', (e) => this.importData(e));
    this.setBackgroundBtn.addEventListener('click', (e) => this.importData(e));
    this.configureTab.inputs.forEach(input => input.addEventListener('input', () => this.world.objects.changeMaterial(input)));
  }

  importData(e) {
    const input = document.createElement('input');
    input.type = 'file';
    input.addEventListener('change', () => {
      const file = input.files[0];
      const path = URL.createObjectURL(file);
      const type = file.name.split('.').pop();

      if (e.target.id === 'set-bg') {
        if (type !== 'jpg' && type !== 'hdr') alert('bip-bap');
        else this.resources.load(path, type);
      }
      else if (e.target.id === 'add-model') {
        if (type === 'jpg' || type === 'hdr') alert('mip-map');
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
