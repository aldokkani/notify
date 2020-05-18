import * as mongoose from 'mongoose';
import { SupportedLanguagesEnum } from 'src/notification/interfaces/notification.interface';

export const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    preferredLang: {
        type: String,
        enum: [SupportedLanguagesEnum.EN, SupportedLanguagesEnum.AR],
    },
});
