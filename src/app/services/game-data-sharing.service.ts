import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, skip, takeUntil } from 'rxjs';
import { StorageService } from './storage.sevice';
import {
  CURRENT_TRIES_LOCAL_STORAGE_KEY,
  PERSONAL_BEST_LOCAL_STORAGE_KEY,
} from '../helpers/constants';
import { SubscriptionHostMixin } from '../mixins/SubscriptionHost';

@Injectable({ providedIn: 'root' })
export class GameDataSharingService extends SubscriptionHostMixin() {
  personalBest$ = new BehaviorSubject(0);
  currentTries$ = new BehaviorSubject(0);

  resetRequest$ = new Subject<number>();

  constructor(private storageService: StorageService) {
    super();
    this.readSavedState();
    this.setupDataRecording();
  }

  private readSavedState() {
    const savedPersonalBest = this.storageService.getItem(
      PERSONAL_BEST_LOCAL_STORAGE_KEY
    );
    const savedCurrentTries = this.storageService.getItem(
      CURRENT_TRIES_LOCAL_STORAGE_KEY
    );
    this.personalBest$.next(+(savedPersonalBest ?? 0));
    this.currentTries$.next(+(savedCurrentTries ?? 0));
  }

  private setupDataRecording() {
    this.personalBest$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) =>
        this.storageService.setItem(PERSONAL_BEST_LOCAL_STORAGE_KEY, value)
      );
    this.currentTries$.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
      this.storageService.setItem(CURRENT_TRIES_LOCAL_STORAGE_KEY, value);
    });
  }
}
