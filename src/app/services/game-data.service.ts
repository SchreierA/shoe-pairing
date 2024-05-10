import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameDataService {
  personalBest$ = new BehaviorSubject(0);
  currentTries$ = new BehaviorSubject(0);

  //TODO look for a better solution
  resetRequest$ = new BehaviorSubject(0);
}
