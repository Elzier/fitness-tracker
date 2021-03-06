import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Exercise } from '../../../shared/models'
import { TrainingService } from '../../../shared/services/training.service'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { Store } from '@ngrx/store'
import * as fromTraining from '../../../store/training/training.reducer'

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'duration', 'calories', 'date', 'state']
  dataSource = new MatTableDataSource<Exercise>()

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) {}

  ngOnInit(): void {
    this.trainingService.fetchFinishedExercises()
    this.store.select(fromTraining.getFinishedExercises).subscribe(exercises => {
      this.dataSource.data = exercises
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  filter(event: KeyboardEvent) {
    const searchString = (<HTMLInputElement>event.target).value
    this.dataSource.filter = searchString.trim().toLowerCase()
  }
}
