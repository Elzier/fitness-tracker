import { NgModule } from '@angular/core'
import { TrainingComponent } from './trainings-page/training.component'
import { NewTrainingComponent } from './components/new-training/new-training.component'
import { PastTrainingsComponent } from './components/past-trainings/past-trainings.component'
import { FirestoreDatePipe } from '../shared/pipes/firestoreDate.pipe'
import { CurrentTrainingComponent } from './components/current-training/current-training.component'
import { StopTrainingComponent } from './components/current-training/stop-training.component'
import { SharedModule } from '../shared/shared.module'
import { TrainingRoutingModule } from './training-routing.module'

@NgModule({
  declarations: [
    TrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    CurrentTrainingComponent,
    StopTrainingComponent,
    FirestoreDatePipe
  ],
  imports: [SharedModule, TrainingRoutingModule],
})

export class TrainingModule {}
