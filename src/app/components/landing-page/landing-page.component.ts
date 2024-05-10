import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StartGameComponent } from '../shared/start-game/start-game.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FormsModule, StartGameComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}
