import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    headerOptions: any = {
        headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "7c8a200780660ecbe0f16debbd85d58d"
        }
    }
    leagues: any;
    fixtures: any;
    showNoWrapper: boolean = false;
    constructor(public httpService: HttpClient, public router: Router, public cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.getLeagueData();
        this.getLiveFixtureData();
    }
    getLeagueData() {
        let url = 'https://v3.football.api-sports.io/leagues?current=true&type=league';
        this.httpService.get(url, this.headerOptions).subscribe((res: any) => {
            this.leagues = res.response;
        }, (err: any) => {
            console.log(err);
        });

    }
    getLiveFixtureData() {
        let url = "https://v3.football.api-sports.io/fixtures?live=all";
        this.httpService.get(url, this.headerOptions).subscribe((res: any) => {
            if (res.response.length) {
                this.showNoWrapper = false;
                this.fixtures = res?.response;
                console.log(this.fixtures);
                this.cdr.detectChanges();
            } else {
                console.log('No Matches');
                this.showNoWrapper = true;
                this.cdr.detectChanges();
            }

        }, (err: any) => {
            console.log(err);
        });
    }
    getFixtureData(event: any) {
        console.log(event);
        let season = event.seasons[0].year;
        let leagueId = event.league.id;


        let url = "https://v3.football.api-sports.io/fixtures?league=" + leagueId + "&season=" + season;
        this.httpService.get(url, this.headerOptions).subscribe((res: any) => {
            if (res.response.length) {
                this.showNoWrapper = false;
                this.fixtures = res?.response;
                console.log(this.fixtures);
                this.cdr.detectChanges();
            } else {
                console.log('No Matches');
                this.showNoWrapper = true;
                this.cdr.detectChanges();
            }
        });
    }

    goToAIPage(data: any) {
        console.log(data.fixture.id);
        this.router.navigate(['/AI', data.fixture.id]);
    }
    getToStandings(data: any) {
        console.log(data);
        this.router.navigate(['/standing',data.league.id,data.seasons[0].year]);
    }

    goToDetailPage(data:any){
        this.router.navigate(['/detail', data.fixture.id]);
    }
}


