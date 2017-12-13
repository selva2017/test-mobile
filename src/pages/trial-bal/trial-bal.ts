import { TrialBalanceService } from './../../services/trialbalance';
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PopoverController, LoadingController, AlertController } from "ionic-angular";

import { AuthService } from './../../services/auth';

@Component({
  selector: 'page-trial-bal',
  templateUrl: 'trial-bal.html',
})
export class TrialBalPage implements OnInit {
  trialBalanceList: any[];

  constructor(private trialBalanceService: TrialBalanceService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TrialBalPage');
  }
  onShowOptions() { }

  itemSelected() { }
  onRemoveFromList(item) {

  }
  ngOnInit() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    // const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    // popover.present({ev: event});
    // popover.onDidDismiss(
    //   data => {
    //     if (!data) {
    //       return;
    //     }

    this.authService.getActiveUser().getToken()
      .then(
      (token: string) => {
        this.trialBalanceService.fetchList(token)
          .subscribe(
          (list: any[]) => {
            loading.dismiss();
            // console.log(list);
            this.trialBalanceList = list;
            // if (list) {
            //   this.listItems = list;
            // } else {
            //   this.listItems = [];
            // }
          },
          error => {
            loading.dismiss();
            this.handleError(error.json().error);
          }
          );
      }
      );

    // fetchList(token: string) {
    // const userId = this.authService.getActiveUser().uid;
    // return this.http.get('https://ionic2-recipebook-71713.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
    // .map((response: Response) => {
    // const recipes: Recipe[] = response.json() ? response.json() : [];
    // for (let item of recipes) {
    // if (!item.hasOwnProperty('ingredients')) {
    // item.ingredients = [];
    // }
    // }
    // return recipes;
    // console.log(response);
    // })
    // .do((recipes: Recipe[]) => {
    //   if (recipes) {
    //     this.recipes = recipes;
    //   } else {
    //     this.recipes = [];
    //   }
    // });
  }
  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }
}
