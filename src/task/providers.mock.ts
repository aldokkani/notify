import { Injectable, NotImplementedException } from '@nestjs/common';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class ProvidersMockService {
    private async sendSMS(text: string, user: User) {
        console.log(`Sending SMS: ${text}; to: ${user}...`);
    }

    private async sendEmail(text: string, user: User) {
        console.log(`Sending Email: ${text}; to: ${user}...`);
    }

    private async sendPushNotification(text: string, user: User) {
        console.log(`Sending Push Notification: ${text}; to: ${user}...`);
    }

    async handleMedium(medium: string, text: string, user: User) {
        switch (medium) {
            case 'SMS':
                this.sendSMS(text, user);
                break;

            case 'EMAIL':
                this.sendEmail(text, user);
                break;

            case 'PUSH_NOTIFICATION':
                this.sendPushNotification(text, user);
                break;

            default:
                throw new NotImplementedException(
                    `Medium:${medium} is not supported!`,
                );
        }
    }
}
