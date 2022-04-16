import { NgModule } from '@angular/core'
import { MaterialModule } from '../shared/material.module'
import { TrainingComponent } from './trainings-page/training.component'
import { NewTrainingComponent } from './components/new-training/new-training.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PastTrainingsComponent } from './components/past-trainings/past-trainings.component'
import { FirestoreDatePipe } from '../shared/pipes/firestoreDate.pipe'
import { CurrentTrainingComponent } from './components/current-training/current-training.component'
import { StopTrainingComponent } from './components/current-training/stop-training.component'
import { FlexLayoutModule } from '@angular/flex-layout'
import { CommonModule } from '@angular/common'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { TrainingService } from '../shared/services/training.service'

@NgModule({
  declarations: [
    TrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    CurrentTrainingComponent,
    StopTrainingComponent,
    FirestoreDatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFirestoreModule
  ],
  exports: [],
  providers: [TrainingService]
})

export class TrainingModule {}
