import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { GamePageComponent } from './components/game-page/game-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'game/:size', component: GamePageComponent },
];
