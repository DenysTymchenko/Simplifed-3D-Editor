import Experience from './Experience';

export default class ControlPanel {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.world = this.experience.world;

    this.instance = document.querySelector('.control-panel');
    this.inputs = [
      this.addModelbtn = document.getElementById('add-model'),
      this.colorInput = document.getElementById('color'),
      this.opacityInput = document.getElementById('opacity'),
      this.metalnessInput = document.getElementById('metalness'),
      this.roughnessInput = document.getElementById('roughness'),
    ]


    this.addModelbtn.addEventListener('click', () => this.importData());
    this.inputs.forEach(input => input.addEventListener('input', () => this.world.objects.changeMaterial(input)));
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
