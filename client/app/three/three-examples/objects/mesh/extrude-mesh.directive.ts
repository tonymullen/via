import { Directive, Input, AfterViewInit, forwardRef } from '@angular/core';
import * as THREE from 'three';
import { AbstractObject3D } from '../abstract-object-3d';

@Directive({
  selector: 'three-extrude-mesh',
  providers: [{ provide: AbstractObject3D, useExisting: forwardRef(() => ExtrudeMeshDirective) }]
})
export class ExtrudeMeshDirective extends AbstractObject3D<THREE.Mesh> {
  //@Input('shape-path') shapePath: string;
  @Input() shapeDataString: string;
  @Input() extrudeSettingString: string;

  geometry: any;
  material: any;
  shape: any;
  
  protected shapeData: any;
  protected extrudeSettings: any;

  constructor() {
    super();
    // console.log('ExtrudeMeshDirective.constructor');
  }

  protected newObject3DInstance(): THREE.Mesh {
    if (!this.shapeData) {
      this.shapeData = JSON.parse(this.shapeDataString);
    }
    if (!this.extrudeSettings) {
      this.extrudeSettings = JSON.parse(this.extrudeSettingString);
    }
    this.shape = new THREE.Shape();

    this.shapeData.path.forEach(step => {
      this.shape[step.funct].apply(this.shape, step.args);
    });
    if (this.shapeData.holes && this.shapeData.holes.length > 0) {
      this.shapeData.holes.forEach(hole => {
        let holePath = new THREE.Path();
        if (hole['path']) {
          hole['path'].forEach(step => {
            holePath[step.funct].apply(holePath, step.args);
          })
        }
        this.shape.holes.push( holePath );
      });
    }
    
    this.geometry = new THREE.ExtrudeGeometry( this.shape, this.extrudeSettings );

    if (!this.material) {
      this.material = new THREE.MeshLambertMaterial();
    }
    
    return new THREE.Mesh( this.geometry, this.material);

  }

  protected afterInit(): void {
    // console.log('ExtrudeMeshDirective.afterInit');
    // none
  }

}
