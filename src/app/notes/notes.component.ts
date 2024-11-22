import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule }  from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AppService } from '../app.service';
import { title } from 'process';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatCardModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit {
  @Input() arr = {}
  cardDetails = {
    title: '',
    notes: '',
    date: ''
  }

  constructor(public appService: AppService) {}
  
//   {
//     "title": "as",
//     "notes": "sa",
//     "date": "11/21/2024, 6:58:28 PM"
// }

  ngOnInit() {
    console.log("input arr:::",this.arr)
    this.cardDetails['title'] = this.arr['title' as keyof typeof this.arr];
    this.cardDetails['notes'] = this.arr['notes' as keyof typeof this.arr];
    this.cardDetails['date'] = this.arr['date' as keyof typeof this.arr];
    console.log("this.cardDetails:::",this.cardDetails)
  }

}
