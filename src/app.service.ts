import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private apiUrlEndPoint = 'https://api-web.nhle.com/v1/';
  private apiClubStats = 'club-stats/';
  private apiUrlBestPlayer = `${this.apiUrlEndPoint}skater-stats-leaders/current?categories=goals&limit=5`;

  private cities = [
    {
      city: 'TORONTO',
      code: 'TOR',
    },
    {
      city: 'WASHINGTON',
      code: 'WSH',
    },
    {
      city: 'DALLAS',
      code: 'DAL',
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
