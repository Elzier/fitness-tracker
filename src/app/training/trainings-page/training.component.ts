import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import * as fromTraining from '../../store/training/training.reducer'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  isRunningTraining$!: Observable<boolean>

  constructor(private store: Store<fromTraining.State>) {}

  ngOnInit(): void {
    this.isRunningTraining$ = this.store.select(fromTraining.getIsExerciseActive)
  }
}
