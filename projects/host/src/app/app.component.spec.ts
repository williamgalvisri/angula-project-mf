import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { PluginProxyComponent } from './plugins/plugin-proxy.component';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixtureAppComponent: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixtureAppComponent = TestBed.createComponent(AppComponent);
    appComponent = fixtureAppComponent.componentInstance;
    fixtureAppComponent.detectChanges()
  })

  it('should create the app', () => {
    appComponent = fixtureAppComponent.componentInstance;
    expect(appComponent).toBeTruthy();
  });
  it('should be called method getFormConfiguration', () => {
    const spyGetFormConfiguration = spyOn(appComponent, 'getFormConfiguration');
    appComponent.ngOnInit();
    fixtureAppComponent.detectChanges();
    expect(spyGetFormConfiguration).toHaveBeenCalled();
  })

});
