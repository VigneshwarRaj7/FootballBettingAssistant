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
  dummyData = {
    "predictions": {
      "winner": {
        "id": 727,
        "name": "Osasuna",
        "comment": "Win or draw"
      },
      "win_or_draw": true,
      "under_over": "-3.5",
      "goals": {
        "home": "-1.5",
        "away": "-1.5"
      },
      "advice": "Combo Double chance : draw or Osasuna and -3.5 goals",
      "percent": {
        "home": "10%",
        "draw": "45%",
        "away": "45%"
      }
    },
    "league": {
      "id": 140,
      "name": "La Liga",
      "country": "Spain",
      "logo": "https://media.api-sports.io/football/leagues/140.png",
      "flag": "https://media.api-sports.io/flags/es.svg",
      "season": 2024
    },
    "teams": {
      "home": {
        "id": 547,
        "name": "Girona",
        "logo": "https://media.api-sports.io/football/teams/547.png",
        "last_5": {
          "played": 2,
          "form": "17%",
          "att": "14%",
          "def": "43%",
          "goals": {
            "for": {
              "total": 1,
              "average": "0.5"
            },
            "against": {
              "total": 4,
              "average": "2.0"
            }
          }
        },
        "league": {
          "form": "DL",
          "fixtures": {
            "played": {
              "home": 0,
              "away": 2,
              "total": 2
            },
            "wins": {
              "home": 0,
              "away": 0,
              "total": 0
            },
            "draws": {
              "home": 0,
              "away": 1,
              "total": 1
            },
            "loses": {
              "home": 0,
              "away": 1,
              "total": 1
            }
          },
          "goals": {
            "for": {
              "total": {
                "home": 0,
                "away": 1,
                "total": 1
              },
              "average": {
                "home": "0.0",
                "away": "0.5",
                "total": "0.5"
              },
              "minute": {
                "0-15": {
                  "total": null,
                  "percentage": null
                },
                "16-30": {
                  "total": null,
                  "percentage": null
                },
                "31-45": {
                  "total": null,
                  "percentage": null
                },
                "46-60": {
                  "total": null,
                  "percentage": null
                },
                "61-75": {
                  "total": 1,
                  "percentage": "100.00%"
                },
                "76-90": {
                  "total": null,
                  "percentage": null
                },
                "91-105": {
                  "total": null,
                  "percentage": null
                },
                "106-120": {
                  "total": null,
                  "percentage": null
                }
              }
            },
            "against": {
              "total": {
                "home": 0,
                "away": 4,
                "total": 4
              },
              "average": {
                "home": "0.0",
                "away": "2.0",
                "total": "2.0"
              },
              "minute": {
                "0-15": {
                  "total": 1,
                  "percentage": "25.00%"
                },
                "16-30": {
                  "total": null,
                  "percentage": null
                },
                "31-45": {
                  "total": 1,
                  "percentage": "25.00%"
                },
                "46-60": {
                  "total": 1,
                  "percentage": "25.00%"
                },
                "61-75": {
                  "total": null,
                  "percentage": null
                },
                "76-90": {
                  "total": null,
                  "percentage": null
                },
                "91-105": {
                  "total": 1,
                  "percentage": "25.00%"
                },
                "106-120": {
                  "total": null,
                  "percentage": null
                }
              }
            }
          },
          "biggest": {
            "streak": {
              "wins": 0,
              "draws": 1,
              "loses": 0
            },
            "wins": {
              "home": null,
              "away": null
            },
            "loses": {
              "home": null,
              "away": "3-0"
            },
            "goals": {
              "for": {
                "home": 0,
                "away": 1
              },
              "against": {
                "home": 0,
                "away": 3
              }
            }
          },
          "clean_sheet": {
            "home": 0,
            "away": 0,
            "total": 0
          },
          "failed_to_score": {
            "home": 0,
            "away": 1,
            "total": 1
          },
          "penalty": {
            "scored": {
              "total": 0,
              "percentage": "0%"
            },
            "missed": {
              "total": 0,
              "percentage": "0%"
            },
            "total": 0
          },
          "lineups": [
            {
              "formation": "4-3-3",
              "played": 2
            }
          ],
          "cards": {
            "yellow": {
              "0-15": {
                "total": null,
                "percentage": null
              },
              "16-30": {
                "total": 1,
                "percentage": "33.33%"
              },
              "31-45": {
                "total": 1,
                "percentage": "33.33%"
              },
              "46-60": {
                "total": 1,
                "percentage": "33.33%"
              },
              "61-75": {
                "total": null,
                "percentage": null
              },
              "76-90": {
                "total": null,
                "percentage": null
              },
              "91-105": {
                "total": null,
                "percentage": null
              },
              "106-120": {
                "total": null,
                "percentage": null
              }
            },
            "red": {
              "0-15": {
                "total": null,
                "percentage": null
              },
              "16-30": {
                "total": null,
                "percentage": null
              },
              "31-45": {
                "total": null,
                "percentage": null
              },
              "46-60": {
                "total": null,
                "percentage": null
              },
              "61-75": {
                "total": null,
                "percentage": null
              },
              "76-90": {
                "total": null,
                "percentage": null
              },
              "91-105": {
                "total": null,
                "percentage": null
              },
              "106-120": {
                "total": null,
                "percentage": null
              }
            }
          }
        }
      },
      "away": {
        "id": 727,
        "name": "Osasuna",
        "logo": "https://media.api-sports.io/football/teams/727.png",
        "last_5": {
          "played": 2,
          "form": "67%",
          "att": "29%",
          "def": "86%",
          "goals": {
            "for": {
              "total": 2,
              "average": "1.0"
            },
            "against": {
              "total": 1,
              "average": "0.5"
            }
          }
        },
        "league": {
          "form": "DW",
          "fixtures": {
            "played": {
              "home": 2,
              "away": 0,
              "total": 2
            },
            "wins": {
              "home": 1,
              "away": 0,
              "total": 1
            },
            "draws": {
              "home": 1,
              "away": 0,
              "total": 1
            },
            "loses": {
              "home": 0,
              "away": 0,
              "total": 0
            }
          },
          "goals": {
            "for": {
              "total": {
                "home": 2,
                "away": 0,
                "total": 2
              },
              "average": {
                "home": "1.0",
                "away": "0.0",
                "total": "1.0"
              },
              "minute": {
                "0-15": {
                  "total": null,
                  "percentage": null
                },
                "16-30": {
                  "total": null,
                  "percentage": null
                },
                "31-45": {
                  "total": null,
                  "percentage": null
                },
                "46-60": {
                  "total": 1,
                  "percentage": "100.00%"
                },
                "61-75": {
                  "total": null,
                  "percentage": null
                },
                "76-90": {
                  "total": null,
                  "percentage": null
                },
                "91-105": {
                  "total": null,
                  "percentage": null
                },
                "106-120": {
                  "total": null,
                  "percentage": null
                }
              }
            },
            "against": {
              "total": {
                "home": 1,
                "away": 0,
                "total": 1
              },
              "average": {
                "home": "0.5",
                "away": "0.0",
                "total": "0.5"
              },
              "minute": {
                "0-15": {
                  "total": null,
                  "percentage": null
                },
                "16-30": {
                  "total": 1,
                  "percentage": "50.00%"
                },
                "31-45": {
                  "total": null,
                  "percentage": null
                },
                "46-60": {
                  "total": null,
                  "percentage": null
                },
                "61-75": {
                  "total": null,
                  "percentage": null
                },
                "76-90": {
                  "total": 1,
                  "percentage": "50.00%"
                },
                "91-105": {
                  "total": null,
                  "percentage": null
                },
                "106-120": {
                  "total": null,
                  "percentage": null
                }
              }
            }
          },
          "biggest": {
            "streak": {
              "wins": 0,
              "draws": 1,
              "loses": 0
            },
            "wins": {
              "home": "1-0",
              "away": null
            },
            "loses": {
              "home": null,
              "away": null
            },
            "goals": {
              "for": {
                "home": 1,
                "away": 0
              },
              "against": {
                "home": 1,
                "away": 0
              }
            }
          },
          "clean_sheet": {
            "home": 1,
            "away": 0,
            "total": 1
          },
          "failed_to_score": {
            "home": 0,
            "away": 0,
            "total": 0
          },
          "penalty": {
            "scored": {
              "total": 0,
              "percentage": "0%"
            },
            "missed": {
              "total": 0,
              "percentage": "0%"
            },
            "total": 0
          },
          "lineups": [
            {
              "formation": "4-3-3",
              "played": 1
            },
            {
              "formation": "4-1-4-1",
              "played": 1
            }
          ],
          "cards": {
            "yellow": {
              "0-15": {
                "total": null,
                "percentage": null
              },
              "16-30": {
                "total": null,
                "percentage": null
              },
              "31-45": {
                "total": null,
                "percentage": null
              },
              "46-60": {
                "total": null,
                "percentage": null
              },
              "61-75": {
                "total": 2,
                "percentage": "40.00%"
              },
              "76-90": {
                "total": 3,
                "percentage": "60.00%"
              },
              "91-105": {
                "total": null,
                "percentage": null
              },
              "106-120": {
                "total": null,
                "percentage": null
              }
            },
            "red": {
              "0-15": {
                "total": null,
                "percentage": null
              },
              "16-30": {
                "total": null,
                "percentage": null
              },
              "31-45": {
                "total": null,
                "percentage": null
              },
              "46-60": {
                "total": null,
                "percentage": null
              },
              "61-75": {
                "total": null,
                "percentage": null
              },
              "76-90": {
                "total": null,
                "percentage": null
              },
              "91-105": {
                "total": null,
                "percentage": null
              },
              "106-120": {
                "total": null,
                "percentage": null
              }
            }
          }
        }
      }
    },
    "comparison": {
      "form": {
        "home": "20%",
        "away": "80%"
      },
      "att": {
        "home": "33%",
        "away": "67%"
      },
      "def": {
        "home": "20%",
        "away": "80%"
      },
      "poisson_distribution": {
        "home": "0%",
        "away": "0%"
      },
      "h2h": {
        "home": "62%",
        "away": "38%"
      },
      "goals": {
        "home": "60%",
        "away": "40%"
      },
      "total": {
        "home": "39.0%",
        "away": "61.0%"
      }
    },
    "h2h": [
      {
        "fixture": {
          "id": 1038225,
          "referee": "Mateo Busquets Ferrer, Spain",
          "timezone": "UTC",
          "date": "2024-03-09T20:00:00+00:00",
          "timestamp": 1710014400,
          "periods": {
            "first": 1710014400,
            "second": 1710018000
          },
          "venue": {
            "id": 1478,
            "name": "Estadi Municipal de Montilivi",
            "city": "Girona"
          },
          "status": {
            "long": "Match Finished",
            "short": "FT",
            "elapsed": 90
          }
        },
        "league": {
          "id": 140,
          "name": "La Liga",
          "country": "Spain",
          "logo": "https://media.api-sports.io/football/leagues/140.png",
          "flag": "https://media.api-sports.io/flags/es.svg",
          "season": 2023,
          "round": "Regular Season - 28"
        },
        "teams": {
          "home": {
            "id": 547,
            "name": "Girona",
            "logo": "https://media.api-sports.io/football/teams/547.png",
            "winner": true
          },
          "away": {
            "id": 727,
            "name": "Osasuna",
            "logo": "https://media.api-sports.io/football/teams/727.png",
            "winner": false
          }
        },
        "goals": {
          "home": 2,
          "away": 0
        },
        "score": {
          "halftime": {
            "home": 1,
            "away": 0
          },
          "fulltime": {
            "home": 2,
            "away": 0
          },
          "extratime": {
            "home": null,
            "away": null
          },
          "penalty": {
            "home": null,
            "away": null
          }
        }
      },
      {
        "fixture": {
          "id": 1038069,
          "referee": "José Luis Munuera Montero, Spain",
          "timezone": "UTC",
          "date": "2023-11-04T13:00:00+00:00",
          "timestamp": 1699102800,
          "periods": {
            "first": 1699102800,
            "second": 1699106400
          },
          "venue": {
            "id": 1486,
            "name": "Estadio El Sadar",
            "city": "Iruñea"
          },
          "status": {
            "long": "Match Finished",
            "short": "FT",
            "elapsed": 90
          }
        },
        "league": {
          "id": 140,
          "name": "La Liga",
          "country": "Spain",
          "logo": "https://media.api-sports.io/football/leagues/140.png",
          "flag": "https://media.api-sports.io/flags/es.svg",
          "season": 2023,
          "round": "Regular Season - 12"
        },
        "teams": {
          "home": {
            "id": 727,
            "name": "Osasuna",
            "logo": "https://media.api-sports.io/football/teams/727.png",
            "winner": false
          },
          "away": {
            "id": 547,
            "name": "Girona",
            "logo": "https://media.api-sports.io/football/teams/547.png",
            "winner": true
          }
        },
        "goals": {
          "home": 2,
          "away": 4
        },
        "score": {
          "halftime": {
            "home": 1,
            "away": 1
          },
          "fulltime": {
            "home": 2,
            "away": 4
          },
          "extratime": {
            "home": null,
            "away": null
          },
          "penalty": {
            "home": null,
            "away": null
          }
        }
      },
      {
        "fixture": {
          "id": 878321,
          "referee": "Miguel Ortiz",
          "timezone": "UTC",
          "date": "2023-06-04T16:30:00+00:00",
          "timestamp": 1685896200,
          "periods": {
            "first": 1685896200,
            "second": 1685899800
          },
          "venue": {
            "id": 1486,
            "name": "Estadio El Sadar",
            "city": "Iruñea"
          },
          "status": {
            "long": "Match Finished",
            "short": "FT",
            "elapsed": 90
          }
        },
        "league": {
          "id": 140,
          "name": "La Liga",
          "country": "Spain",
          "logo": "https://media.api-sports.io/football/leagues/140.png",
          "flag": "https://media.api-sports.io/flags/es.svg",
          "season": 2022,
          "round": "Regular Season - 38"
        },
        "teams": {
          "home": {
            "id": 727,
            "name": "Osasuna",
            "logo": "https://media.api-sports.io/football/teams/727.png",
            "winner": true
          },
          "away": {
            "id": 547,
            "name": "Girona",
            "logo": "https://media.api-sports.io/football/teams/547.png",
            "winner": false
          }
        },
        "goals": {
          "home": 2,
          "away": 1
        },
        "score": {
          "halftime": {
            "home": 0,
            "away": 0
          },
          "fulltime": {
            "home": 2,
            "away": 1
          },
          "extratime": {
            "home": null,
            "away": null
          },
          "penalty": {
            "home": null,
            "away": null
          }
        }
      },
      {
        "fixture": {
          "id": 979575,
          "referee": null,
          "timezone": "UTC",
          "date": "2022-12-14T10:00:00+00:00",
          "timestamp": 1671012000,
          "periods": {
            "first": 1671012000,
            "second": 1671015600
          },
          "venue": {
            "id": 1478,
            "name": "Estadi Municipal de Montilivi",
            "city": "Girona"
          },
          "status": {
            "long": "Match Finished",
            "short": "FT",
            "elapsed": 90
          }
        },
        "league": {
          "id": 667,
          "name": "Friendlies Clubs",
          "country": "World",
          "logo": "https://media.api-sports.io/football/leagues/667.png",
          "flag": null,
          "season": 2022,
          "round": "Club Friendlies 3"
        },
        "teams": {
          "home": {
            "id": 547,
            "name": "Girona",
            "logo": "https://media.api-sports.io/football/teams/547.png",
            "winner": null
          },
          "away": {
            "id": 727,
            "name": "Osasuna",
            "logo": "https://media.api-sports.io/football/teams/727.png",
            "winner": null
          }
        },
        "goals": {
          "home": 1,
          "away": 1
        },
        "score": {
          "halftime": {
            "home": null,
            "away": null
          },
          "fulltime": {
            "home": 1,
            "away": 1
          },
          "extratime": {
            "home": null,
            "away": null
          },
          "penalty": {
            "home": null,
            "away": null
          }
        }
      },
      {
        "fixture": {
          "id": 878044,
          "referee": "Juan Pulido",
          "timezone": "UTC",
          "date": "2022-10-23T16:30:00+00:00",
          "timestamp": 1666542600,
          "periods": {
            "first": 1666542600,
            "second": 1666546200
          },
          "venue": {
            "id": 1478,
            "name": "Estadi Municipal de Montilivi",
            "city": "Girona"
          },
          "status": {
            "long": "Match Finished",
            "short": "FT",
            "elapsed": 90
          }
        },
        "league": {
          "id": 140,
          "name": "La Liga",
          "country": "Spain",
          "logo": "https://media.api-sports.io/football/leagues/140.png",
          "flag": "https://media.api-sports.io/flags/es.svg",
          "season": 2022,
          "round": "Regular Season - 11"
        },
        "teams": {
          "home": {
            "id": 547,
            "name": "Girona",
            "logo": "https://media.api-sports.io/football/teams/547.png",
            "winner": null
          },
          "away": {
            "id": 727,
            "name": "Osasuna",
            "logo": "https://media.api-sports.io/football/teams/727.png",
            "winner": null
          }
        },
        "goals": {
          "home": 1,
          "away": 1
        },
        "score": {
          "halftime": {
            "home": 1,
            "away": 1
          },
          "fulltime": {
            "home": 1,
            "away": 1
          },
          "extratime": {
            "home": null,
            "away": null
          },
          "penalty": {
            "home": null,
            "away": null
          }
        }
      },
      {
        "fixture": {
          "id": 817956,
          "referee": "Javier Alberola",
          "timezone": "UTC",
          "date": "2022-01-06T15:00:00+00:00",
          "timestamp": 1641481200,
          "periods": {
            "first": 1641481200,
            "second": 1641484800
          },
          "venue": {
            "id": 1478,
            "name": "Estadi Municipal de Montilivi",
            "city": "Girona"
          },
          "status": {
            "long": "Match Finished",
            "short": "FT",
            "elapsed": 90
          }
        },
        "league": {
          "id": 143,
          "name": "Copa del Rey",
          "country": "Spain",
          "logo": "https://media.api-sports.io/football/leagues/143.png",
          "flag": "https://media.api-sports.io/flags/es.svg",
          "season": 2021,
          "round": "Round of 32"
        },
        "teams": {
          "home": {
            "id": 547,
            "name": "Girona",
            "logo": "https://media.api-sports.io/football/teams/547.png",
            "winner": true
          },
          "away": {
            "id": 727,
            "name": "Osasuna",
            "logo": "https://media.api-sports.io/football/teams/727.png",
            "winner": false
          }
        },
        "goals": {
          "home": 1,
          "away": 0
        },
        "score": {
          "halftime": {
            "home": 1,
            "away": 0
          },
          "fulltime": {
            "home": 1,
            "away": 0
          },
          "extratime": {
            "home": null,
            "away": null
          },
          "penalty": {
            "home": null,
            "away": null
          }
        }
      }
    ]
  }
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
    // this.matchData = this.dummyData;
    // this.generateWinPredication();

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
