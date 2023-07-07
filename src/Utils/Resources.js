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

    this.models = []; // will be used to check if mouse is intersecting with any models on scene, on raycasting
    this.latestModel = null;
    this.latestTexture = null;

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
        this.loaders.gltfLoader.load(path, (model) => this.modelLoadedCallback(model));
        break;

      case 'fbx':
        this.loaders.fbxLoader.load(path, (model) => this.modelLoadedCallback(model));
        break;

      case 'hdr':
        this.loaders.rgbeLoader.load(path, (envMap) => this.envMapLoadedCallback(envMap, pressedBtn));
        break;

      case 'jpg':
        this.loaders.textureLoader.load(path, (texture) => this.textureLoadedCallback(texture, pressedBtn));
        break;

      default:
        this.experience.triggerErrorHintDiv('This file type is not supported');
        break;
    }
  }

  modelLoadedCallback(model) {
    this.models.push(model.scene || model);
    this.latestModel = model.scene || model;
    this.trigger('newModelLoaded');
  }

  envMapLoadedCallback(envMap, pressedBtn) {
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    envMap.colorSpace = THREE.SRGBColorSpace;
    this.latestTexture = envMap;
    pressedBtn === 'set-bg' ? this.trigger('bgLoaded') : this.trigger('envMapLoaded');
  }

  textureLoadedCallback(texture, pressedBtn) {
    this.latestTexture = texture;

    if (pressedBtn === 'set-map') this.trigger('mapLoaded');
    if (pressedBtn === 'set-normalMap') this.trigger('normalMapLoaded');
    if (pressedBtn === 'set-bg' || pressedBtn === 'set-model-envMap') {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      pressedBtn === 'set-bg' ? this.trigger('bgLoaded') : this.trigger('envMapLoaded');
    }
  }

}
