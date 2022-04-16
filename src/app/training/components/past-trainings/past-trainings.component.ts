import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Exercise } from '../../../shared/models'
import { TrainingService } from '../../../shared/services/training.service'
import { MatSort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['name', 'duration', 'calories', 'date', 'state']
  dataSource = new MatTableDataSource<Exercise>()
  private lastExercisesChangedSub!: Subscription

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator
  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.lastExercisesChangedSub = this.trainingService.finishedExercisesChanged
      .subscribe(exercises => {
        this.dataSource.data = exercises
      })
    this.trainingService.fetchFinishedExercises()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  filter(event: KeyboardEvent) {
    const searchString = (<HTMLInputElement>event.target).value
    this.dataSource.filter = searchString.trim().toLowerCase()
  }

  ngOnDestroy() {
    if (this.lastExercisesChangedSub) this.lastExercisesChangedSub.unsubscribe()
  }
}
