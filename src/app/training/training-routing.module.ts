import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TrainingComponent } from './trainings-page/training.component'
import { AuthGuard } from '../shared/services/auth.guard'

const routes: Routes = [{path: '', component: TrainingComponent, canActivate: [AuthGuard]}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule {}
