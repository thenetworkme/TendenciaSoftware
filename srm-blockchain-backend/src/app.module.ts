// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { PharmaciesModule } from './pharmacies/pharmacies.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true, // Set to false in production, use migrations instead
        schema: configService.get<string>('DATABASE_SCHEMA', 'public'),
        // Requerido para conexiones remotas a Supabase/Heroku/etc.
        ssl: {
          rejectUnauthorized: false, // En producción, considera usar un certificado CA
        },
      }),
    }),
    AuthModule,
    UsersModule,
    PrescriptionsModule,
    BlockchainModule,
    PharmaciesModule,
    AnalyticsModule,
    NotificationsModule,
    CommonModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
