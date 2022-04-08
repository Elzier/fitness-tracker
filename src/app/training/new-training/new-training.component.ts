import { Component, OnInit } from '@angular/core'
import { TrainingService } from '../../shared/services/training.service'
import { Exercise } from '../../shared/models'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = []
  form!: FormGroup

  constructor(private trainingService: TrainingService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises()
    this.form = this.fb.group({
      exerciseId: [null, Validators.required]
    })
  }

  onStartTraining() {
    this.trainingService.selectExercise(this.form.value.exerciseId)
  }
}
