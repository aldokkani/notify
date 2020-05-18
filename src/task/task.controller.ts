import { Controller, Post, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { Job } from 'bull';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post('group')
    async handleGroupNotification(@Body() notifyBody: any): Promise<Job> {
        const { notificationId, users, mediums } = notifyBody;
        return this.taskService.addGroupNotification(
            notificationId,
            users,
            mediums,
        );
    }

    @Post('personal')
    async handlePersonalNotification(@Body() body: any): Promise<Job> {
        const { notificationId, userId, mediums } = body;
        return this.taskService.addPersonalNotification(
            notificationId,
            userId,
            mediums,
        );
    }
}
