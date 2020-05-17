import { Document } from 'mongoose';

export enum SupportedLanguagesEnum {
    EN = 'en',
    AR = 'ar',
}

export interface NotificationTranslation extends Document {
    text: string;
    language: SupportedLanguagesEnum;
    isDefault: boolean;
}

export interface Notification extends Document {
    translations: [NotificationTranslation];
}
