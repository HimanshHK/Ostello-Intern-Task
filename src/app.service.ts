import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Sir, This is the Cart API created by Himanshu for the Ostello AI Internship Task.Please browse the API to check its functionality.You can easily access all APIs using the documentation by going to the "/api" route.Thank you.If you have any issues, you can contact me at himanshuhkcoding@gmail.com.';
  }
}
