import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, skip, takeUntil } from 'rxjs';
import { StorageService } from './storage.sevice';
import { LocalStorageKeys } from '../helpers/constants';
import { SubscriptionHostMixin } from '../mixins/SubscriptionHost';

@Injectable({ providedIn: 'root' })
export class GameDataSharingService extends SubscriptionHostMixin() {
  highScore$ = new BehaviorSubject(0);
  currentTries$ = new BehaviorSubject(0);

  resetRequest$ = new Subject<number>();

  constructor(private storageService: StorageService) {
    super();
    this.readSavedState();
    this.setupDataRecording();
  }

  private readSavedState() {
    const savedhighScore = this.storageService.getItem(
      LocalStorageKeys.PERSONAL_BEST_LOCAL_STORAGE_KEY
    );

    const savedCurrentTries = this.storageService.getItem(
      LocalStorageKeys.CURRENT_TRIES_LOCAL_STORAGE_KEY
    );

    this.highScore$.next(+(savedhighScore ?? 0));
    this.currentTries$.next(+(savedCurrentTries ?? 0));
  }

  private setupDataRecording() {
    this.highScore$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) =>
        this.storageService.setItem(
          LocalStorageKeys.PERSONAL_BEST_LOCAL_STORAGE_KEY,
          value
        )
      );

    this.currentTries$.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
      this.storageService.setItem(
        LocalStorageKeys.CURRENT_TRIES_LOCAL_STORAGE_KEY,
        value
      );
    });
  }
}
