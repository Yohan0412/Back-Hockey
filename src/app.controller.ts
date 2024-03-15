import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('/skatersWASHINGTON')
  getSkatersWashington(): object {
    
    return this.appService.getSkatersWashington();
  }

  @Get('/skatersTORONTO')
  getSkatersToronto(): object {
    
    return this.appService.getSkatersToronto();
  }



  @Get('/BestPlayer')
  getBestPlayer(): object {
    return this.appService.getBestPlayer();
  }




  private apiUrl = 'https://api-web.nhle.com/v1/club-stats/WSH/now';

  async getSkaters(): Promise<object> {
    const rep = await fetch(this.apiUrl, { method: 'GET' });
    const response = await rep.json();
    return response.skaters;
  }



  @Get('/skaters/search-by-name')
  getFirstSkater(@Query('name') name): object {
    return this.appService.getFirstSkater(name);
  }

  
}

