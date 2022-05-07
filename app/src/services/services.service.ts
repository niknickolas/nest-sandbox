import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './services.model';
import { BanUserDto } from './dto/ban-user.dto';
import { User } from '../users/users.model';
import { UserServices } from './user-services.model';
import sequelize from 'sequelize';

@Injectable()
export class ServicesService {
  //prettier-ignore
  constructor(
    @InjectModel(Service) private serviceRepository: typeof Service,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(UserServices) private userServiceRepository: typeof UserServices
  ) {
  }

  async createService(dto: CreateServiceDto) {
    return await this.serviceRepository.create(dto);
  }

  async getServiceById(id: number) {
    return await this.serviceRepository.findByPk(id);
  }

  async banUser(dto: BanUserDto) {
    const subscription = await this.userServiceRepository.findOne({
      where: {
        userId: dto.userId,
        serviceId: dto.serviceId
      }
    });

    if (!subscription) {
      throw new HttpException('Subscription not found', HttpStatus.NOT_FOUND);
    }
    subscription.banned = true;
    subscription.banReason = dto.banReason;
    await subscription.save();
    return subscription;
  }

  async getUserSubscriptions(userId: number) {
    return await this.userServiceRepository.findAll({
      where: { userId },
      include: Service
    });
  }

  async getUserActiveSubscriptions(userId: number) {
    return await this.userServiceRepository.findAll({
      where: { userId, banned: false },
      include: Service
    });
  }

  async getUserBannedSubscriptions(userId: number) {
    return await this.userServiceRepository.findAll({
      where: { userId, banned: true },
      include: Service
    });
  }

  async getAllServices() {
    return await this.serviceRepository.findAll();
  }

  async getPopularServices() {
    return await this.userServiceRepository.findAll({
      group: ['UserServices.serviceId'],
      order: [[sequelize.fn('COUNT', sequelize.col('serviceId')), 'DESC']],
      attributes: ['serviceId', [sequelize.fn('COUNT', sequelize.col('serviceId')), 'Subscriptions']]
    });
  }
}
