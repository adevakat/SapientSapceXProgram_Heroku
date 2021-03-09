import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandFlagList, LunchFlagList, YearList } from 'src/app/app.const';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /************************************ Public Properties **************************************/
  public launchYears = YearList;
  public launchFlags = LunchFlagList;
  public landFlags = LandFlagList;
  public launchData: any;
  public serverErrFlag: boolean = false;
  public yearVal: any;
  public launchVal: any;
  public landVal: any;

  /************************************ Constructor **************************************/
  constructor(public dashboardServics: DashboardService, public router: Router) { }

  /************************************ ngOnInit Method **************************************/
  ngOnInit(): void {
    this.dashboardServics.fetchAllLaunches().subscribe(launchRes => {
      this.launchData = launchRes;
      this.serverErrFlag = false;
    }, err => {
      this.serverErrFlag = true;
    });
  }

  /************************************ public Method **************************************/

  public yearSelected(yearObj: any): void {
    this.commonButtonSelection(this.launchYears, yearObj.val);
    this.yearVal = yearObj.val;
    if ((this.landVal === undefined || this.landVal === '' || this.landVal === null) &&
      (this.launchVal === undefined || this.launchVal === '' || this.launchVal === null)) {
      this.router.navigate(['/dashboard'], { queryParams: { launch_year: this.yearVal } });
      this.dashboardServics.fetchByYear(this.yearVal).subscribe(yearRes => {
        this.launchData = yearRes;
        this.serverErrFlag = false;
      }, err => {
        this.serverErrFlag = true;
      });
    } else if (this.landVal === undefined || this.landVal === '' || this.landVal === null) {
      this.yearLaunchLoad();
    } else if (this.launchVal === undefined || this.launchVal === '' || this.launchVal === null) {
      this.yearLandLoad();
    } else {
      this.yearLaunchLandLoad();
    }
  }

  public launchSuccess(launchObj: any): void {
    this.commonButtonSelection(this.launchFlags, launchObj.val);
    this.launchVal = (launchObj.val === 'True') ? true : false;
    if ((this.landVal === undefined || this.landVal === '' || this.landVal === null) &&
      (this.yearVal === undefined || this.yearVal === '' || this.yearVal === null)) {
      this.dashboardServics.fetchSuccessLaunch(this.launchVal).subscribe(launchRes => {
        this.router.navigate(['/dashboard'], { queryParams: { launch_success: this.launchVal } });
        this.launchData = launchRes;
        this.serverErrFlag = false;
      }, err => {
        this.serverErrFlag = true;
      });
    } else if (this.landVal === undefined || this.landVal === '' || this.landVal === null) {
      this.yearLaunchLoad();
    } else if (this.yearVal === undefined || this.yearVal === '' || this.yearVal === null) {
      this.launchLandSuccess();
    } else {
      this.yearLaunchLandLoad();
    }

  }

  public landSuccess(landObj: any): void {
    this.commonButtonSelection(this.landFlags, landObj.val);
    this.landVal = (landObj.val === 'True') ? true : false;
    if ((this.launchVal === undefined || this.launchVal === '' || this.launchVal === null) &&
      (this.yearVal === undefined || this.yearVal === '' || this.yearVal === null)) {
      this.router.navigate(['/dashboard'], { queryParams: { land_success: this.landVal } });
      this.dashboardServics.fetchSuccessLand(this.landVal).subscribe(landRes => {
        this.launchData = landRes;
        this.serverErrFlag = false;
      }, err => {
        this.serverErrFlag = true;
      });
    } else if (this.launchVal === undefined || this.launchVal === '' || this.launchVal === null) {
      this.yearLandLoad();
    } else if (this.yearVal === undefined || this.yearVal === '' || this.yearVal === null) {
      this.launchLandSuccess();
    } else {
      this.yearLaunchLandLoad();
    }
  }

  public launchLandSuccess(): void {
    this.router.navigate(['/dashboard'], { queryParams: { launch_success: this.launchVal, land_success: this.landVal } });
    this.dashboardServics.fetchLaunchAndLand(this.launchVal, this.landVal).subscribe(landLaunchRes => {
      this.launchData = landLaunchRes;
      this.serverErrFlag = false;
    }, err => {
      this.serverErrFlag = true;
    });
  }

  public yearLaunchLoad(): void {
    this.router.navigate(['/dashboard'], { queryParams: { launch_year: this.yearVal, launch_success: this.launchVal } });
    this.dashboardServics.fetchYearAndLaunch(this.yearVal, this.launchVal).subscribe(yearLaunchRes => {
      this.launchData = yearLaunchRes;
      this.serverErrFlag = false;
    }, err => {
      this.serverErrFlag = true;
    });
  }

  public yearLandLoad(): void {
    this.router.navigate(['/dashboard'], { queryParams: { launch_year: this.yearVal, land_success: this.landVal } });
    this.dashboardServics.fetchYearAndLand(this.yearVal, this.landVal).subscribe(yearLandRes => {
      this.launchData = yearLandRes;
      this.serverErrFlag = false;
    }, err => {
      this.serverErrFlag = true;
    });
  }

  public yearLaunchLandLoad(): void {
    this.router.navigate(['/dashboard'], { queryParams: { launch_year: this.yearVal, launch_success: this.launchVal, land_success: this.landVal } });
    this.dashboardServics.fetchAllFilter(this.launchVal, this.landVal, this.yearVal).subscribe(yearLandRes => {
      this.launchData = yearLandRes;
      this.serverErrFlag = false;
    }, err => {
      this.serverErrFlag = true;
    });
  }

  public commonButtonSelection(arrayObj: any, val: any): any {
    arrayObj.map((obj: any) => {
      obj.selected = (obj.val === val) ? true : false;
    });
    return arrayObj;
  }

}
