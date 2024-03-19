import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApi(): object {
    return this.appService.getApi();
  }

  //http://localhost:4000/skaters/city/TORONTO
  @Get('/skaters/city/:city')
  getSkaters(@Param() params: any): object {
    return this.appService.getSkatersByCity(params.city);
  }

  // http://localhost:4000/skaters/city/TORONTO/name/Giordano
  @Get('/skaters/city/:city/name/:name')
  getFirstSkater(@Param() params: any): object {
    return this.appService.getSkaterByName(params.city, params.name);
  }

  // http://localhost:4000/BestPlayer
  @Get('/BestPlayer')
  getBestPlayer(): object {
    return this.appService.getBestPlayer();
  }
}
