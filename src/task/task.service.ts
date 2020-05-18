import { Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class TaskService {
    constructor(@InjectQueue('notify') private notifyQueue: Queue) {}

    async addGroupNotification(
        notificationId: string,
        users: [string],
        mediums: [string],
    ): Promise<Job> {
        return await this.notifyQueue.add(
            'group',
            {
                notificationId,
                users,
                mediums,
            },
            { delay: Number(process.env.REQUESTS_LIMIT) || 0 },
        );
    }

    async addPersonalNotification(
        notificationId: string,
        userId: string,
        mediums: [string],
    ): Promise<Job> {
        return await this.notifyQueue.add('personal', {
            notificationId,
            userId,
            mediums,
        });
    }
}
