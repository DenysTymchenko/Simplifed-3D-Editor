import Experience from './Experience';

export default class ControlPanel {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.instance = document.querySelector('.control-panel');
    this.addModelbtn = document.getElementById('add-model');

    this.addModelbtn.addEventListener('click', () => this.importData())
  }

  importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.addEventListener('change', () => {
      const file = input.files[0];
      const path = URL.createObjectURL(file);
      const type = file.name.split('.').pop();

      this.resources.load(path, type);
    })

    input.click();
  }
}
