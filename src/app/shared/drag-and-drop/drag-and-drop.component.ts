import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { SnackbarService } from '@app/services/snackbar.service';

class DnDFile {
  public name: string;
  public size: string;

  constructor(init: any = {}) {
    this.name = init.name;
    this.size = `${(init.size / Math.pow(1024, 2)).toFixed(2)}MB`;
  }
}

@Component({
  selector: 'app-drag-and-drop',
  styleUrls: ['./drag-and-drop.component.scss'],
  templateUrl: './drag-and-drop.component.html',
})
export class DragAndDropComponent implements OnInit {
  @Output() public fileDrop: EventEmitter<string> = new EventEmitter();
  public fileOver = false;
  public file: DnDFile;

  constructor(
    private snackbarService: SnackbarService,
  ) { }

  public ngOnInit(): void {
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event: Event): void {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: Event): void {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    this.fileOver = false;
  }

  @HostListener('drop', ['$event'])
  public onDop(event: any): void {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    this.fileOver = false;

    const [file] = event.dataTransfer.files;

    if (!this.validateFile(file)) {
      return;
    }

    this.emitChange(file);
  }

  public onFileUpload(event: any): void {
    const [file] = event.target.files;

    if (!this.validateFile(file)) {
      return;
    }

    this.emitChange(file);
  }

  public removeFile(): void {
    this.fileDrop.emit('');
    this.file = new DnDFile();
  }

  private validateFile(file: File): boolean {
    const { type, size } = file;
    const mb = Math.pow(1024, 2);

    if (!type || ['image/jpeg', 'image/jpg', 'image/png'].indexOf(type) === -1) {
      this.file = new DnDFile();
      this.snackbarService.error('File type not allowed. Allowed types are: jpg, jpeg, png');
      this.fileDrop.emit('');

      return false;
    }

    if (size > mb) {
      this.file = new DnDFile();
      this.snackbarService.error('File is too big. Maximum file size is 1MB');
      this.fileDrop.emit('');

      return false;
    }

    return true;
  }

  private emitChange(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.fileDrop.emit(reader.result as string);
      this.file = new DnDFile(file);
    };
  }
}
