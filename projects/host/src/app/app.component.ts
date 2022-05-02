
import { Component, OnInit} from '@angular/core';
import { LookupService } from './plugins/lookup.service';
import { PluginOptions } from './plugins/plugin';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public plugin!: PluginOptions;
  public idForm = '6228db9db821e536108ccba2';

  constructor(
    private lookupService: LookupService,
  ) {
  }
  
  async ngOnInit() {
    this.getFormConfiguration()
  }

  public async getFormConfiguration() {
    this.plugin = await this.lookupService.lookup(this.idForm);
  }
}
