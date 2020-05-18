import {
    Processor,
    Process,
    OnQueueActive,
    OnQueueCompleted,
    OnQueueError,
} from '@nestjs/bull';
import { Job } from 'bull';
import { ProvidersMockService } from './providers.mock';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from 'src/notification/interfaces/notification.interface';
import { NotImplementedException } from '@nestjs/common';

@Processor('notify')
export class TaskConsumer {
    constructor(
        private providersMockService: ProvidersMockService,
        @InjectModel('Notification')
        private notificationModel: Model<Notification>,
    ) {}

    @Process('group')
    async processGroupTasks(job: Job<any>): Promise<any> {
        const { notificationId, userId, mediums } = job.data;
        for (const medium of mediums) {
            switch (medium) {
                case 'SMS':
                    this.providersMockService.sendSMS();
                    break;

                case 'EMAIL':
                    this.providersMockService.sendEmail();
                    break;

                case 'PUSH_NOTIFICATION':
                    this.providersMockService.sendPushNotification();
                    break;

                default:
                    throw new NotImplementedException(
                        `Medium:${medium} is not supported!`,
                    );
            }
        }
        return {};
    }

    @Process('personal')
    async processPersonalTasks(job: Job<any>): Promise<any> {
        const { notificationId, userId, mediums } = job.data;
        for (const medium of mediums) {
            switch (medium) {
                case 'SMS':
                    this.providersMockService.sendSMS();
                    break;

                case 'EMAIL':
                    this.providersMockService.sendEmail();
                    break;

                case 'PUSH_NOTIFICATION':
                    this.providersMockService.sendPushNotification();
                    break;

                default:
                    throw new NotImplementedException(
                        `Medium:${medium} is not supported!`,
                    );
            }
        }
        return {};
    }

    @OnQueueActive()
    async onActive(job: Job) {
        console.log(
            `Processing job ${job.id} of type ${
                job.name
            } with data ${JSON.stringify(job.data)}...`,
        );
    }

    @OnQueueCompleted()
    async onCompleted(job: Job, result: any) {
        console.log(
            `Job ${job.id} of type ${
                job.name
            } has been completed with result ${JSON.stringify(result)}`,
        );
    }

    @OnQueueError()
    async onError(error: Error) {
        console.log(`The following error has occurred: ${error.message}`);
    }
}
