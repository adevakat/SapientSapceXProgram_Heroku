import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public url = 'https://api.spaceXdata.com/v3/';
  constructor(private http: HttpClient) { }

  // Load All Launches without any filter
  public fetchAllLaunches(): Observable<any> {
    return this.http.get(this.url + 'launches?limit=100');
  }

  // Year Filter
  public fetchByYear(year: any): Observable<any> {
    return this.http.get(this.url + 'launches?limit=100&launch_year=' + year);
  }

  // Launch Success Filter
  public fetchSuccessLaunch(launchFlag: boolean): Observable<any> {
    return this.http.get(this.url + 'launches?limit=100&launch_success=' + launchFlag);
  }

  // Land Success Filter
  public fetchSuccessLand(landFlag: boolean): Observable<any> {
    return this.http.get(this.url + 'launches?limit=100&land_success=' + landFlag);
  }

  // Launch & Land Filter:
  public fetchLaunchAndLand(launchFlag: boolean, landFlag: boolean): Observable<any> {
    return this.http.get(this.url + 'launches?limit=100&launch_success=' + launchFlag + '&land_success=' + landFlag);
  }

  // Year & Land Filter:
  public fetchYearAndLand(yearVal: any, landFlag: boolean): Observable<any> {
    return this.http.get(this.url + 'launches?limit=100&launch_year=' + yearVal + '&land_success=' + landFlag);
  }

  // Year & Launch Filter:
  public fetchYearAndLaunch(yearVal: any, lanunchFlag: boolean): Observable<any> {
    return this.http.get(this.url + 'launches?limit=100&launch_year=' + yearVal + '&launch_success=' + lanunchFlag);
  }

  // All filter
  public fetchAllFilter(launchFlag: boolean, landFlag: boolean, year: any): Observable<any> {
    return this.http.get(this.url + 'launches?limit=100&launch_success=' + launchFlag + '&land_success=' + landFlag + '&launch_year=' + year);
  }
}
