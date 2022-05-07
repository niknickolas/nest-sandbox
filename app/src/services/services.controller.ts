import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Service } from './services.model';
import { UserServices } from './user-services.model';
import { PopularServicesDto } from './dto/popular-services.dto';

@ApiTags('Services')
@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @ApiOperation({ summary: 'Get all Services' })
  @ApiResponse({ status: 200, type: [Service] })
  @Get()
  getAll() {
    return this.servicesService.getAllServices();
  }

  @ApiOperation({ summary: 'Get popular Services' })
  @ApiResponse({ status: 200, type: [PopularServicesDto] })
  @Get('popular')
  popularServices() {
    return this.servicesService.getPopularServices();
  }

  @ApiOperation({ summary: 'Get Service by id' })
  @ApiResponse({ status: 200, type: Service })
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.servicesService.getServiceById(id);
  }

  @ApiOperation({ summary: 'Create Service' })
  @ApiResponse({ status: 201, type: Service })
  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.servicesService.createService(dto);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200, type: UserServices })
  @Patch(':id/banUser')
  ban(@Param('id') serviceId: number, @Body() dto: BanUserDto) {
    return this.servicesService.banUser({ ...dto, serviceId });
  }
}
