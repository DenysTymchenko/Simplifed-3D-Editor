import * as THREE from 'three'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
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
    dracoLoader.setDecoderPath('/draco/')

    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.gltfLoader.setDRACOLoader(dracoLoader);
  }

  load(path, type) {
    switch (type) {
      case 'gltf':
      case 'glb':
      case 'fbx':
        this.loaders.gltfLoader.load(
          path,
          (model) => {
            this.items.push(model.scene);
            this.trigger('newModel');
          }
        );
        break;

      default:
        alert('This file type is not supported')
    }
  }

  deactivateActive() {
    this.scene.remove(this.outline);
  } 
}
