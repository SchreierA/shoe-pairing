import { shuffleArray } from '../helpers/helpers';
import { gameCards } from './game-cards';

export class GameCard {
  shoeId!: string;
  flipped = false;
  matched = false;

  constructor(shoeId: string) {
    this.shoeId = shoeId;
  }
}

export class GameBoard {
  fields: GameCard[] = [];

  constructor(shoeIndexes: number[]) {
    for (const index of shoeIndexes) {
      this.fields.push(new GameCard(gameCards[index]));
      this.fields.push(new GameCard(gameCards[index]));
    }
    this.fields = shuffleArray(this.fields);
  }
}
