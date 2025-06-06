import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { TenantSignInReponseDto } from './dtos';
import { SignInStaffDto } from './dtos';
import { User, UserRole } from 'src/entities/user.entity';
import { CreateStaffDto } from './dtos';
import { TenantService } from './tenant.service';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { UserDto } from '../auth/dtos/user.dto';
import { StaffGuard } from '../common/guards/staff.guard';
import { UsersService } from 'src/auth/users.service';
import { ManagerGuard } from 'src/common/guards/manager.guard';

@Controller('tenant')
export class TenantController {
  constructor(
    private tenantService: TenantService,
    private userService: UsersService,
  ) {}

  @UseGuards(ManagerGuard)
  @Serialize(TenantSignInReponseDto)
  @Post('/create-staff')
  async createStaff(@Body() body: CreateStaffDto) {
    const user = await this.tenantService.createUser({
      ...body,
    });
    return user;
  }

  @UseGuards(AdminGuard)
  @Serialize(TenantSignInReponseDto)
  @Post('/create-manager')
  async createManager(@Body() body: CreateStaffDto) {
    const user = await this.tenantService.createUser({
      ...body,
    });
    return user;
  }

  @Post('/signin')
  @Serialize(TenantSignInReponseDto)
  async signin(@Body() body: SignInStaffDto) {
    const user = await this.tenantService.signIn(body);
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Get('/staffs/:storeId')
  @Serialize(UserDto)
  @UseGuards(StaffGuard)
  getStaffs(@Param('storeId') storeId) {
    return this.tenantService.getAllStaff(storeId);
  }

  @Get('/users')
  @Serialize(UserDto)
  @UseGuards(AdminGuard)
  getUsers() {
    return this.tenantService.getAll();
  }

  @Put('/users/:id')
  @Serialize(UserDto)
  @UseGuards(AdminGuard)
  async updateUser(
    @Param('id') id: number,
    @Body() payload: Omit<User, 'password'>,
  ) {
    return this.userService.update(id, payload);
  }
}
