import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ValidateOtpGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const p = new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve('anything');
      }, 3000);
    });
    await p;
    console.log(2);
    return true;
  }
}
