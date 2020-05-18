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
import { User } from 'src/user/interfaces/user.interface';

@Processor('notify')
export class TaskConsumer {
    constructor(
        private providersMockService: ProvidersMockService,
        @InjectModel('Notification')
        private notificationModel: Model<Notification>,
        @InjectModel('User') private userModel: Model<User>,
    ) {}

    @Process('group')
    async processGroupTasks(job: Job<any>): Promise<any> {
        const { notificationId, userId, mediums } = job.data;
        const user = await this.userModel.findById(userId).exec();
        const notification = await this.notificationModel
            .findOne({
                _id: notificationId,
                $or: [
                    { 'translations.language': user.preferredLang },
                    { 'translations.isDefault': true },
                ],
            })
            .exec();
        if (notification && user) {
            const { text } = notification.translations.find(
                trans =>
                    trans.language === user.preferredLang || trans.isDefault,
            );

            for (const medium of mediums) {
                this.providersMockService.handleMedium(medium, text, user);
            }
        }
        return {};
    }

    @Process('personal')
    async processPersonalTasks(job: Job<any>): Promise<any> {
        const { notificationId, userId, mediums } = job.data;
        const user = await this.userModel.findById(userId).exec();
        const notification = await this.notificationModel
            .findOne({
                _id: notificationId,
                $or: [
                    { 'translations.language': user.preferredLang },
                    { 'translations.isDefault': true },
                ],
            })
            .exec();
        if (notification && user) {
            const { text } = notification.translations.find(
                trans =>
                    trans.language === user.preferredLang || trans.isDefault,
            );
            for (const medium of mediums) {
                this.providersMockService.handleMedium(medium, text, user);
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
