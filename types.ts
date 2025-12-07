import * as THREE from 'three';

export enum TreeState {
  SCATTERED = 'SCATTERED',
  TREE_SHAPE = 'TREE_SHAPE',
}

export interface Vector3Data {
  x: number;
  y: number;
  z: number;
}

export interface FoliageUniforms {
  uTime: { value: number };
  uMorphFactor: { value: number };
  uColor: { value: THREE.Color };
}