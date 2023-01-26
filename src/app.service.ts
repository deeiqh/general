import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Consumer } from 'kafkajs';

export class AppService {
  constructor(
    @Inject('USER_SERVICE') private client: ClientKafka,
    @Inject('kafkaConsumer') private kafkaConsumer: Consumer,
  ) {}

  async sendOtp(input: { targetType: string; target: string }): Promise<void> {
    console.log('sendOtp input: ', input);
    this.client.emit('otp-validatedw', { z: 1 });
    console.log('otp-validated event emitted. Shoud be by other service');
    return;
  }

  async otpValidated(): Promise<boolean> {
    let validated = false;

    await this.kafkaConsumer.stop();
    await this.kafkaConsumer.subscribe({
      topic: 'otp-validated',
      fromBeginning: true,
    });
    await this.kafkaConsumer.run({
      eachMessage: async () => {
        validated = true;
      },
    });

    const maxMinutes = 5 / 60;
    const intervalTime = 100;
    const maxIterations = (maxMinutes * 60 * 1000) / intervalTime;
    let iteration = 0;
    const isOtpValidated = new Promise<boolean>((resolve) => {
      setInterval(() => {
        if (validated) {
          resolve(true);
        }
        if (iteration > maxIterations) {
          resolve(false);
        }
        iteration++;
      }, intervalTime);
    });

    return await isOtpValidated;
  }
}