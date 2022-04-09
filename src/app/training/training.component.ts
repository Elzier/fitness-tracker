import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { TrainingService } from '../shared/services/training.service'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy{
  onGoingTraining = false
  runningTrainingSub!: Subscription

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.runningTrainingSub = this.trainingService.exerciseChanged.subscribe(exercise => {
        exercise ? this.onGoingTraining = true : this.onGoingTraining = false
      })
  }

  ngOnDestroy(): void {
    this.runningTrainingSub.unsubscribe()
  }
}
