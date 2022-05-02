import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ActivationGuard } from './guards/activation.guard';

@NgModule({
    imports: [CommonModule, AngularMaterialModule],
    exports: [CommonModule, AngularMaterialModule],
    declarations: [],
    providers: [ActivationGuard],
})
export class CoreModule { }
