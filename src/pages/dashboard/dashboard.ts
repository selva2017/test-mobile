import { Component, ViewChild, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController
} from 'ionic-angular';
import { Chart } from 'chart.js';
import { StatisticsService } from '../../services/statistics';
import { AuthService } from '../../services/auth';
import { ProdStatistics } from '../../models/prod-statistics';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  // Our childs for different charts
  // We would be using these for canvas elements
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('radarCanvas') radarCanvas;
  @ViewChild('polarCanvas') polarCanvas;
  @ViewChild('pieCanvas') pieCanvas;
  @ViewChild('bubbleCanvas') bubbleCanvas;
  @ViewChild('mixedCanvas') mixedCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;
  radarChart: any;
  polarAreaChart: any;
  pieChart: any;
  bubbleChart: any;
  mixedChart: any;
  prodStatistics: any[];
  data1: number;
  data2: number;
  data3: number;
  data4: number;
  graph_data: number[];
  numbers = new Array();
  pet: string = "Production";
  today: number = Date.now();
  prod_data: any[];  
  prod_month: any[];  

  constructor(public navCtrl: NavController,
    private statisticsService: StatisticsService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) { }

    ionViewDidEnter() {
      console.log("Did enter...");
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    // this.authService.getActiveUser().getToken()
    // .then(
    // (token: string) => {
    // console.log(token);
    this.statisticsService.fetchList()
      .subscribe(
      (list) => {
        this.prodStatistics = list;
        console.log(this.prodStatistics);
        this.prod_data = [];
        this.prod_month = [];
        // console.log(this.prodStatistics.productionSummaries.length);
        // for(var i=0; i < this.prodStatistics.productionSummaries.length; i++)
        //   if (Number(this.prodStatistics.productionSummaries[i].amount) > 0) {
        //     this.prod_data[i] = Number(this.prodStatistics.productionSummaries[i].amount/1000);
        //     this.prod_month[i] = this.prodStatistics.productionSummaries[i].month;
        // }
        console.log(this.prod_data.length);
        console.log(this.prod_data);
        console.log(this.prod_month);
        // this.numbers.push(Number(this.prodStatistics.stockWeek/1000));
        // this.numbers.push(Number(this.prodStatistics.stockMonth/1000));
        // this.numbers.push(Number(this.prodStatistics.stockQuarter/1000));
        // this.numbers.push(Number(this.prodStatistics.stockYear)/1000);
        loading.dismiss();
        // Call the chart from here
        // this.barChart = this.getLineChart();
        // this.barChart = this.getBarChart();
      },
      error => {
        loading.dismiss();
        this.handleError(error.json().error);
      }
      );
    }
  //   // );
  //   // this.data1 = [this.prodStatistics[0].stockWeek, this.prodStatistics[0].stockMonth, this.prodStatistics[0].stockQuarter, this.prodStatistics[0].stockYear];
  // }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  ionViewDidLoad() {
    // this wont get prod_data so need to call getLineChat() from Constructor
    // console.log('ionViewDidLoad ChartJsPage');
    // this.doughnutChart = this.getDoughnutChart();
    // this.lineChart = this.getLineChart();
    // this.radarChart = this.getRadarChart();
    // this.pieChart = this.getPieChart();
    // this.polarAreaChart = this.getPolarAreaChart();
    // this.bubbleChart = this.getBubbleChart();
    // this.mixedChart = this.getMixedChart();
  }

  displayINR(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  }
  displayIndianNumber(amount: number){
     return Number(Math.round(amount)).toLocaleString('en-IN');
  }
  getChart(context, chartType, data, options?) {
    console.log("data"+data);
    return new Chart(context, {
      type: chartType,
      data: data,
      options: options
    });
  }

  // This is our first chart
  getBarChart() {
    console.log(this.numbers);
    let data = {
      labels: this.prod_month,
      // labels: ["Week", "Month", "Quarter", "Year"],
      // labels: ["Red", "Brown", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Tons',
        data: this.prod_data,
        // data: this.numbers,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(244, 164, 96, 0.8)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(244, 164, 96, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    };

    let options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    return this.getChart(this.barCanvas.nativeElement, "bar", data, options);
  }

  getDoughnutChart() {
    let data = {
      labels: ["Red", "Brown", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(244, 164, 96, 0.8)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        hoverBackgroundColor: ["#FF6384", "#551a8b", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
      }]
    };

    return this.getChart(this.doughnutCanvas.nativeElement, "doughnut", data);
  }

  getLineChart() {
    var data = {
      // labels: ["January", "February", "March", "April", "May", "June", "July", "August"],
      // labels: ["January", "February", "March", "April", "May", "June", "July", "August","s","o","n","d"],
      labels: this.prod_month,
      datasets: [
        {
          label: "Monthly Production in tons",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.prod_data,
          // data: [689765, 670511, 1045616, 547971, 948088, 992679, 1168824, 1523082, 3373, 0, 0],
          // data: [65, 59, 80, 81, 56, 55, 40, 32],
          spanGaps: false,
        },
        // {
        //   label: "Final Dataset",
        //   fill: false,
        //   lineTension: 0.1,
        //   backgroundColor: "rgba(175,92,192,0.4)",
        //   borderColor: "rgba(31,156,156,1)",
        //   borderCapStyle: 'butt',
        //   borderDash: [5, 8],
        //   borderDashOffset: 0.0,
        //   borderJoinStyle: 'miter',
        //   pointBorderColor: "rgba(31,156,156,1)",
        //   pointBackgroundColor: "#fff",
        //   pointBorderWidth: 1,
        //   pointHoverRadius: 5,
        //   pointHoverBackgroundColor: "rgba(31,156,156,1)",
        //   pointHoverBorderColor: "rgba(220,220,220,1)",
        //   pointHoverBorderWidth: 2,
        //   pointRadius: 1,
        //   pointHitRadius: 10,
        //   data: this.prod_data,
        //   // data: [689765, 670511, 1045616, 547971, 948088, 992679, 1168824, 1523082, 3373, 0, 0],
        //   // data: [15, 39, 50, 81, 51, 55, 30, 70],
        //   spanGaps: false,
        // }
      ]
    };

    return this.getChart(this.lineCanvas.nativeElement, "line", data);
  }

  getRadarChart() {
    let data = {
      labels: ["Eating", "Drinking", "Playing", "Designing", "Coding", "Dancing", "Running"],
      datasets: [
        {
          label: "Initial Dataset",
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: "Final Dataset",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    };

    let options = {
      scale: {
        reverse: true,
        ticks: {
          beginAtZero: true
        }
      }
    };

    return this.getChart(this.radarCanvas.nativeElement, "radar", data, options);
  }

  getPolarAreaChart() {
    let data = {
      datasets: [{
        data: [11, 16, 7, 3, 14],
        backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"],
        label: 'Current Dataset'
      }],
      labels: ["Red", "Green", "Yellow", "Grey", "Blue"]
    };

    let options = {
      elements: {
        arc: {
          borderColor: "#000000"
        }
      }
    };

    return this.getChart(this.polarCanvas.nativeElement, "polarArea", data, options);
  }

  getPieChart() {
    let data = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }]
    };

    return this.getChart(this.pieCanvas.nativeElement, "pie", data);

  }

  getBubbleChart() {
    let data = {
      datasets: [
        {
          label: 'Initial Dataset',
          data: [
            { x: 20, y: 30, r: 15 },
            { x: 40, y: 10, r: 10 },
          ],
          backgroundColor: "#FF6384",
          hoverBackgroundColor: "#FF6384",
        }]
    };

    let options = {
      elements: {
        points: {
          borderWidth: 1,
          borderColor: 'rgb(0, 0, 0)'
        }
      }
    };

    return this.getChart(this.bubbleCanvas.nativeElement, "bubble", data, options);
  }

  getMixedChart() {
    let data = {
      labels: ['Item 1', 'Item 2', 'Item 3'],
      datasets: [
        {
          type: 'bar',
          label: 'Bar Component',
          data: [10, 20, 30],
          backgroundColor: "#F5DEB3"
        },
        {
          type: 'line',
          label: 'Line Component',
          data: [30, 20, 10],
          backgroundColor: "#F5DEB3"
        }
      ]
    };

    return this.getChart(this.mixedCanvas.nativeElement, "bar", data);

  }
}
