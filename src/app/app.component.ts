import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppModalComponent } from './app-modal/app-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule }  from '@angular/material/button';
import { MatDialog }  from '@angular/material/dialog';
import { NotesComponent } from './notes/notes.component';
import { BehaviorSubject } from 'rxjs';
import { AppService } from './app.service';
import { noteData } from './app-interface';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,AppHeaderComponent,AppModalComponent,MatButtonModule,NotesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'QuickNotes';
  updatedNotesArr: Array<noteData> = [];
  allNotesObs$ = this.appService.allNotes;


  constructor(public dialog: MatDialog, public appService: AppService) {}

  ngOnInit() {
    this.allNotesObs$ = this.appService.allNotes;
  }

  updatedChange(event: any) {
    console.log("updatedChange event:",event)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AppModalComponent, {
      width: '350px',
      height: '400px',
      // data: {Title: 'test', Notes: 'notes'}
    })

    dialogRef.afterClosed().subscribe(result => {
      this.updatedNotesArr.push(result[0])
      this.appService.allNotes.next(this.updatedNotesArr)
      this.allNotesObs$.next(this.updatedNotesArr)
      });
    
    
  }

}