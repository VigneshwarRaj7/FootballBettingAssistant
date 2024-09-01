import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { generate } from 'rxjs';
import OpenAI from 'openai';
// import { ChatService } from '../chat.service';
@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.scss']
})
export class AIComponent implements OnInit {
  matchId: any;
  client = new OpenAI({
    apiKey: '',
    dangerouslyAllowBrowser: true
  });
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any;
  headerOptions: any = {
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "7c8a200780660ecbe0f16debbd85d58d"
    }
  }
  matchData: any;
  chartOptionsBar: any;

  constructor(private route: ActivatedRoute, public httpService: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.matchId = params['id'];
      console.log('Test ID:', this.matchId);
      this.getMatchData(this.matchId);
    });


  }
  getMatchData(id: any) {
    let url = "https://v3.football.api-sports.io/predictions?fixture=" + id;
    this.httpService.get(url, this.headerOptions).subscribe((res: any) => {
      this.matchData = res.response[0];
      this.generateWinPredication();
      this.generateComparsionChart();
      this.generatePromptFromGPT();

    }, (err: any) => {
      console.log(err);
    });
  }
  async generatePromptFromGPT() {
    let promptString: string = 'give me a prediction analysis of the following data i got from a api i need the response not more than in 60 words' + JSON.stringify(this.matchData);
    const stream = await this.client.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      messages: [{ role: 'user', content: promptString }],
      stream: true,
    });
    for await (const chunk of stream) {
      console.log(chunk.choices[0]?.delta?.content || '');
    }
  }
  generateComparsionChart() {
    const categories = ['Form', 'Attack', 'Defense', 'Position Distribution', 'H2H', 'Goals', 'Total'];
    let seriesData = [
      {
        name: this.matchData.teams.home.name,
        data: [
          parseFloat(this.matchData.comparison.form.home),
          parseFloat(this.matchData.comparison.att.home),
          parseFloat(this.matchData.comparison.def.home),
          parseFloat(this.matchData.comparison.poisson_distribution.home),
          parseFloat(this.matchData.comparison.h2h.home),
          parseFloat(this.matchData.comparison.goals.home),
          parseFloat(this.matchData.comparison.total.home)
        ]
      },
      {
        name: this.matchData.teams.away.name,
        data: [
          parseFloat(this.matchData.comparison.form.away),
          parseFloat(this.matchData.comparison.att.away),
          parseFloat(this.matchData.comparison.def.away),
          parseFloat(this.matchData.comparison.poisson_distribution.away),
          parseFloat(this.matchData.comparison.h2h.away),
          parseFloat(this.matchData.comparison.goals.away),
          parseFloat(this.matchData.comparison.total.away)
        ]
      }
    ];
    this.chartOptionsBar = {
      chart: {
        type: 'bar',
        backgroundColor: '#f0f0f0'
      },
      title: {
        text: 'Match Data Comparison',
        verticalAlign: 'bottom'
      },
      xAxis: {
        categories: categories,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Percentage'
        },
        stackLabels: {
          enabled: true
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        bar: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        }
      },
      series: seriesData
    };


  }
  generateWinPredication() {
    const chartData = [
      { name: this.matchData.teams.home.name, y: parseFloat(this.matchData.predictions.percent.home) },
      { name: 'Draw', y: parseFloat(this.matchData.predictions.percent.draw) },
      { name: this.matchData.teams.away.name, y: parseFloat(this.matchData.predictions.percent.away) }
    ];
    this.chartOptions = {
      chart: {
        type: 'pie',
        backgroundColor: '#f0f0f0'
      },
      title: {
        text: 'Match Outcome Prediction',
        verticalAlign: 'bottom'
      },
      series: [
        {
          name: 'Percentage',
          colorByPoint: true,
          type: 'pie',
          data: chartData
        }
      ]
    };
  }

}
