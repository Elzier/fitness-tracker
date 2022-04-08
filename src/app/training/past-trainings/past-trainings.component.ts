import { Component, OnInit } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Exercise } from '../../shared/models'
import { TrainingService } from '../../shared/services/training.service'

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit {
  displayedColumns = ['name', 'duration', 'calories', 'date', 'state']
  dataSource = new MatTableDataSource<Exercise>()

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getLastExercises()
  }

}
