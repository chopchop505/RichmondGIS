import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RoutingModule } from './routing.module';
import { SharedModule } from './shared/shared.module';
import { IncidentService } from './services/incident.service';
import { ParcelService } from './services/parcel.service';
import { WeatherService } from './services/weather.service';

import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { AppComponent } from './app.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { IncidentMapComponent } from './incidents/incident-map.component';
import { IncidentParcelComponent } from './incidents/incident-parcel.component';
import { IncidentWeatherComponent } from './incidents/incident-weather.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    AppComponent,
    IncidentsComponent,
    IncidentMapComponent,
    IncidentParcelComponent,
    IncidentWeatherComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    AccountComponent,
    AdminComponent,
    NotFoundComponent,
  ],
  imports: [
    RoutingModule,
    SharedModule,
    LeafletModule.forRoot(),
    NgxDatatableModule,
  ],
  providers: [
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    IncidentService,
    ParcelService,
    WeatherService,
    UserService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
