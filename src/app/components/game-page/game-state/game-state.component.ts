import { Component } from '@angular/core';
import { StartGameComponent } from '../../shared/start-game/start-game.component';
import { GameDataSharingService } from '../../../services/game-data-sharing.service';
import { takeUntil } from 'rxjs';
import { SubscriptionHostMixin } from '../../../mixins/SubscriptionHost';

@Component({
  selector: 'app-game-state',
  standalone: true,
  imports: [StartGameComponent],
  templateUrl: './game-state.component.html',
  styleUrl: './game-state.component.scss',
})
export class GameStateComponent extends SubscriptionHostMixin() {
  currentTries = 0;
  highScore = 0;

  constructor(private gameDataSharingService: GameDataSharingService) {
    super();

    gameDataSharingService.currentTries$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => (this.currentTries = value));

    gameDataSharingService.highScore$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => (this.highScore = value));
  }

  requestRestart() {
    this.gameDataSharingService.resetRequest$.next(0);
  }
}
