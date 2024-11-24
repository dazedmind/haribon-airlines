import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterModule.forRoot([])],
      providers: [{ provide: AlertController, useValue: alertControllerSpy }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have menu labels', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(6); // Match the appPages
    expect(menuItems[0].textContent).toContain('Inbox');
    expect(menuItems[1].textContent).toContain('Outbox');
  });

  it('should have URLs', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(6); // Match the appPages
    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/folder/inbox');
    expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/folder/outbox');
  });

  it('should call showLoginAlert method', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    spyOn(app, 'showLoginAlert').and.callThrough();
    await app.showLoginAlert();

    expect(app.showLoginAlert).toHaveBeenCalled();
    expect(alertControllerSpy.create).toHaveBeenCalledWith(
      jasmine.objectContaining({
        header: 'You must be logged in.',
        cssClass: 'custom-alert',
        message: 'Rewards are waiting.',
      })
    );
  });
});
