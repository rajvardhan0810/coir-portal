import { Module } from '@nestjs/common';

import { join } from 'path';

import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './Module/auth/auth.module';
import { SchemesModule } from './Module/schemes/schemes.module';
import { ApplicationModule } from './Module/application/application.module';
import { TrainingCentresModule } from './Module/training-centres/training-centres.module';
import { UploadModule } from './Module/upload/upload.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(
        process.cwd(),
        'uploads',
      ),

      serveRoot: '/uploads',
    }),

    PrismaModule,

    AuthModule,

    SchemesModule,

    ApplicationModule,

    TrainingCentresModule,

    UploadModule,
  ],

  controllers: [
    AppController,
  ],

  providers: [
    AppService,
  ],
})
export class AppModule {}