import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { AddServiceDto } from './dto/add-service.dto';
import { DeleteServiceDto } from './dto/delete-service.dto';
import { UserServices } from '../services/user-services.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get subscriptions' })
  @ApiResponse({ status: 200, type: [UserServices] })
  @Get(':id/services')
  getService(@Param('id') userId: number) {
    return this.usersService.getServices(userId);
  }

  @ApiOperation({ summary: 'Subscribe on service' })
  @ApiResponse({ status: 201, type: AddServiceDto })
  @Post(':id/services')
  addService(@Param('id') userId: number, @Body() dto: AddServiceDto) {
    return this.usersService.addService({ ...dto, userId });
  }

  @ApiOperation({ summary: 'Delete subscription' })
  @ApiResponse({ status: 200, type: DeleteServiceDto })
  @Delete(':userId/services/:serviceId')
  deleteService(@Param('userId') userId: number, @Param('serviceId') serviceId: number) {
    return this.usersService.deleteService({ userId, serviceId });
  }
}
