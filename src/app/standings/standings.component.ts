import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  leagueId: any;
  season: any;
  standingData:any;
  headerOptions: any = {
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "7c8a200780660ecbe0f16debbd85d58d"
    }
  }
  rowData:any = [];
  colDefs: any[] = [
    { field: "Rank", sortable: true, filter: 'agNumberColumnFilter', width: 100 },
    { field: "Name" },
    { field: "Form" },
    { field: "Points", sortable: true, filter: 'agNumberColumnFilter' }
  ];

  constructor(private route: ActivatedRoute, public httpService: HttpClient, public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.leagueId = params['id'];
      this.season = params['season'];
      console.log('Test ID:', this.leagueId);
      this.getStandingData();
    })

  }
  getStandingData() {
    this.rowData = [];
    let url = "https://v3.football.api-sports.io/standings?league="+this.leagueId+"&season="+this.season;
    this.httpService.get(url, this.headerOptions).subscribe((res: any) => {
      const standings = res.response[0].league.standings[0].map((result: any) => ({
        Rank: result.rank,
        Name: result.team.name,
        Form: result.form,
        Points: result.points
      }));
      this.rowData = standings;
      this.cdr.detectChanges();
      this.cdr.markForCheck();
      console.log(this.rowData);

    }, (err: any) => {
      console.log(err);
    });
  }
}

