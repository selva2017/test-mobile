
import { Platform, NavController, MenuController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { TabsPage } from './../pages/tabs/tabs';
import { AuthService } from "../services/auth";
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DayBookPage } from '../pages/day-book/day-book';
import { StatisticsPage } from './../pages/statistics/statistics';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  dashboardPage = DashboardPage;
  dayBookPage = DayBookPage;
  statisticsPage = StatisticsPage;

  isAuthenticated = false;

  @ViewChild('nav') nav: NavController;
  constructor(platform: Platform,
    private menuCtrl: MenuController,
    private authService: AuthService,
    statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyCjl3pztDYOZryXR_6B3b2KxFRiRAyJL3Q",
      authDomain: "ionic2-recipebook-71713.firebaseapp.com",
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }

}

