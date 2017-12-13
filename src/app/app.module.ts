import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AuthService } from './../services/auth';
import { StatisticsService } from './../services/statistics';
import { DayBookService } from './../services/daybook';
import { TrialBalanceService } from './../services/trialbalance';
import { DayBookDetailsPage } from './../pages/day-book-details/day-book-details';
import { TrialBalPage } from './../pages/trial-bal/trial-bal';
import { TabsPage } from './../pages/tabs/tabs';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { DayBookPage } from './../pages/day-book/day-book';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { BrowserModule } from '@angular/platform-browser';
import { MyApp } from './app.component';
import { StatisticsPage } from '../pages/statistics/statistics';

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    DayBookPage,
    SigninPage,
    SignupPage,
    TabsPage,
    TrialBalPage,
    DayBookDetailsPage,
    StatisticsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp), BrowserModule, HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    DayBookPage,
    SigninPage,
    SignupPage,
    TabsPage,
    TrialBalPage,
    DayBookDetailsPage,
    StatisticsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }, AuthService, TrialBalanceService, DayBookService, StatisticsService
  ]
})
export class AppModule { }
