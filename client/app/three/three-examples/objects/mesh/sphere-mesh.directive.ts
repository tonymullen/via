import { Directive, Input, AfterViewInit, forwardRef } from '@angular/core';
import * as THREE from 'three';
import { AbstractObject3D } from '../abstract-object-3d';

@Directive({
  selector: 'three-sphere-mesh',
  providers: [{ provide: AbstractObject3D, useExisting: forwardRef(() => SphereMeshDirective) }]
})
export class SphereMeshDirective extends AbstractObject3D<THREE.Mesh> {
  @Input() radius: number;
  @Input() rings: number;
  @Input() segments: number;

  geometry: any;
  material: any;

  constructor() {
    super();
    console.log('SphereMeshDirective.constructor');
  }

  protected newObject3DInstance(): THREE.Mesh {
    console.log('SphereMeshDirective.newObject3DInstance');    
    this.geometry = new THREE.SphereGeometry(this.radius, this.rings, this.segments);
    this.material = new THREE.MeshLambertMaterial();
    return new THREE.Mesh( this.geometry, this.material);
  }

  protected afterInit(): void {
    console.log('SphereMeshDirective.afterInit');
    // none
  }

}
