import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { BullModule } from '@nestjs/bull';
import { TaskConsumer } from './task.processor';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'notify',
            redis: { host: 'redis', port: 6379 },
        }),
    ],
    providers: [TaskService, TaskConsumer],
    controllers: [TaskController],
})
export class TaskModule {}
