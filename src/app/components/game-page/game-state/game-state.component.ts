import { Component } from '@angular/core';

@Component({
  selector: 'app-game-state',
  standalone: true,
  templateUrl: './game-state.component.html',
  styleUrl: './game-state.component.scss',
})
export class GameStateComponent {
  currentTries = 0;
  personalBest = 0;
}
