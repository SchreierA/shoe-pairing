import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export function SubscriptionHostMixin() {
  return class implements OnDestroy {
    destroyed$ = new Subject();

    ngOnDestroy(): void {
      this.destroyed$.next(true);
      this.destroyed$.complete();
    }
  };
}
