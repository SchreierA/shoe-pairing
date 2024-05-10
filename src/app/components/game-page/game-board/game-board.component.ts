import { Component, Input, OnInit } from '@angular/core';
import { GameBoard, GameField } from '../../../model/game-board';
import { GameService } from '../../../services/game.service';
import { CommonModule } from '@angular/common';

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

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameBoard = this.gameService.generateGameBoard(this.deckSize);
    console.log(this.gameBoard);
  }

  getFieldImageSource(card: GameField): String {
    if (card.matched) return 'assets/rieker-logo-kcm-homework-match.png';
    if (card.flipped) return 'assets/shoe-images/' + card.shoeId + '.jpg';
    return 'assets/rieker-logo-kcm-homework.png';
  }
}
