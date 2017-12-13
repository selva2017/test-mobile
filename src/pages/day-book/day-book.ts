import { SplashScreen } from '@ionic-native/splash-screen';
import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PopoverController, LoadingController, AlertController } from "ionic-angular";

import { DayBookService } from './../../services/daybook';
import { DayBookDetailsPage } from './../day-book-details/day-book-details';
import { AuthService } from './../../services/auth';
import { Daybook } from './../../models/daybook';
import { Platform } from 'ionic-angular/platform/platform';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-day-book',
  templateUrl: 'day-book.html',
})
export class DayBookPage {
  dayBookList: Daybook[];
  // dayBookList: {category: string, quotes: Quote[], icon: string}[];
  dayBookDetailsPage = DayBookDetailsPage;

  constructor(private dayBookService: DayBookService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    platform: Platform,statusBar: StatusBar, splashScreen: SplashScreen) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DayBookPage');
  }

  ngOnInit() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.authService.getActiveUser().getToken()
      .then(
      (token: string) => {
        this.dayBookService.fetchList(token)
          .subscribe(
          (list: Daybook[]) => {
            // console.log(list);
            this.dayBookList = list;
            loading.dismiss();
          },
          error => {
            loading.dismiss();
            this.handleError(error.json().error);
          }
          );
      }
      );
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
}
