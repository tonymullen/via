import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GamePlayService {

  constructor() { }

  private gameState = [
    '','','',
    '','','',
    '','','',

    '','','',
    '','','',
    '','','',

    '','','',
    '','','',
    '','','',
  ]
}
