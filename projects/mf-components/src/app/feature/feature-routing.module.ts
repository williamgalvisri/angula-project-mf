import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivationGuard } from '@core-mf-components/guards/activation.guard';

const routes: Routes = [
  {
    path: 'constructor',
    canActivate: [ActivationGuard],
    loadChildren: () => import('./constructor/constructor.module').then(m => m.ConstructorModule),
  },
  {
    path: 'home',
    canActivate: [ActivationGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  { path: '',   redirectTo: '/constructor', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
