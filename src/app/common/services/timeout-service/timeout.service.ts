import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, Subject, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/* eslint-disable @typescript-eslint/no-explicit-any */
export class TimeoutService {

  private idle!: Observable<any>;
  private idleSubscription!: Subscription;
  private timeoutInMilliseconds!: number;
  private timer!: Subscription;

  public expired: Subject<boolean> = new Subject<boolean>();

  public startWatching(timeoutSeconds: number): Observable<boolean> {
    this.idle = merge(
      fromEvent(document, 'click'),
      fromEvent(document, 'DOMMouseScroll'),
      fromEvent(document, 'keypress'),
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'mousedown'),
      fromEvent(document, 'mousewheel'),
      fromEvent(document, 'MSPointerMove'),
      fromEvent(document, 'touchmove'),
      fromEvent(window, 'mousemove'),
      fromEvent(window, 'resize'),
    );
    this.timeoutInMilliseconds = timeoutSeconds * 1000;
    this.idleSubscription = this.idle.subscribe(() => {
      this.resetIdleTimer();
    });
    this.startIdleTimer();
    return this.expired;
  }

  private startIdleTimer(): void {
    this.timer = timer(this.timeoutInMilliseconds, this.timeoutInMilliseconds).subscribe(() => {
      this.expired.next(true);
    });
  }

  public resetIdleTimer(timeoutSeconds?: number) {
    this.timer.unsubscribe();
    if (timeoutSeconds) {
      this.timeoutInMilliseconds = timeoutSeconds * 1000;
    }
    this.startIdleTimer();
  }

  public stopIdleTimer(): void {
    this.timer.unsubscribe();
    this.idleSubscription.unsubscribe();
  }

}
