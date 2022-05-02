import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GeneralSchemaFormBuilder } from '@utils-mf-components/models/global.model';
// import { FormbuilderSelectors } from '../../store/formbuilder.selector';
import { DynamicFormBuilderService } from '../dynamic-form-builder.model.service';

@Component({
  selector: 'port-dynamic-form-builder',
  templateUrl: 'port-dynamic-form-builder.component.html',
  styleUrls: ['./port-dynamic-form-builder.component.css']
})
export class PortDynamicFormBuilderComponent implements OnInit, DoCheck, OnChanges {
  // @Select(FormbuilderSelectors.item) item$!: Observable<GeneralSchemaFormBuilder>;
	@Input() schemaFormFields: GeneralSchemaFormBuilder = new GeneralSchemaFormBuilder();
  public _schemaFormFields: GeneralSchemaFormBuilder = new GeneralSchemaFormBuilder();
  public toggleValueFormGroup: FormGroup = new FormGroup({
    modeProduction: new FormControl(false),
    modeGridPosition: new FormControl(true),
  });
  constructor(
    // TODO: Check library ngx-undo
    private store: Store, 
    private dynamicFormBuilderService: DynamicFormBuilderService) {
  }

  ngOnInit() {
    // this.item$.subscribe((value) => {
    //   this._schemaFormFields = value;
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.dynamicFormBuilderService.loadVariables(this.schemaFormFields.variables);
  }
  
  ngDoCheck() {
    // TODO: Check library ngx-undo
    // console.log(this._schemaFormFields, this.schemaFormFields);
    // const _diff = diff(this._schemaFormFields, this.schemaFormFields);
    // if (Object.keys(_diff).length) {
    //   // this.store.dispatch(new UpdateFormbuilder(this.schemaFormFields))
    // }
  }
}
