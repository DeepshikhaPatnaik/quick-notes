import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppModalComponent } from './app-modal/app-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule }  from '@angular/material/button';
import { MatDialog }  from '@angular/material/dialog';
import { NotesComponent } from './notes/notes.component';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,AppHeaderComponent,AppModalComponent,MatButtonModule,NotesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'QuickNotes';
  updatedNotesArr: {}[] = []


  constructor(public dialog: MatDialog, public appService: AppService) {}

  openDialog(): void {
    console.log("in addNewNote");
    const dialogRef = this.dialog.open(AppModalComponent, {
      width: '350px',
      height: '400px',
      // data: {Title: 'test', Notes: 'notes'}
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`,result);
      this.updatedNotesArr.push(result[0])
      this.appService.allNotes.next(this.updatedNotesArr)
      console.log(`this.updatedNotesArr:`,this.updatedNotesArr);
      console.log(`this.allNotes:`,this.appService.allNotes.value);
      console.log(`this.allNotes2:`,this.appService.allNotes.getValue());
      });
    
    
  }

}