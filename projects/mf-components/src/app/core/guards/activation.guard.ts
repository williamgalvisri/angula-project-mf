import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CacheLoaderService } from '@shared-mf-components/services/cache-loader.service';

// Services

@Injectable()
export class ActivationGuard implements CanActivate {
  constructor(
    private cacheLoaderService: CacheLoaderService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (!this.cacheLoaderService.appCacheResolved) {
      return this.cacheLoaderService.fetchAppData().pipe(finalize(() => {
      }));
    }
    return false;
  }
}
