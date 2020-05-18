import { Document } from 'mongoose';
import { SupportedLanguagesEnum } from 'src/notification/interfaces/notification.interface';

export interface User extends Document {
    name: string;
    email: string;
    phone: string;
    preferredLang: SupportedLanguagesEnum;
}
