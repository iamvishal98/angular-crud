import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private message: NzMessageService) {}
  successMessage(message: string) {
    this.message.create('success',message)
  }
  errorMessage(message: string): void{
    this.message.create('error',message)
  }
}
