import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { GameBoard, GameCard } from '../../../model/game-board';
import { CommonModule } from '@angular/common';
import { generateGivenAmountUniqueRandomNumbers } from '../../../helpers/helpers';
import { GameDataSharingService } from '../../../services/game-data-sharing.service';
import { StorageService } from '../../../services/storage.sevice';
import { LocalStorageKeys } from '../../../helpers/constants';
import { SubscriptionHostMixin } from '../../../mixins/SubscriptionHost';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameBoardComponent
  extends SubscriptionHostMixin()
  implements OnInit, OnChanges
{
  @Input()
  deckSize!: number;

  fields?: GameCard[];

  selectedCard?: GameCard;

  tryCount = 0;

  matches = 0;

  constructor(
    private gameDataSharingService: GameDataSharingService,
    private cd: ChangeDetectorRef,
    private storageSerive: StorageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadBoardState();

    const savedTryCount = this.storageSerive.getItem(
      LocalStorageKeys.CURRENT_TRIES_LOCAL_STORAGE_KEY
    );
    this.tryCount = +(savedTryCount ?? 0) * 2;

    this.gameDataSharingService.resetRequest$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((_) => this.restartGame());
  }

  ngOnChanges(changes: SimpleChanges) {
    // if the deck size prop changes we have to generate a new board
    if (changes['deckSize']) {
      this.fields = this.generateGameCards(this.deckSize);
    }
  }

  getFieldImageSource(card: GameCard): String {
    if (card.matched) return 'assets/rieker-logo-kcm-homework-match.png';
    if (card.flipped) return 'assets/shoe-images/' + card.shoeId + '.jpg';
    return 'assets/rieker-logo-kcm-homework.png';
  }

  flipCard(card: GameCard) {
    if (card.flipped || card.matched) return;
    this.countTry();

    card.flipped = true;

    if (this.selectedCard) {
      if (this.checkForMatch(card)) {
        this.selectedCard.matched = true;
        card.matched = true;
      } else {
        this.selectedCard.flipped = false;
        // we want to reveal the card for a while even if it is not a match
        setTimeout(() => {
          card.flipped = false;
          this.cd.detectChanges();
        }, 400);
      }

      this.selectedCard = undefined;
    } else {
      this.selectedCard = card;
    }

    this.saveBoardState();
  }

  private countTry() {
    this.tryCount++;
    if (this.tryCount % 2 === 0) {
      this.gameDataSharingService.currentTries$.next(this.tryCount / 2);
    }
  }

  private loadBoardState() {
    const rawSavedState = this.storageSerive.getItem(
      LocalStorageKeys.GAME_BOARD_LOCAL_STORAGE_KEY
    );
    const parsedSavedGameState = JSON.parse(rawSavedState ?? '');
    this.fields = parsedSavedGameState || this.generateGameCards(this.deckSize);

    for (const field of this.fields!) {
      if (field.flipped) {
        this.selectedCard = field;
      }
    }
  }

  private saveBoardState() {
    this.storageSerive.setItem(
      LocalStorageKeys.GAME_BOARD_LOCAL_STORAGE_KEY,
      JSON.stringify(this.fields)
    );
  }

  private restartGame() {
    this.fields = this.generateGameCards(this.deckSize);
    this.matches = 0;
    this.tryCount = 0;
    this.selectedCard = undefined;
    this.gameDataSharingService.currentTries$.next(0);
    this.saveBoardState();
    this.cd.detectChanges();
  }

  private checkForMatch(card: GameCard): boolean {
    if (this.selectedCard?.shoeId === card.shoeId) {
      this.matches++;
      this.updateHighScore();
      return true;
    }
    return false;
  }

  private updateHighScore() {
    const gameIsWon = this.matches === this.deckSize / 2;
    const score = this.tryCount / 2;
    const isNewHishScore =
      score < this.gameDataSharingService.highScore$.getValue();
    if (gameIsWon && isNewHishScore) {
      this.gameDataSharingService.highScore$.next(score);
    }
  }

  private generateGameCards(size: number): GameCard[] {
    const numberOfShoes = size / 2;
    const indexes = generateGivenAmountUniqueRandomNumbers(numberOfShoes);
    return new GameBoard(indexes).fields;
  }
}
