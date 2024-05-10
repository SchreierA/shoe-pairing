import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-game-page',
  standalone: true,
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
})
export class GamePageComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.handleFallback(params);
    });
  }

  handleFallback(params: Params) {
    const size = params['size'];
    const sizeTooBig = size > 20;
    const sizeTooSmall = size < 6;
    const sizeIsOdd = size % 2;
    if (!size || sizeIsOdd || sizeTooBig || sizeTooSmall) {
      this.router.navigate(['']);
    }
  }
}
