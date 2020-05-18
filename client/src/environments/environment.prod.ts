import { AuthGuard } from '../app/auth/auth.guard';
import { LandingPageComponent } from '../app/pages/landing-page/landing-page.component';
import { LoginPageComponent } from '../app/pages/login-page/login-page.component';

export const environment = {
  production: true,
  routes: [
    {
      path: 'landing',
      component: LandingPageComponent,
      canActivate: [AuthGuard],
    },
    { path: '', component: LoginPageComponent },
  ],
};
