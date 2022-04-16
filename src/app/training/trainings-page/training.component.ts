import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { TrainingService } from '../../shared/services/training.service'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy{
  onGoingTraining = false
  private runningTrainingSub$!: Subscription

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.runningTrainingSub$ = this.trainingService.currentExerciseChanged
      .subscribe(exercise => {
        exercise ? this.onGoingTraining = true : this.onGoingTraining = false
      })
  }

  ngOnDestroy(): void {
    if (this.runningTrainingSub$) this.runningTrainingSub$.unsubscribe()
  }
}
