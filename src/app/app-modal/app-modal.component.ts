import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule }  from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog }  from '@angular/material/dialog';
import { MatDialogRef }  from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { title } from 'process';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatButtonModule,CommonModule,FormsModule],
  templateUrl: './app-modal.component.html',
  styleUrl: './app-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppModalComponent {
  newTitle: string = '';
  newNote: string = '';
  newData: {}[] = [];

  constructor(public dialogRef: MatDialogRef<AppModalComponent>) {}
  
  onCancel(): void {
    console.log("onCancel")
    const dialogRef = this.dialogRef.close();
  }

  onSave(): void {
    console.log("date:",new Date().toLocaleString())
    console.log("this.newTitle:",this.newTitle)
    console.log("this.newNote:",this.newNote)
    if (this.newTitle.length > 0 && this.newNote.length > 0) {
      this.newData.push({
        title : this.newTitle,
        notes : this.newNote,
        date : new Date().toLocaleString()
      })
      alert("Data saved!");
      const dialogRef = this.dialogRef.close(this.newData);
    }
    console.log("this.newData:",this.newData)
    this.newTitle = '';
    this.newNote = '';
  }

}
