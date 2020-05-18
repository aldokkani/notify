import { Injectable } from '@nestjs/common';

@Injectable()
export class ProvidersMockService {
    async sendSMS() {
        console.log('Sending SMS...');
    }

    async sendEmail() {
        console.log('Sending Email...');
    }

    async sendPushNotification() {
        console.log('Sending Push Notification...');
    }
}
