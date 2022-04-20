import { Component, OnInit } from '@angular/core'
import { TrainingService } from '../../../shared/services/training.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Exercise } from '../../../shared/models'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../../store/app.reducer'
import * as fromTraining from '../../../store/training/training.reducer'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  availableExercises$!: Observable<Exercise[]>
  form!: FormGroup
  isLoading$!: Observable<boolean>

  constructor(
    private trainingService: TrainingService,
    private fb: FormBuilder,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      exerciseId: [null, Validators.required]
    })
    this.isLoading$ = this.store.select<boolean>(fromRoot.isLoading)
    this.availableExercises$ = this.store.select(fromTraining.getAvailableExercises)
    this.loadAvailableExercises()
  }

  onStartTraining() {
    this.trainingService.selectExercise(this.form.value.exerciseId)
  }

  loadAvailableExercises() {
    this.trainingService.fetchAvailableExercises()
  }
}
