import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { CheckRefreshTokenService } from '../services/check-refresh-token/check-refresh-token.service';
import { Observable, catchError, map, of } from 'rxjs';
import { RemoveRefreshTokenService } from '../services/remove-refresh-token/remove-refresh-token.service';

@Injectable({
  providedIn: 'root'
})
export class SignInGuard {

  constructor(
    private router: Router, 
    private storageService: StorageService,
    private checkRefreshToken: CheckRefreshTokenService,
    private removeRefreshTokenService: RemoveRefreshTokenService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkRefreshToken.checkRefreshToken().pipe(
      map(e => {
          return false;
        }
      ),
      catchError((e) => {
          this.storageService.removeItem("uid");
          this.removeRefreshTokenService.removeRefreshToken().subscribe();
          return of(true);
      })
    )
  }
}