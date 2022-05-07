import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Service } from './services.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'user_services', createdAt: false, updatedAt: false })
export class UserServices extends Model<UserServices> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Service)
  @Column({ type: DataType.INTEGER })
  serviceId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ApiProperty({ example: 'true', description: 'User is banned' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({ example: 'Who knows', description: 'Ban reason' })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @BelongsTo(() => Service)
  services: Service[];
}
