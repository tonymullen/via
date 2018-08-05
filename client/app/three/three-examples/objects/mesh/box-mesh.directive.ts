import { Directive, Input, AfterViewInit, forwardRef } from '@angular/core';
import * as THREE from 'three';
import { AbstractObject3D } from '../abstract-object-3d';

@Directive({
  selector: 'three-box-mesh',
  providers: [{ provide: AbstractObject3D, useExisting: forwardRef(() => BoxMeshDirective) }]
})
export class BoxMeshDirective extends AbstractObject3D<THREE.Mesh> {
  @Input('x-len') xLen: number;
  @Input('y-len') yLen: number;
  @Input('z-len') zLen: number;

  geometry: any;
  material: any;

  constructor() {
    super();
    // console.log('BoxMeshDirective.constructor');
  }

  protected newObject3DInstance(): THREE.Mesh {
    
    // console.log('BoxMeshDirective.newObject3DInstance');

    this.geometry = new THREE.BoxGeometry(this.xLen, this.yLen, this.zLen);

    if (!this.material) {
      this.material = new THREE.MeshLambertMaterial();
    }
    return new THREE.Mesh( this.geometry, this.material);
  }

  protected afterInit(): void {
    // console.log('MeshDirective.afterInit');
    // none
  }

}
