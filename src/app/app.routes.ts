import { Routes } from '@angular/router';
import { AppLayoutComponent } from './features/auth/layouts/app-layout/app-layout.component';
import { authGuard, notAuthGuard } from './core/guards/access.guard';
import { LoginFormComponent } from './features/auth/components/login-form/login-form.component';
import { RegisterFormComponent } from './features/auth/components/register-form/register-form.component';
import { AuthLayoutComponent } from './features/auth/layouts/auth-layout/auth-layout.component';
import { FeedComponent } from './features/post/pages/feed/feed.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [notAuthGuard],
    children: [
      { path: 'login', title: 'Login', component: LoginFormComponent },
      { path: 'register', title: 'Register', component: RegisterFormComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'feed', title: 'Feed Posts', component: FeedComponent },

      { path: '', redirectTo: 'feed', pathMatch: 'full' },
    ],
  },
];
