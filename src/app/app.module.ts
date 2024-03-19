import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FeaturesModule} from "./Modules/features/features.module";
import {SharedModule} from "./Modules/shared/shared.module";
import {RouterOutlet} from "@angular/router";
import {AdminModule} from "./Modules/admin/admin.module";
import {StoreModule} from "@ngrx/store";
import {AuthModule} from "./Modules/auth/auth.module";
import {authReducer} from "./State/Auth/auth.reducer";
import {userReducer} from "./State/user/user.reducer";

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,

        AdminModule,
        FeaturesModule,
        SharedModule,
        AuthModule,


        FontAwesomeModule,
        RouterOutlet,

        StoreModule.forRoot({auth:authReducer, user: userReducer}, {}),
    ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
