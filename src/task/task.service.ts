import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    // console.log('Cron job performed every 30 seconds');
    this.logger.log('Cron job performed every 30 seconds');
  }

  @Interval(10000)
  handleInterval() {
    // console.log('Interval job performed every 10 seconds');
    this.logger.log('Interval job performed every 10 seconds');
  }

  @Timeout(5000)
  handleTimeout() {
    // console.log('Timeout job performed once after 5 seconds');
    this.logger.log('Timeout job performed once after 5 seconds');
  }
}
