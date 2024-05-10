import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  selectedSize = this.possibleDeckSizes[0];
}
