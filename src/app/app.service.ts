import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { noteData } from './app-interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  allNotes = new BehaviorSubject<Array<noteData>>([])

  constructor() { }
}
