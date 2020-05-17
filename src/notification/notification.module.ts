import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import {
    NotificationSchema,
    NotificationTranslationSchema,
} from './schemas/notification.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Notification', schema: NotificationSchema },
            {
                name: 'NotificationTranslation',
                schema: NotificationTranslationSchema,
            },
        ]),
    ],
    controllers: [NotificationController],
    providers: [NotificationService],
})
export class NotificationModule {}
