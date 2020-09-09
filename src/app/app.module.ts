import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppComponent } from './app.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { PdfWrapperComponent } from './pdf-wrapper/pdf-wrapper.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AddCommentDialogComponent } from './add-comment-dialog/add-comment-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SafeUrlPipe } from './safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EditButtonComponent,
    PdfWrapperComponent,
    AddCommentDialogComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    PdfViewerModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
