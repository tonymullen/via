import { TestBed, async } from '@angular/core/testing';
import { GameComponent } from './game.component';

import { FormsModule } from '@angular/forms';
import { ThreeExamplesModule } from '../../three/three-examples/three-examples.module';

describe('GameComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent
      ],
      imports: [
        FormsModule,
        ThreeExamplesModule
      ]
    }).compileComponents();
  }));
  it('should create the game', async(() => {
    const fixture = TestBed.createComponent(GameComponent);
    const game = fixture.debugElement.componentInstance;
    expect(game).toBeTruthy();
  }));
  it(`should have as title 'game'`, async(() => {
    const fixture = TestBed.createComponent(GameComponent);
    const game = fixture.debugElement.componentInstance;
    expect(game.title).toEqual('game');
  }));
  it('should create <canvas> element', async(() => {
    const fixture = TestBed.createComponent(GameComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('canvas')).not.toBeNull('No <canvas> rendered');
  }));
});
