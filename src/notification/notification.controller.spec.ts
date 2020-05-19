import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { getModelToken } from '@nestjs/mongoose';

const notificationModel = {
    translations: [],
};

const notificationTranslationModel = {
    text: 'test',
    language: 'en',
    isDefault: false,
};

describe('Notification Controller', () => {
    let controller: NotificationController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [NotificationController],
            providers: [
                NotificationService,
                {
                    provide: getModelToken('Notification'),
                    useValue: notificationModel,
                },
                {
                    provide: getModelToken('NotificationTranslation'),
                    useValue: notificationTranslationModel,
                },
            ],
        }).compile();

        controller = module.get<NotificationController>(NotificationController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
