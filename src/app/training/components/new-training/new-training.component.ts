import { Component, OnDestroy, OnInit } from '@angular/core'
import { TrainingService } from '../../../shared/services/training.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Exercise } from '../../../shared/models'
import { Observable, Subscription } from 'rxjs'
import { UIService } from '../../../shared/services/ui.service'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../store/app.reducer'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  private exercisesChangedSub$!: Subscription
  exercises: Exercise[] | null = null
  form!: FormGroup
  isLoading$!: Observable<boolean>

  constructor(
    private trainingService: TrainingService,
    private fb: FormBuilder,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      exerciseId: [null, Validators.required]
    })
    this.isLoading$ = this.store.select<boolean>(fromRoot.isLoading)
    this.exercisesChangedSub$ = this.trainingService.availableExercisesChanged
      .subscribe(exercises => this.exercises = exercises)
    this.loadAvailableExercises()
  }

  onStartTraining() {
    this.trainingService.selectExercise(this.form.value.exerciseId)
  }

  ngOnDestroy() {
    if (this.exercisesChangedSub$) this.exercisesChangedSub$.unsubscribe()
  }

  loadAvailableExercises() {
    this.trainingService.fetchAvailableExercises()
  }
}
