import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateStoreDto } from './dtos/create-store.dto';
import { StoreService } from './store.service';
import { GetStoreDto } from './dtos/get-store.dto';
import { UpdateStoreDto } from './dtos/update-store.dto';

@Controller('/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('/')
  async createStore(@Body() body: CreateStoreDto) {
    const store = await this.storeService.createStore(body);
    return store;
  }
  @Get('statistics')
  async getStoreStatistics(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.storeService.getBottom5StoresByRevenueBetweenDates(
      startDate,
      endDate,
    );
  }
  @Get('/')
  async getStores(@Query() query: GetStoreDto) {
    const stores = await this.storeService.getStores(query);
    return stores;
  }

  @Get('/:id')
  async getStoreById(@Param('id') id: number) {
    const store = await this.storeService.getStoreById(id);
    return store;
  }

  @Patch('/:id')
  async updateStore(@Param('id') id: number, @Body() body: UpdateStoreDto) {
    return await this.storeService.update(id, body);
  }

  @Delete('/:id')
  async removeStore(@Param('id') id: number) {
    return this.storeService.remove(id);
  }
}
