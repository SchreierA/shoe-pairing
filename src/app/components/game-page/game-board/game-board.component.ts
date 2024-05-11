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
import { GameDataService } from '../../../services/game-data.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameBoardComponent implements OnInit, OnChanges {
  @Input()
  deckSize!: number;

  fields?: GameCard[];

  selectedCard?: GameCard;

  tryCount = 0;

  matches = 0;

  constructor(
    private gameDataService: GameDataService,
    private cd: ChangeDetectorRef
  ) {
    gameDataService.resetRequest$.subscribe((_) => this.restartGame());
  }

  ngOnInit(): void {
    this.fields = this.generateGameCards(this.deckSize);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['deckSize']) {
      this.fields = this.generateGameCards(this.deckSize);
    }
  }

  getFieldImageSource(card: GameCard): String {
    if (card.matched) return 'assets/rieker-logo-kcm-homework-match.png';
    if (card.flipped) return 'assets/shoe-images/' + card.shoeId + '.jpg';
    return 'assets/rieker-logo-kcm-homework.png';
  }

  countTries() {
    this.tryCount++;
    if (this.tryCount % 2 === 0) {
      this.gameDataService.currentTries$.next(this.tryCount / 2);
    }
  }

  flipCard(card: GameCard) {
    if (card.flipped || card.matched) return;
    this.countTries();

    card.flipped = true;

    if (this.selectedCard) {
      if (this.checkForMatch(card)) {
        this.selectedCard!.matched = true;
        card.matched = true;
      } else {
        this.selectedCard.flipped = false;
        setTimeout(() => {
          card.flipped = false;
        }, 400);
      }
      this.selectedCard = undefined;
      return;
    }
    this.selectedCard = card;
  }

  private restartGame() {
    this.fields = this.generateGameCards(this.deckSize);
    this.matches = 0;
    this.tryCount = 0;
    this.gameDataService.currentTries$.next(0);
    this.cd.detectChanges();
  }

  private checkForMatch(card: GameCard): boolean {
    if (this.selectedCard?.shoeId === card.shoeId) {
      this.matches++;
      if (this.matches === this.deckSize / 2) {
        this.gameDataService.personalBest$.next(this.tryCount / 2);
      }
      return true;
    }
    return false;
  }

  private generateGameCards(size: number): GameCard[] {
    const numberOfShoes = size / 2;
    const indexes = generateGivenAmountUniqueRandomNumbers(numberOfShoes);
    return new GameBoard(indexes).fields;
  }
}
