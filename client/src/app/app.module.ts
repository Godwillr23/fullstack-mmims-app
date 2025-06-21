import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { SplashComponent } from './home/splash/splash.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ProfileComponent } from './account/profile/profile.component';
import { LoaderComponent } from './home/loader/loader.component';
import { UpdateProfileComponent } from './account/update-profile/update-profile.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { AutocompleteOffDirective } from './autocomplete-off.directive';
import { ProgressBarComponent } from './attendance-register/progress-bar/progress-bar.component';
import { FieldAdminComponent } from './attendance-register/field-admin/field-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SplashComponent,
    ProfileComponent,
    LoaderComponent,
    UpdateProfileComponent,
    AutocompleteOffDirective,
    ProgressBarComponent,
    FieldAdminComponent
  ],
  exports: [AutocompleteOffDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,  
    environment.production
      ? ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: true,
          registrationStrategy: 'registerWhenStable:30000'
        })
      : [],
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
