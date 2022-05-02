import { Router } from '@angular/router';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) { }
  handleError(error: any) {
    // console.log(error.stack.toString());
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;
    console.log(error.message, chunkFailedMessage.test(error.message));
    // if (chunkFailedMessage.test(error.message)) {
    //   window.location.reload();
    // }
  }

}