import * as mongoose from 'mongoose';
import { SupportedLanguagesEnum } from '../interfaces/notification.interface';

export const NotificationTranslationSchema = new mongoose.Schema(
    {
        text: String,
        language: {
            type: String,
            enum: [SupportedLanguagesEnum.EN, SupportedLanguagesEnum.AR],
        },
        isDefault: Boolean,
    },
    { timestamps: true },
);

export const NotificationSchema = new mongoose.Schema(
    {
        translations: [NotificationTranslationSchema],
    },
    { timestamps: true },
);
