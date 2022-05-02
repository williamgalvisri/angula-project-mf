import { Injectable } from '@angular/core';
import { combineLatest, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormBuilderService } from './form-builder.service';

@Injectable({ providedIn: 'root' })
export class CacheLoaderService {
  public appDataObservables: Array<Observable<any>> = [];
  private started = new Subject<boolean>();
  public appCacheResolved = false;
  private appSubscription!: Subscription;
  constructor(private formBuilderService: FormBuilderService) {}

  get appSubs() {
    return this.appSubscription;
  }

  public fetchAppData() {
    this.initializeDataCached();
    this.started.next(false);
    this.appSubscription = combineLatest(this.appDataObservables)
      .pipe()
      .subscribe((res) => {
        this.appCacheResolved = true;
        this.started.next(true);
      });
    return this.started.asObservable();
  }

  private initializeDataCached() {
    this.appDataObservables = [
      this.formBuilderService.formBuilderGetAll().pipe(
        map(this.formBuilderService.onSnapshotSuccess),
        catchError((err) => of(this.formBuilderService.onSnapshotError(err)))
      ),
    ];
  }
}
