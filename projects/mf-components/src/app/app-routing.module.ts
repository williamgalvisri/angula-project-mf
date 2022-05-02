import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivationGuard } from '@core-mf-components/guards/activation.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule),
  },
  { path: '',   redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
