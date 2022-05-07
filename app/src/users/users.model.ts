import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Service } from '../services/services.model';
import { UserServices } from '../services/user-services.model';

interface UserCreationAttrs {
  email: string;
  name: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'user@mail.g', description: 'Email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'test', description: 'Name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @BelongsToMany(() => Service, () => UserServices)
  services: Service[];
}
