import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
    Notification,
    NotificationTranslation,
} from './interfaces/notification.interface';

@Injectable()
export class NotificationService {
    constructor(
        @InjectModel('Notification')
        private notificationModel: Model<Notification>,
        @InjectModel('NotificationTranslation')
        private notificationTranslationModel: Model<NotificationTranslation>,
    ) {}

    async create(notificationData: any): Promise<any> {
        // TODO: unique lang constrain
        const translation = await new this.notificationTranslationModel(
            notificationData,
        );
        return this.notificationModel.findByIdAndUpdate(
            notificationData.id || Types.ObjectId(),
            {
                $push: { translations: translation },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            },
        );
    }

    async findOne(id: string): Promise<Notification> {
        return this.notificationModel.findById(id).exec();
    }

    async findAll(): Promise<Notification[]> {
        return this.notificationModel.find().exec();
    }

    async updateTranslation(
        id: string,
        notificationData: NotificationTranslation,
    ): Promise<Notification> {
        const toUpdateFields = {};
        for (const key in notificationData) {
            toUpdateFields[`translations.$.${key}`] = notificationData[key];
        }

        return this.notificationModel.findOneAndUpdate(
            { _id: id, 'translations._id': notificationData._id },
            {
                $set: toUpdateFields,
            },
            { new: true, runValidators: true },
        );
    }

    async delete(id: string): Promise<Notification> {
        return this.notificationModel.findByIdAndDelete(id);
    }

    // async deleteTranslation(
    //     id: string,
    //     translationId: string,
    // ): Promise<Notification> {
    //     return this.notificationModel.findByIdAndUpdate(id, {
    //         $pull: { translations: { _id: translationId } },
    //     });
    // }
}
