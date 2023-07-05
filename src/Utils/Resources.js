import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import EventEmitter from './EventEmmiter.js';
import Experience from '../Experience.js';

export default class Resources extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();

    this.items = [];

    this.setInstance();
  }

  setInstance() {
    this.loaders = {}

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.gltfLoader.setDRACOLoader(dracoLoader);

    this.loaders.fbxLoader = new FBXLoader();
  }

  load(path, type) {
    switch (type) {
      case 'gltf':
      case 'glb':
        this.loaders.gltfLoader.load(
          path,
          (model) => {
            this.items.push(model.scene);
            this.trigger('newModel');
          }
        );
        break;

      case 'fbx':
        this.loaders.fbxLoader.load(
          path,
          (model) => {
            this.items.push(model);
            this.trigger('newModel');
          }
        );
        break;

      default:
        alert('This file type is not supported');
        break;
    }
  }

  deactivateActive() {
    this.scene.remove(this.outline);
  }
}
