import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthguardServiceService } from 'src/app/services/authguardServices/authguard-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authGuardService: AuthguardServiceService, private router: Router) { }

  canActivate(): boolean {
    if (!this.authGuardService.getToken()) {
      this.router.navigateByUrl("/login");
    }
    return this.authGuardService.getToken();
  }
  
}
