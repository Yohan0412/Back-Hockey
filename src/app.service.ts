import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  private apiUrl = 'https://api-web.nhle.com/v1/club-stats/WSH/now';
  private apiUrl1 = 'https://api-web.nhle.com/v1/club-stats/TOR/now';
  private apiUrlBestPlayer = 'https://api-web.nhle.com/v1/skater-stats-leaders/current?categories=goals&limit=5';



  getHello(): object {
    return {'api': '1.0.0'};
  }

  async getSkatersWashington(): Promise<object> {
    const rep = await fetch(this.apiUrl, { method: 'GET' });
    const response = await rep.json();
    return response.skaters;
  }


  async getBestPlayer(): Promise<object> {
    const rep = await fetch(this.apiUrlBestPlayer, { method: 'GET' });
    const response = await rep.json();
    return response;
  }

  async getSkatersToronto(): Promise<object> {
    const rep = await fetch(this.apiUrl1 , { method: 'GET' });
    const response = await rep.json();
    return response.skaters;
  }








  ///http://localhost:4000/skaters/search-by-name?name=Miroshnichenko
  async getFirstSkater(name:string): Promise<object> {
    const rep = await fetch(this.apiUrl, { method: 'GET' });
    const response = await rep.json();
    const skaters = response.skaters;
    const player =  skaters.find(players => players.lastName.default === name);
    return player;
  }





}

