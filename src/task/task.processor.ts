import {
    Processor,
    Process,
    OnQueueActive,
    OnQueueCompleted,
    OnQueueError,
} from '@nestjs/bull';
import { Job } from 'bull';

@Processor('notify')
export class TaskConsumer {
    @Process('group')
    async processGroupTasks(job: Job<unknown>): Promise<any> {
        // console.log(job.id);
        // console.log(job.data);
        return {};
    }

    @Process('personal')
    async processPersonalTasks(job: Job<unknown>): Promise<any> {
        // console.log(job.id);
        // console.log(job.data);
        return {};
    }

    @OnQueueActive()
    async onActive(job: Job) {
        console.log(
            `Processing job ${job.id} of type ${
                job.name
            } with data ${JSON.stringify(job.data)}...`,
        );
    }

    @OnQueueCompleted()
    async onCompleted(job: Job, result: any) {
        console.log(
            `Job ${job.id} of type ${
                job.name
            } has been completed with result ${JSON.stringify(result)}`,
        );
    }

    @OnQueueError()
    async onError(error: Error) {
        console.log(`The following error has occurred: ${error.message}`);
    }
}
