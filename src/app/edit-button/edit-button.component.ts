import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.css']
})
export class EditButtonComponent implements OnInit {
  @Input() disabled: boolean = true;
  @Output() editEmitter = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit(): void {
  }

  flipEdit(e) {  
    this.editEmitter.emit(e.checked);
  }
}
