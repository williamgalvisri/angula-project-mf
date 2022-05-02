import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewComponent } from './new.component';

@NgModule({
  declarations: [
    AppComponent,
    NewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(private injector: Injector) {
    // create custom elements from angular components
    const ngCustomElement = createCustomElement(NewComponent, { injector: this.injector });
    // define in browser registry
    customElements.define('ng-el', ngCustomElement);
  }
  ngDoBootstrap(): void {}
}
