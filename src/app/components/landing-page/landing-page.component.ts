import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  possibleDeckSizes: number[] = Array.from({ length: 8 }).map(
    (_, index) => (index + 3) * 2
  );

  selectedDeckSize = this.possibleDeckSizes[0];

  constructor(private router: Router) {}

  startGame() {
    this.router.navigate(['game', this.selectedDeckSize]);
  }
}