# pdf-edit-testing

This is an Angular application used to experiment with PDF-LIB, a library used to create and modify PDF documents.

## Prerequisites: 
- `git clone https://github.com/D2P-APPS/pdf-edit-testing.git`

- `cd pdf-edit-testing`

- `npm install`

- `ng serve`

- Go to: `http://localhost:4200`

## Features:
When the application starts, there are two buttons: an edit button, which is initially disabled, and a file selecter input button. Clicking the file selecter input button allows the user to select a PDF file from his/her file system to edit. Once a file is selected, it will appear on the page, and the edit button will now be enabled.

To begin editing, click the edit button to enable editing. Highlight a selection of text to add the edit to; a dialog box will popup prompting for text to add, font size, and color of the text. Once all fields are populated, click save to save the edit. The displayed PDF document will refresh with the edit added to the PDF document. Optionally, the PDF document can be downloaded using the download button.

## References:
- https://github.com/Hopding/pdf-lib
- https://pdf-lib.js.org/
