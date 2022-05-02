import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventTypeButton } from './dynamic-form-builder.model';
import { HttpClient } from '@angular/common/http';
import { StringUtilities } from '@utils-mf-components/string.utils';
import { FetchingConfig, FormSchemaFetchingWithIdentifierElement, FormSchemaGeneralSettings } from '@utils-mf-components/models/global.model';


@Injectable({providedIn: 'root'})
export class DynamicFormBuilderService {
  private _buttonTriggerEventType$ = new Subject<EventTypeButton>();
  public buttonTriggerEventType$ = this._buttonTriggerEventType$.asObservable();
  private _tableDataAssign$ = new Subject<EventTypeButton>();
  public tableDataAssignObservable$ = this._tableDataAssign$.asObservable();
  private _variablesChanges$ = new Subject<boolean>();
  public variablesChangesObservable$ = this._variablesChanges$.asObservable();

  private _fetchingElement$ = new Subject<FormSchemaFetchingWithIdentifierElement>();
  public fetchingElementObservable$ = this._fetchingElement$.asObservable();
  private _responseFetchingElement$ = new Subject<any[]>();
  public responseFetchingElement$ = this._responseFetchingElement$.asObservable();
  public variables: Record<string, any> = {}

  public generalSetting!: FormSchemaGeneralSettings;

  constructor(private http: HttpClient) {}
  // ---------------------- emmitButtonTriggerEventType ----------------------
  public emmitButtonTriggerEventType(eventType: EventTypeButton) {
    return this._buttonTriggerEventType$.next(eventType);
  }

  public onChangesButtonButtonTriggerEventType(): Observable<EventTypeButton> {
    return this.buttonTriggerEventType$;
  }

  // ---------------------- emmitButtonTriggerEventType ----------------------

  // ---------------------- emmitFetchingElement ----------------------
  public emmitFetchingElement(data: FormSchemaFetchingWithIdentifierElement) {
    return this._fetchingElement$.next(data);
  }

  public onChangesFetchingElement(): Observable<FormSchemaFetchingWithIdentifierElement> {
    return this.fetchingElementObservable$;
  }
  // ---------------------- emmitFetchingElement ----------------------

  // ---------------------- emmitFetchingElement ----------------------
  public emmitResponseFetchingElement(data: any) {
    return this._responseFetchingElement$.next(data);
  }

  public onChangesResponseFetchingElement(): Observable<any> {
    return this.responseFetchingElement$;
  }
  // ---------------------- emmitFetchingElement ----------------------

  // ---------------------- emmitFetchingElement ----------------------
  public emmitVariablesChanges(value: boolean) {
    return this._variablesChanges$.next(value);
  }

  public onChangesVariablesChanges(): Observable<any> {
    return this.variablesChangesObservable$;
  }
  // ---------------------- emmitFetchingElement ----------------------

  // TODO: configurar los paramtros extendidos en caso de que se requiera pasar parametros extras
  public onFetchingMethod({
    baseUrl,
    endpoint,
    method,
    headers,
    data,
    paramUrl,
  }: FetchingConfig): Observable<any> {
    const endpointComplete = `${baseUrl}/${endpoint}`;
    const options = {
      headers: headers,
    };
    switch (method) {
      case 'GET':
        return this.http.get(endpointComplete, options);
      case 'POST':
        return this.http.post(endpointComplete, data, options);
      case 'PUT':
        return this.http.put(endpointComplete, data, options);
      case 'DELETE':
        return this.http.delete(endpointComplete, options);
    }
  }
  // Vairable settings
  loadVariables(variables: string[] | Record<string, any>) {
    if (Array.isArray(variables)) {
      this.variables = variables.reduce((map, value) => {
        return {
          ...map,
          [value]: null
        }
      }, {});
    } else {
      this.variables = {
        ...this.variables,
        ...variables
      }
    }
  }

  assignValueVariableWithKey(key: string, value: any) {
    if (`${key}` in this.variables) {
      this.variables[key] = value
    }
    this.emmitVariablesChanges(true)
  }

  getValueInterpolated(str: string): any {
    let _str = str ?? '';
    // Get paramters iterpolates
    const getParamsInserted = StringUtilities.getAllValueBetweenCharacters('{{', '}}')(str);
    // Get url parsed if exist any parameter
    const withParameters = getParamsInserted?.reduce((value, key) => {
      value = _str?.replace(`{{${key}}}`, eval(`this.variables?.${key}`) ?? '')
      return value
    }, '');
    const stringParsed = getParamsInserted?.length ? withParameters : _str
    return stringParsed ?? null;
  }
}
