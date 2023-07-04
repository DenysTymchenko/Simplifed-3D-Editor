import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import EventEmitter from './EventEmmiter.js';
import Experience from '../Experience.js';

export default class Loaders extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setInstance();
  }

  setInstance() {
    this.instance = {}

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/')

    this.instance.gltfLoader = new GLTFLoader();
    this.instance.gltfLoader.setDRACOLoader(dracoLoader);
  }

  load(path, type) {
    switch (type) {
      case 'gltf':
      case 'glb':
      case 'fbx':
        this.instance.gltfLoader.load(
          path,
          (model) => this.scene.add(model.scene),
        );
        break;

      default:
        alert('This type is not supported')
    }
  }
}
