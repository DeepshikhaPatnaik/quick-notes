import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule }  from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog }  from '@angular/material/dialog';
import { MatDialogRef }  from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'



@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatButtonModule,CommonModule,FormsModule],
  templateUrl: './app-modal.component.html',
  styleUrl: './app-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppModalComponent implements OnInit{
  newTitle: string = '';
  newNote: string = '';
  newData: Array<{}> = [];

  constructor(public dialogRef: MatDialogRef<AppModalComponent>, @Inject(MAT_DIALOG_DATA) public data: [{title: string, notes: string}]) {}

  ngOnInit() {
    if(this.data?.length>0) {
      this.newTitle = this.data[0].title;
      this.newNote = this.data[0].notes;
    }
  }
  
  onCancel(): void {
    const dialogRef = this.dialogRef.close();
  }

  onSave(): void {
    if (this.newTitle.length > 0 && this.newNote.length > 0) {
      this.newData.push({
        title : this.newTitle,
        notes : this.newNote,
        date : new Date().toLocaleString(),
        id: uuid()
      })
      alert("Data saved!");
      const dialogRef = this.dialogRef.close(this.newData);
    }
    this.newTitle = '';
    this.newNote = '';
  }

}
