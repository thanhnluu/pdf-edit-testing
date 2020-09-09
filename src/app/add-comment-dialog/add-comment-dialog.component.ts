import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.css']
})
export class AddCommentDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }


  ngOnInit(): void {
  }

  onSave() {
    this.data.fontSize = parseInt(this.data.fontSize);
    this.dialogRef.close(this.data);
  }

  onCancel() {
    this.dialogRef.close({});
  }
}
