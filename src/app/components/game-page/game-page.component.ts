import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameStateComponent } from './game-state/game-state.component';
import { SubscriptionHostMixin } from '../../mixins/SubscriptionHost';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [GameBoardComponent, GameStateComponent],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent extends SubscriptionHostMixin() {
  deckSize: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
    super();
    this.route.params.pipe(takeUntil(this.destroyed$)).subscribe((params) => {
      this.handleFallback(params);
      this.deckSize = params['size'];
    });
  }

  handleFallback(params: Params) {
    const size = params['size'];
    const sizeTooBig = size > 20;
    const sizeTooSmall = size < 6;
    const sizeIsOdd = size % 2;
    if (!size || sizeIsOdd || sizeTooBig || sizeTooSmall) {
      this.router.navigate(['']);
    }
  }
}
