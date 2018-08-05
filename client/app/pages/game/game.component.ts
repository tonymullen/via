import { Component, HostListener, ViewChild, AfterViewInit, QueryList, ChangeDetectorRef  } from '@angular/core';
import { PerspectiveCameraDirective } from '../../three/three-examples/cameras/perspective-camera.directive';
import { WebGLRendererComponent } from '../../three/three-examples/renderer/webgl-renderer.component';
import { GamePlayService } from '../../services/game-play.service';
import * as THREE from 'three';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {
  @ViewChild(PerspectiveCameraDirective) camDir: PerspectiveCameraDirective;
  @ViewChild(WebGLRendererComponent) renderer: WebGLRendererComponent;
  gamePlay: GamePlayService;
  raycaster: THREE.Raycaster = new THREE.Raycaster();
  mouse: THREE.Vector2 = new THREE.Vector2();
  canvasRect: ClientRect;
  intersection: THREE.Vector3 = new THREE.Vector3();
  INTERSECTED; 
  SELECTED;

  constructor(gamePlayService: GamePlayService) {
    this.gamePlay = gamePlayService;
  }
  title = 'game';

  ngAfterViewInit() {
    this.canvasRect = this.renderer.renderPane.nativeElement.getBoundingClientRect();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse.set(
      (( event.clientX / window.innerWidth ) * 2 - 1) *
      (window.innerWidth/this.canvasRect.width),
      (-((event.clientY - (this.canvasRect.top + (this.canvasRect.height/2))) / window.innerHeight) * 2 )
      * (window.innerHeight/this.canvasRect.height));
    //console.log(this.mouse);
    //console.log(this.canvasRect);
    this.raycaster.setFromCamera( this.mouse, this.camDir.camera );
  }
}
