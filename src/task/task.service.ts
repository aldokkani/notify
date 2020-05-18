import { Injectable } from '@nestjs/common';
import { Queue, Job } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class TaskService {
    constructor(@InjectQueue('notify') private notifyQueue: Queue) {}

    async addGroupNotification(
        notificationId: string,
        users: string[],
        mediums: string[],
    ): Promise<Job[]> {
        const bulkJobs = users.map(userId => ({
            name: 'group',
            data: { notificationId, mediums, userId },
        }));
        return await this.notifyQueue.addBulk(bulkJobs);
    }

    async addPersonalNotification(
        notificationId: string,
        userId: string,
        mediums: string[],
    ): Promise<Job> {
        return await this.notifyQueue.add('personal', {
            notificationId,
            userId,
            mediums,
        });
    }
}
