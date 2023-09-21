import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { TodoList } from '../Interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnChanges {
  constructor(private fb: NonNullableFormBuilder) {}

  @Input() isModalVisible: boolean = false;
  @Input() currentTask: TodoList = {
    id: 0,
    description: '',
    createdOn: new Date(),
  };
  @Output() closeModal = new EventEmitter();
  @Output() updateTask = new EventEmitter<TodoList>();

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['currentTask']?.currentValue.description)
    {
      this.validateupdateForm
        .get('Updatedescription')
        ?.setValue(`${changes['currentTask']?.currentValue?.description}`);

    }

  }

  validateupdateForm: FormGroup<{
    Updatedescription: FormControl<string>;
  }> = this.fb.group({
    Updatedescription: [this.currentTask.description, [Validators.required]],
  });

  //MODAL OPERATION
  handleCancel(): void {
    this.isModalVisible = false;
    this.closeModal.emit(this.isModalVisible);
  }

  //UPDATE TASK
  handleUpdate() {
    const newvalue = this.validateupdateForm.get('Updatedescription')?.value;
    this.currentTask = { ...this.currentTask, description: newvalue as string };
    this.updateTask.emit(this.currentTask);
    this.validateupdateForm.get('Updatedescription')?.reset();
    this.handleCancel();
  }
}
