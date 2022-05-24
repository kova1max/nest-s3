import { Module } from '@nestjs/common';
// import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   database: 'tasks',
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    //   autoLoadEntities: true,
    // }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    S3Module,
  ],
})
export class AppModule {
  // constructor(private connection: Connection) {}
}
