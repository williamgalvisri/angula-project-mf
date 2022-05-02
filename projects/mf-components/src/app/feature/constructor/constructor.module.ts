import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared-mf-components/shared.module';
import { ConstructorRoutingModule } from './constructor-routing.module';

import { ConstructorPage } from './constructor.component';

@NgModule({
    imports: [CommonModule, SharedModule, ConstructorRoutingModule],
    exports: [],
    declarations: [ConstructorPage],
    providers: [],
})
export class ConstructorModule { }
