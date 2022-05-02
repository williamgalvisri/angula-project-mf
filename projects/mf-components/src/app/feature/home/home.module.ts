import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';

import { HomePage } from './home.component';

@NgModule({
    imports: [HomeRoutingModule],
    exports: [],
    declarations: [HomePage],
    providers: [],
})
export class HomeModule { }
