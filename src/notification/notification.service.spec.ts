import { Test, TestingModule } from '@nestjs/testing';
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

describe('NotificationService', () => {
    let service: NotificationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
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

        service = module.get<NotificationService>(NotificationService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
