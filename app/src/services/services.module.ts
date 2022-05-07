import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './services.model';
import { User } from '../users/users.model';
import { UserServices } from './user-services.model';

//prettier-ignore
@Module({
  providers: [ServicesService],
  controllers: [ServicesController],
  imports: [
    SequelizeModule.forFeature([Service, User, UserServices])
  ],
  exports: [ServicesService]
})
export class ServicesModule {}
