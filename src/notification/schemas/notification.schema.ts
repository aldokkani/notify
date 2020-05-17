import * as mongoose from 'mongoose';

export enum SupportedLanguages {
    EN = 'en',
    AR = 'ar',
}

export const NotificationTranslationSchema = new mongoose.Schema(
    {
        text: String,
        language: {
            type: String,
            enum: [SupportedLanguages.EN, SupportedLanguages.AR],
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
