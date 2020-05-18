import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskConsumer } from './task.processor';
import { ProvidersMockService } from './providers.mock';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from 'src/notification/schemas/notification.schema';
import { UserSchema } from 'src/user/schemas/user.schema';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'notify',
            redis: { host: 'redis', port: 6379 },
            limiter: {
                max: 1, // Max number of jobs processed
                duration: Number(process.env.REQUESTS_LIMIT) || 5000, // per duration in milliseconds
            },
        }),
        MongooseModule.forFeature([
            { name: 'Notification', schema: NotificationSchema },
            { name: 'User', schema: UserSchema },
        ]),
    ],
    providers: [TaskService, TaskConsumer, ProvidersMockService],
    controllers: [TaskController],
})
export class TaskModule {}
