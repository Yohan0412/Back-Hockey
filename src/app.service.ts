import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private apiUrlEndPoint = 'https://api-web.nhle.com/v1/';
  private apiClubStats = 'club-stats/';
  private apiUrlBestPlayer = `${this.apiUrlEndPoint}skater-stats-leaders/current?categories=goals&limit=5`;

  private cities = [
    {
      city: 'Toronto',
      code: 'TOR',
    },
    {
      city: 'Washighton',
      code: 'WSH',
    },
    {
      city: 'Dallas',
      code: 'DAL',
    },
    {
      city: 'Montreal',
      code: 'MTL',
    },
    {
      city: 'New York Rangers',
      code: 'NYR',
    },
    {
      city: 'New York Islander',
      code: 'NYI',
    },
    {
      city: 'Tampa Bay',
      code: 'TBL',
    },
    {
      city: 'Nashville',
      code: 'NSH',
    },
    {
      city: 'Caroline',
      code: 'CAR',
    },
    {
      city: 'Floride',
      code: 'FLA',
    },
    {
      city: 'Vancouver',
      code: 'VAN',
    },
    {
      city: 'Boston',
      code: 'BOS',
    },
    {
      city: 'Colorado',
      code: 'COL',
    },
    {
      city: 'Las Vegas',
      code: 'VGK',
    },
    {
      city: 'Los Angeles',
      code: 'LAK',
    },
    {
      city: 'Détroit',
      code: 'DET',
    },
    {
      city: 'Chicago',
      code: 'CHI',
    },
    {
      city: 'Anaheim',
      code: 'ANA',
    },
    {
      city: 'San José',
      code: 'SJS',
    },
    {
      city: 'Winnipeg',
      code: 'WPG',
    },
    {
      city: 'Arizona',
      code: 'ARI',
    },
    {
      city: 'Buffalo',
      code: 'BUF',
    },
    {
      city: 'Minnesota',
      code: 'MIN',
    },
    {
      city: 'New Jersey',
      code: 'NJD',
    },
    {
      city: 'Seattle',
      code: 'SEA',
    },
    {
      city: 'COLOMBUS',
      code: 'CBJ',
    },
    {
      city: 'Pittsburg',
      code: 'PIT',
    },
    {
      city: 'St Louis',
      code: 'STL',
    },
    {
      city: 'Ottawa',
      code: 'OTT',
    },
    {
      city: 'Calgary',
      code: 'CGY',
    },
    {
      city: 'Philadelphie',
      code: 'PHI',
    },
  ];

  public getApi(): object {
    return { api: '1.0.0' };
  }

  public async getSkatersByCity(city_value: string): Promise<object> {
    return this._getSkatersByCity(city_value);
  }

  public async getSkaterByName(city: string, name: string): Promise<object> {
    let player = null;

    await this.getSkatersByCity(city).then((skaters: any) => {
      player = skaters.find((players) => players.lastName.default === name);
      if (player == undefined || player) {
        return {
          code: -1,
          message: 'Player not found!',
        };
      }
    });

    return player;
  }

  /**
   *
   * Récupération des joueurs 'skaters' pour une ville
   *
   * @param city_value
   * @returns
   */
  private async _getSkatersByCity(city_value: string): Promise<object> {
    // Récupération de l'objet Vile
    const city = this.cities.find(({ city }) => city === city_value);
    if (city == undefined) {
      return {
        code: -1,
        message: 'City no exists!',
      };
    }
    // Construction de l'url
    const url = `${this.apiUrlEndPoint}${this.apiClubStats}${city.code}/now`;
    const rep = await fetch(url, { method: 'GET' });
    const response = await rep.json();
    return response.skaters;
  }

  async getBestPlayer(): Promise<object> {
    const rep = await fetch(this.apiUrlBestPlayer, { method: 'GET' });
    const response = await rep.json();
    return response;
  }
}
