import { TestBed } from '@angular/core/testing';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MessageService } from './message.service';

describe('Message-Service', () => {
  let service: MessageService
  let messageService: NzMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ NzMessageService]
    });
    messageService = TestBed.inject(NzMessageService);
    service = TestBed.inject(MessageService);
  });

  it('should create a success message', () => {
    spyOn(messageService, 'create');
    const message = 'Test success message';
    service.successMessage(message);
    expect(messageService.create).toHaveBeenCalledWith('success', message);
  });
  it('should create a error message', () => {
    spyOn(messageService, 'create');
    const message = 'Test error message';
    service.errorMessage(message);
    expect(messageService.create).toHaveBeenCalledWith('error', message);
  });
});