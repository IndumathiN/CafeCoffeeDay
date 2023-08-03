import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material/material.module';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { MenuComponent } from './menu/menu.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage'
// import { AngularFireAuthModule } from "@angular/fire/compat/auth";

import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SignupDetailsComponent } from './signup/signup-details/signup-details.component';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { ItemComponent } from './menu/item/item.component';
import { PriceComponent } from './dialog/price/price.component';


import { ErrorStateMatcher } from '@angular/material/core';
import { TouchedErrorStateMatcher } from './touched-error-state.matcher';
import { ListComponent } from './menu/list/list.component';
import { DetailsComponent } from './menu/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    MenuComponent,
    SignupDetailsComponent,
    DeleteDialogComponent,
    ItemComponent,
    PriceComponent,
    ListComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAnalytics(() => getAnalytics()),
    // provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
    // provideFirestore(() => getFirestore())
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  //  AngularFireAuthModule,
  //  AngularFireStorageModule
  ],
  providers: [AuthGuard, ScreenTrackingService,UserTrackingService,
    { provide: ErrorStateMatcher, useClass: TouchedErrorStateMatcher }],
  bootstrap: [AppComponent]
})
export class AppModule { }
