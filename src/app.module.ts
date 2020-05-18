import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { NotificationModule } from './notification/notification.module';
import { TaskModule } from './task/task.module';

const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DATABASE,
    MONGO_USER,
    MONGO_PASSWORD,
} = process.env;

@Module({
    imports: [
        MongooseModule.forRoot(
            `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            },
        ),
        BullModule.registerQueue({
            name: 'notify',
            redis: { host: '0.0.0.0', port: 6379 },
        }),
        NotificationModule,
        TaskModule,
    ],
})
export class AppModule {}
