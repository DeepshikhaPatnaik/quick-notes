import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule }  from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AppService } from '../app.service';
import { title } from 'process';
import { MatDialog } from '@angular/material/dialog';
import { AppModalComponent } from '../app-modal/app-modal.component';
import { noteData } from '../app-interface';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatCardModule,AppModalComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit {
  @Input() arr = {};
  @Output() updatedChange = new EventEmitter<Array<noteData>>();
  cardDetails = {
    title: '',
    notes: '',
    date: '',
    id: ''
  }
  allNotes: Array<noteData> = [];

  constructor(public appService: AppService,public dialog: MatDialog) {}

  ngOnInit() {
    this.cardDetails['title'] = this.arr['title' as keyof typeof this.arr];
    this.cardDetails['notes'] = this.arr['notes' as keyof typeof this.arr];
    this.cardDetails['date'] = this.arr['date' as keyof typeof this.arr];
    this.cardDetails['id'] = this.arr['id' as keyof typeof this.arr];
  }

  deleteNote(id: string) {
    this.appService.allNotes.value.forEach(entry => {
      if(id === entry['id']) {
        let i = this.appService.allNotes.value.indexOf(entry);
        this.appService.allNotes.value.splice(i,1)
      }
      this.updatedChange.emit(this.appService.allNotes.value)
    })
  }

  updateButton(id: any): void {
    this.appService.allNotes.value.forEach((entry) => {
      if(id === entry['id' as keyof typeof entry]) {

        const dialogRef = this.dialog.open(AppModalComponent, {
          width: '350px',
          height: '400px',
          data: [entry]
        })

        dialogRef.afterClosed().subscribe(result => {
          this.cardDetails['title'] = result[0].title;
          this.cardDetails['notes'] = result[0].notes;
          entry['title'] = result[0].title;
          entry['notes'] = result[0].notes;

          this.updatedChange.emit(this.appService.allNotes.value);
        });

      }
    })

    
    
  }

}
