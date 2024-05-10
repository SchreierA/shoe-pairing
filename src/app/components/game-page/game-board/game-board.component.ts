import { Component, Input, OnInit } from '@angular/core';
import { GameBoard, GameCard } from '../../../model/game-board';
import { CommonModule } from '@angular/common';
import { generateGivenAmountUniqueRandomNumbers } from '../../../helpers/helpers';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements OnInit {
  @Input()
  deckSize!: number;

  gameBoard?: GameBoard;

  selectedCard?: GameCard;

  ngOnInit(): void {
    this.gameBoard = this.generateGameBoard(this.deckSize);
  }

  getFieldImageSource(card: GameCard): String {
    if (card.matched) return 'assets/rieker-logo-kcm-homework-match.png';
    if (card.flipped) return 'assets/shoe-images/' + card.shoeId + '.jpg';
    return 'assets/rieker-logo-kcm-homework.png';
  }

  flipCard(card: GameCard) {
    if (card.flipped || card.matched) return;

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

  private checkForMatch(card: GameCard): boolean {
    return this.selectedCard?.shoeId === card.shoeId;
  }

  private generateGameBoard(size: number): GameBoard {
    const numberOfShoes = size / 2;
    const indexes = generateGivenAmountUniqueRandomNumbers(numberOfShoes);
    return new GameBoard(indexes);
  }
}
