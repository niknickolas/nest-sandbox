import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Service } from '../services/services.model';
import { UserServices } from '../services/user-services.model';
import { ServicesModule } from '../services/services.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, Service, UserServices]), ServicesModule],
  exports: [UsersService]
})
export class UsersModule {}
