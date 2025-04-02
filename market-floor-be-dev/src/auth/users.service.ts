import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../entities/user.entity';
import { ICreateUserPayload } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(payload: ICreateUserPayload) {
    const user = this.repo.create(payload as User);
    return this.repo.save(user);
  }

  find(phoneNumber: string) {
    return this.repo.find({
      where: { phoneNumber: phoneNumber },
      relations: ['store'],
    });
  }

  findAll() {
    return this.repo.find({ relations: ['store'] });
  }

  findStaffByStoreId(storeId: number) {
    return this.repo.find({
      where: { store: { id: storeId }, role: UserRole.STAFF },
    });
  }

  findUsersByStoreId(storeId: number) {
    return this.repo.find({
      where: { store: { id: storeId } },
    });
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id: id });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...updateAttrs } = attrs;

    Object.assign(user, updateAttrs);

    return this.repo.save(user);
  }

  remove(id: number) {
    if (!this.repo.findOneBy({ id: id })) {
      throw new NotFoundException('user not found');
    }
    return this.repo.delete({ id: id });
  }

  async lock(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    user.isActive = false;
    return this.repo.save(user);
  }
  async findAllByRole(role: UserRole) {
    return this.repo.find({ where: { role } });
  }
}
