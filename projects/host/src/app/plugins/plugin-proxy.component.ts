import { Component, Input, ViewChild, ViewContainerRef, AfterContentInit } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { PluginOptions } from './plugin';

@Component({
    selector: 'plugin-form-proxy',
    template: `
        <ng-container #placeHolder></ng-container>
    `
})
export class PluginProxyComponent implements AfterContentInit {
    @ViewChild('placeHolder', { read: ViewContainerRef, static: true })
    viewContainer!: ViewContainerRef;

    constructor() { }

    @Input() option!: PluginOptions;

    async ngAfterContentInit() {
        const Component = await loadRemoteModule(this.option).then(m => m[this.option.componentName]);
        const compRef = this.viewContainer.createComponent(Component);
        const compInstance = compRef.instance as any;
        compInstance.idForm = this.option.idForm;
    }
}

