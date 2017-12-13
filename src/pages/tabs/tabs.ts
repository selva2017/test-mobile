import { StatisticsPage } from './../statistics/statistics';
import { DashboardPage } from './../dashboard/dashboard';
import { DayBookPage } from './../day-book/day-book';
import { TrialBalPage } from './../trial-bal/trial-bal';
import { Component } from '@angular/core';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  dashboardPage = DashboardPage;
  trialBalPage = TrialBalPage;
  dayBookPage = DayBookPage;
  statisticsPage = StatisticsPage;
}
