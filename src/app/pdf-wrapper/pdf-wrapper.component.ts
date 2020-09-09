import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentDialogComponent } from '../add-comment-dialog/add-comment-dialog.component';

@Component({
  selector: 'pdf-wrapper',
  templateUrl: './pdf-wrapper.component.html',
  styleUrls: ['./pdf-wrapper.component.css']
})
export class PdfWrapperComponent implements OnInit {
  @ViewChild('pdfViewer') pdfComponent: PdfViewerComponent;

  @Input() canEdit: boolean = false;
  @Input() pdfSrc: any;
  @Output() fileLoaded = new EventEmitter<boolean>();

  page: number;
  text: string = "";
  fontSize: number = 12;
  color: string; // hexadecimal string
  fileUrl: string;
  ocrToggleOn: boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  async onClick(e) {
    if (this.canEdit) {
      const pdfDoc = await PDFDocument.load(this.pdfSrc);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

      // Get the first page of the document
      const pages = pdfDoc.getPages()
      const currentPageNumber = this.pdfComponent.pdfViewer.currentPageNumber - 1;
      const pageToEdit = pages[currentPageNumber];
      const page = this.pdfComponent.pdfViewer.getPageView(currentPageNumber);
      const pageRect = page.canvas.getClientRects()[0];
      const selection = window.getSelection();
      const selectionRects = selection.getRangeAt(0).getClientRects();
      const selectionText = selection.toString(); // selected text
      const selectionTextStartIndex = selection.anchorOffset; // start index of selected text in the span
      const selectionTextEndIndex = selection.focusOffset; // end index of selected text in a span. May overflow into another span 
      const selectionRect = selectionRects[0];
      const viewport = page.viewport;
      const selectionCoordinates = viewport.convertToPdfPoint(selectionRect.left - pageRect.x, selectionRect.top - pageRect.y).concat(
        viewport.convertToPdfPoint(selectionRect.right - pageRect.x, selectionRect.bottom - pageRect.y))
      const pdfSelectedRectangle = viewport.convertToViewportRectangle(selectionCoordinates);

      const dialogRef = this.dialog.open(AddCommentDialogComponent, {
        width: '250px',
        data: { text: this.text, fontSize: this.fontSize, color: this.color }
      });

      dialogRef.afterClosed().subscribe(async result => {
        this.text = result.text;
        this.fontSize = result.fontSize;
        this.color = result.color;
        if (!this.text || !this.fontSize || !this.color)
          return;

        const rgbColor = this.hexToRgb(this.color);
        // drawing a rectange to "white out" the old text
        pageToEdit.drawRectangle({
          x: selectionCoordinates[0],
          y: selectionCoordinates[3],
          width: Math.abs(pdfSelectedRectangle[0] - pdfSelectedRectangle[2]),
          height: Math.abs(pdfSelectedRectangle[1] - pdfSelectedRectangle[3]),
          borderColor: rgb(1, 1, 1),
          color: rgb(1, 1, 1)
        })
        
        pageToEdit.drawText(this.text, {
          x: selectionCoordinates[0],
          y: selectionCoordinates[3],
          size: this.fontSize,
          font: helveticaFont,
          color: rgb(rgbColor.r / 255, rgbColor.g / 255, rgbColor.b / 255),
        })
        
        this.page = currentPageNumber + 1; // for some reason, this is not zero-indexed
        this.pdfSrc = await pdfDoc.save()
      });
    }
  }

  handleFileInput(files: FileList) {
    const chosenFile = files.item(0); // object of type File
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(chosenFile);
    fileReader.onload = () => {
      this.pdfSrc = fileReader.result;
      this.fileLoaded.emit(true);
    };
  }

  // converts a hex string of form #FF0000 into a list of RGB values
  hexToRgb(hexString) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hexString = hexString.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  onLoadComplete() {
    const file = new Blob([this.pdfSrc], { type: 'application/pdf' });
    this.fileUrl = window.URL.createObjectURL(file);
  }

  flipOCRToggle(e) {
    this.ocrToggleOn = e.checked;
    this.onTextLayerRender();
  }

  onTextLayerRender() {
    const textLayers = document.getElementsByClassName("textLayer") as HTMLCollectionOf<HTMLElement>;
    const spanChildren = document.querySelectorAll(".textLayer > span") as NodeListOf<HTMLElement>;
    const canvasWrappers = document.querySelectorAll(".canvasWrapper") as NodeListOf<HTMLElement>;
    if (this.ocrToggleOn) {
      for (let i = 0; i < textLayers.length; i++) {
        textLayers[i].style.opacity = "1";
      }

      for (let i = 0; i < spanChildren.length; i++) {
        spanChildren[i].style.color = "initial";
      }

      for (let i = 0; i < canvasWrappers.length; i++) {
        canvasWrappers[i].style.display = "none";
      }
    }
    else {
      for (let i = 0; i < textLayers.length; i++) {
        textLayers[i].style.opacity = "";
      }

      for (let i = 0; i < spanChildren.length; i++) {
        spanChildren[i].style.color = "";
      }

      for (let i = 0; i < canvasWrappers.length; i++) {
        canvasWrappers[i].style.display = "";
      }
    }
  }


}
