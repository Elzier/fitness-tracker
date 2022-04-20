import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { StopTrainingComponent } from './stop-training.component'
import { TrainingService } from '../../../shared/services/training.service'
import { Exercise } from '../../../shared/models'
import * as fromTraining from '../../../store/training/training.reducer'
import { Store } from '@ngrx/store'
import { take } from 'rxjs'

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0
  timer!: ReturnType<typeof setTimeout>
  runningTraining: Exercise | null = null

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe(exercise => {
      this.runningTraining = exercise
    })
    this.timerStartOrContinue()
  }

  timerStartOrContinue() {
    if (this.runningTraining) {
      const step = this.runningTraining.duration / 100 * 1000
      this.timer = setInterval(() => {
        this.progress += 1
        if (this.progress >= 100) {
          this.trainingService.completeExercise()
          clearInterval(this.timer)
        }
      }, step)
    }
  }

  onStop() {
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {data: {progress: this.progress}})
    dialogRef.afterClosed().subscribe(shouldClose => {
      if (shouldClose) {
        this.trainingService.cancelExercise(this.progress)
      }
      else {
        this.timerStartOrContinue()
      }
    })
  }
}
