import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICreateUserPayload } from './dtos';
import { UsersService } from 'src/auth/users.service';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { ISignInStaffPayload } from './dtos';
import { User, UserRole } from '../entities/user.entity';

const scrypt = promisify(_script);

@Injectable()
export class TenantService {
  constructor(
    private readonly userUservice: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(payload: ICreateUserPayload) {
    const { password, phoneNumber } = payload;
    const users = await this.userUservice.find(phoneNumber);

    if (users?.length) {
      throw new BadRequestException(
        'Phone number is in use, please try another',
      );
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = await this.userUservice.create({
      ...payload,
      password: result,
    });

    return user;
  }

  async signIn(payload: ISignInStaffPayload) {
    const { phoneNumber, password } = payload;
    const [user] = await this.userUservice.find(phoneNumber);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role == 'user') {
      throw new ForbiddenException('User cannot login to admin site');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException(
        'Phone number or password is not corrected',
      );
    }
    const jwtPayload = {
      id: user.id,
      username: user.username,
      phoneNumber: user.phoneNumber,
      role: user.role,
      storeId: user?.store?.id,
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(jwtPayload, { expiresIn: '1d' }),
      refreshToken: this.jwtService.sign(jwtPayload, {
        expiresIn: '7d',
      }),
    };
  }

  async getAll() {
    return this.userUservice.findAll();
  }

  async getAllStaff(storeId: number) {
    return this.userUservice.findStaffByStoreId(storeId);
  }

  async getById(id: number, currentUser: User) {
    if (!id) {
      throw new NotFoundException('User not found');
    }

    const user = await this.userUservice.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (
      currentUser.role === UserRole.STAFF &&
      (user.role === UserRole.ADMIN || user.role === UserRole.STAFF)
    ) {
      throw new ForbiddenException('You are not allowed to view this user.');
    }

    return user;
  }

  async deleteById(id: number, currentUser: User) {
    const user = await this.userUservice.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (currentUser.id === user.id) {
      throw new BadRequestException('You cannot remove your own account.');
    }

    return this.userUservice.remove(id);
  }

  async lockById(id: number, currentUser: User) {
    const user = await this.userUservice.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (currentUser.id === user.id) {
      throw new BadRequestException('You cannot lock your own account.');
    }

    if (currentUser.role === UserRole.STAFF) {
      if (user.role === UserRole.STAFF || user.role === UserRole.ADMIN) {
        throw new BadRequestException(
          'Staff cannot lock Admin or other Staff accounts.',
        );
      }
    }

    return this.userUservice.lock(id);
  }
}
