import { Module, MiddlewareConsumer, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { Comment } from './entities/comment.entity';

import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserDevice } from './entities/user-device.entity';
import { AddressModule } from './addresses/addresses.module';
import { Address } from './entities/address.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';

import { Cart } from './entities/cart.entity';
import { CartDetail } from './entities/cart-detail.entity';
import { CartModule } from './cart/cart.module';

import { NotificationModule } from './notification/notification.module';
import { OtpCode } from './entities/otp-code.dto';
import { TenantModule } from './tenant/tenant.module';
import { Store } from './entities/store.entity';
import { StoreProduct } from './entities/store-product.entity';
import { StoreModule } from './store/store.module';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { OrderModule } from './order/order.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: config.get('MAILDEV_INCOMING_USER'),
            pass: config.get('MAILDEV_INCOMING_PASSWORD'),
          },
          tls: {
            rejectUnauthorized: false,
          },
        },
        defaults: {
          from: config.get('MAILER_DEFAULT_FROM'),
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: process.env.PROJECT_DB_HOST || 'localhost',
          port: Number(process.env.PROJECT_DB_PORT) || 5432,
          database: config.get('PROJECT_DB_NAME'),
          username: process.env.PROJECT_DB_USER,
          password: process.env.PROJECT_DB_PASSWORD,
          // ssl: {
          //   rejectUnauthorized: false,
          // },
          entities: [
            User,
            UserDevice,
            Address,
            Product,
            Category,
            OtpCode,
            Store,
            StoreProduct,
            Cart,
            CartDetail,
            Comment,
            Order,
            OrderDetail,
          ],
          synchronize: true,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
    }),
    AuthModule,
    AddressModule,
    ProductsModule,
    AuthModule,
    NotificationModule,
    TenantModule,
    StoreModule,
    CartModule,
    OrderModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {}
}
