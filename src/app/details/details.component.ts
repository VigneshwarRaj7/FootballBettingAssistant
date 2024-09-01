import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  matchId: any;
  Highcharts: typeof Highcharts = Highcharts;
  headerOptions: any = {
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "7c8a200780660ecbe0f16debbd85d58d"
    }
  }
  matchData: any;
  chartOptions: any;
  statData: any;
  eventData: any;
  constructor(private route: ActivatedRoute, public httpService: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.matchId = params['id'];
      console.log('Test ID:', this.matchId);
      this.getLineUpData(this.matchId);
      this.generateStatsData();
      this.getEventData();
    });
  }

  getLineUpData(id: any) {
    let url = "https://v3.football.api-sports.io/fixtures/lineups?fixture=" + id;
    this.httpService.get(url, this.headerOptions).subscribe((res: any) => {
      this.matchData = res.response;
    }, (err: any) => {
      console.log(err);
    });
  }
  generateStatsData(){
    let url = "https://v3.football.api-sports.io/fixtures/statistics?fixture=" + this.matchId;
    this.httpService.get(url, this.headerOptions).subscribe((res: any) => {
      this.statData = res.response;
      const seriesData: { [key: string]: number[] } = {};
      const excludedTypes = ["Total passes", "Passes accurate"];
      const categories = this.statData[0].statistics
        .filter((stat:any) => !excludedTypes.includes(stat.type))
        .map((stat:any) => stat.type);
  
      // Extract series data for each team, filtering out unwanted statistics
      const series = this.statData.map((team:any) => {
        return {
          name: team.team.name,
          data: team.statistics
            .filter((stat:any) => !excludedTypes.includes(stat.type))
            .map((stat:any) => {
              // Convert percentage strings to numbers for proper charting
              if (typeof stat.value === 'string' && stat.value.includes('%')) {
                return parseFloat(stat.value);
              }
              return stat.value !== null ? stat.value : 0;
            })
        };
      });
      this.chartOptions = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Team Statistics Comparison'
        },
        xAxis: {
          categories: categories,
          title: {
            text: 'Statistics'
          }
        },
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: 'Values'
          }
        },
        series: series
      };
      console.log(this.statData);
    }, (err: any) => {
      console.log(err);
    });
  }

  getEventData(){
    let url = "https://v3.football.api-sports.io/fixtures/events?fixture=" + this.matchId;
    this.httpService.get(url, this.headerOptions).subscribe((res: any) => {
      this.eventData = res.response;
      console.log(this.statData);
    }, (err: any) => {
      console.log(err);
    });
  }

}
