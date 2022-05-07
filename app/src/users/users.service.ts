import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { ServicesService } from '../services/services.service';
import { AddServiceDto } from './dto/add-service.dto';
import { DeleteServiceDto } from './dto/delete-service.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private servicesService: ServicesService
  ) {}

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async addService(dto: AddServiceDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const service = await this.servicesService.getServiceById(dto.serviceId);
    if (service && user) {
      await user.$add('services', service.id);
      return dto;
    }
    throw new HttpException('User or service not found', HttpStatus.NOT_FOUND);
  }

  async deleteService(dto: DeleteServiceDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const service = await this.servicesService.getServiceById(dto.serviceId);
    if (service && user) {
      await user.$remove('services', service.id);
      return dto;
    }
    throw new HttpException('User or service not found', HttpStatus.NOT_FOUND);
  }

  getServices(userId: number) {
    return this.servicesService.getUserActiveSubscriptions(userId);
  }
}
