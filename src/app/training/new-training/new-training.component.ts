import { Component, OnDestroy, OnInit } from '@angular/core'
import { TrainingService } from '../../shared/services/training.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Exercise } from '../../shared/models'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercisesChangedSub$!: Subscription
  exercises: Exercise[] = []
  form!: FormGroup

  constructor(
    private trainingService: TrainingService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      exerciseId: [null, Validators.required]
    })

    this.exercisesChangedSub$ = this.trainingService.availableExercisesChanged
      .subscribe((exercises: Exercise[]) => {
        this.exercises = exercises
    })
    this.trainingService.fetchAvailableExercises()
  }

  onStartTraining() {
    this.trainingService.selectExercise(this.form.value.exerciseId)
  }

  ngOnDestroy() {
    if (this.exercisesChangedSub$) this.exercisesChangedSub$.unsubscribe()
  }
}
