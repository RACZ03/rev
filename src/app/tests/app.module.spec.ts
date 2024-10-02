import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { APP_INITIALIZER } from '@angular/core';
import { initializeLanguage } from '@app/app.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '@environment/environment.development';

describe('AppModule', () => {
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [AppComponent],
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: initializeLanguage,
          deps: [TranslateService],
          multi: true,
        },
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        provideAuth(() => getAuth()),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set default language to English', async () => {
    const initializeFn = initializeLanguage(translateService);
    await initializeFn();
    expect(translateService.getDefaultLang()).toBe('en');
    expect(translateService.currentLang).toBe('en');
  });
});
