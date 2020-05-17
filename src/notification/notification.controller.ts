import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
    Notification,
    NotificationTranslation,
} from './interfaces/notification.interface';

@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) {}

    @Post()
    async createNotification(@Body() notification: any): Promise<Notification> {
        return this.notificationService.create(notification);
    }

    @Get()
    async getAllNotifications(): Promise<Notification[]> {
        return this.notificationService.findAll();
    }

    @Get(':id')
    async getNotification(@Param('id') id: string): Promise<Notification> {
        return this.notificationService.findOne(id);
    }

    @Delete(':id')
    async deleteNotification(@Param('id') id: string): Promise<Notification> {
        return this.notificationService.delete(id);
    }

    @Patch(':id')
    async updateTranslation(
        @Param('id') id: string,
        @Body() notification: NotificationTranslation,
    ): Promise<Notification> {
        return this.notificationService.updateTranslation(id, notification);
    }

    // @Delete(':id/translation/:tid')
    // async deleteTranslation(
    //     @Param('id') id: string,
    //     @Param('tid') translationId: string,
    // ): Promise<Notification> {
    //     return this.notificationService.deleteTranslation(id, translationId);
    // }
}
