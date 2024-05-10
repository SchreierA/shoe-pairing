import { Router } from '@angular/router';
import { generatePossibleGameSizes } from '../../../helpers/helpers';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-start-game',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './start-game.component.html',
  styleUrl: './start-game.component.scss',
})
export class StartGameComponent {
  possibleDeckSizes: number[] = generatePossibleGameSizes();

  selectedDeckSize = this.possibleDeckSizes[0];

  constructor(private router: Router) {}

  startGame() {
    this.router.navigate(['game', this.selectedDeckSize]);
  }
}
