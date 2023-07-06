import * as THREE from 'three';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import EventEmitter from './EventEmmiter.js';
import Experience from '../Experience.js';

export default class Resources extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();

    this.models = [];
    this.latestModel = null;
    this.latestEnvMap = null;

    this.setInstance();
  }

  setInstance() {
    this.loaders = {}

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.gltfLoader.setDRACOLoader(dracoLoader);

    this.loaders.fbxLoader = new FBXLoader();
    this.loaders.rgbeLoader = new RGBELoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
  }

  load(path, type, pressedBtn) {
    switch (type) {
      case 'gltf':
      case 'glb':
        this.loaders.gltfLoader.load(
          path,
          (model) => {
            this.models.push(model.scene);
            this.latestModel = model.scene;
            this.trigger('newModel');
          }
        );
        break;

      case 'fbx':
        this.loaders.fbxLoader.load(
          path,
          (model) => {
            this.models.push(model);
            this.latestModel = model;
            this.trigger('newModel');
          }
        );
        break;

      case 'hdr':
        this.loaders.rgbeLoader.load(
          path,
          (envMap) => {
            envMap.mapping = THREE.EquirectangularReflectionMapping;
            envMap.colorSpace = THREE.SRGBColorSpace;
            this.latestEnvMap = envMap;
            pressedBtn === 'set-bg' ? this.trigger('setBg') : this.trigger('setModelEnvMap');
          });
        break;

      case 'jpg':
        this.loaders.textureLoader.load(
          path,
          (envMap) => {
            envMap.mapping = THREE.EquirectangularReflectionMapping;
            envMap.colorSpace = THREE.SRGBColorSpace;
            this.latestEnvMap = envMap;
            pressedBtn === 'set-bg' ? this.trigger('setBg') : this.trigger('setModelEnvMap');
          });
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
