import { Injectable } from '@angular/core';
import { generateGivenAmountUniqueRandomNumbers } from '../helpers/helpers';
import { GameBoard } from '../model/game-board';

@Injectable({ providedIn: 'root' })
export class GameService {
  generateGameBoard(size: number): GameBoard {
    const numberOfShoes = size / 2;
    const indexes = generateGivenAmountUniqueRandomNumbers(numberOfShoes);
    return new GameBoard(indexes);
  }
}
