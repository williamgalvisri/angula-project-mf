import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralSchemaFormBuilder } from '@utils-mf-components/models/global.model';

// Utils
import { formBuilderSchemaGeneralDummyData } from '@utils-mf-components/page/app.utils';
import { CacheLoaderService } from '@shared-mf-components/services/cache-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'mf-components';
  public formSchemaGeneralSettings: GeneralSchemaFormBuilder = formBuilderSchemaGeneralDummyData;

  constructor(public cacheLoaderService: CacheLoaderService) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {}


}
