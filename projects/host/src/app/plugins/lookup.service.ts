import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PluginOptions } from './plugin';

@Injectable({ providedIn: 'root' })
export class LookupService {
  lookup(idForm: string): Promise<PluginOptions> {
    return Promise.resolve({
        type: 'module',
        remoteEntry: `${environment.remoteComponentUrlBase}/mfComponentsRemoteEntry.js`,
        exposedModule: './MfBuilder',
        displayName: 'mfComponents',
        componentName: 'SharedDynamicFormBuilderComponent',
        idForm: idForm
      } as PluginOptions);
  }
}
