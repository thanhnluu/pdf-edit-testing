import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  canEdit: boolean = false;
  editDisabled: boolean = true

  onEditSwitch(editMode: boolean){
    this.canEdit = editMode;
  }

  onFileLoaded(fileLoaded: boolean){
    this.editDisabled = !fileLoaded;
  }
}
