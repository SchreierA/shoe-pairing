import { shuffleArray } from '../helpers/helpers';
import { gameCards } from './game-cards';

export class GameField {
  shoeId!: string;
  flipped = false;
  matched = false;

  constructor(shoeId: string) {
    this.shoeId = shoeId;
  }
}

export class GameBoard {
  fields: GameField[] = [];

  constructor(shoeIndexes: number[]) {
    for (const index of shoeIndexes) {
      this.fields.push(new GameField(gameCards[index]));
      this.fields.push(new GameField(gameCards[index]));
    }
    this.fields = shuffleArray(this.fields);
  }
}
