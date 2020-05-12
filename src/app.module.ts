import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';

const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DATABASE,
    MONGO_USER,
    MONGO_PASSWORD,
} = process.env;

@Module({
    imports: [
        MongooseModule.forRoot(
            `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            },
        ),
        NotificationModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
