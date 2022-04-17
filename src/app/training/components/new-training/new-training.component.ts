import { Component, OnDestroy, OnInit } from '@angular/core'
import { TrainingService } from '../../../shared/services/training.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Exercise } from '../../../shared/models'
import { Subscription } from 'rxjs'
import { UIService } from '../../../shared/services/ui.service'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  private exercisesChangedSub$!: Subscription
  private loaderSub$!: Subscription
  exercises: Exercise[] | null = null
  form!: FormGroup
  showLoader = false

  constructor(
    private trainingService: TrainingService,
    private fb: FormBuilder,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      exerciseId: [null, Validators.required]
    })
    this.loaderSub$ = this.uiService.loaderStateChanged.subscribe(showOrNot => this.showLoader = showOrNot)

    this.exercisesChangedSub$ = this.trainingService.availableExercisesChanged
      .subscribe(exercises => this.exercises = exercises)
    this.loadAvailableExercises()
  }

  onStartTraining() {
    this.trainingService.selectExercise(this.form.value.exerciseId)
  }

  ngOnDestroy() {
    if (this.exercisesChangedSub$) this.exercisesChangedSub$.unsubscribe()
    if (this.loaderSub$) this.loaderSub$.unsubscribe()
  }

  loadAvailableExercises() {
    this.trainingService.fetchAvailableExercises()
  }
}
