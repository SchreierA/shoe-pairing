import { Component } from '@angular/core';
import { StartGameComponent } from '../../shared/start-game/start-game.component';
import { GameDataService } from '../../../services/game-data.service';

@Component({
  selector: 'app-game-state',
  standalone: true,
  imports: [StartGameComponent],
  templateUrl: './game-state.component.html',
  styleUrl: './game-state.component.scss',
})
export class GameStateComponent {
  currentTries = 0;
  personalBest = 0;

  constructor(private gameDataService: GameDataService) {
    gameDataService.currentTries$.subscribe(
      (value) => (this.currentTries = value)
    );
    gameDataService.personalBest$.subscribe(
      (value) => (this.personalBest = value)
    );
  }

  requestRestart() {
    this.gameDataService.resetRequest$.next(0);
  }
}
