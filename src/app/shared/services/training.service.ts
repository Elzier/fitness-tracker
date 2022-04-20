import { Injectable } from '@angular/core'
import { Exercise } from '../models'
import { map, Subscription, take } from 'rxjs'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import firebase from 'firebase/compat/app'
import Timestamp = firebase.firestore.Timestamp
import { UIService } from './ui.service'
import * as fromTraining from '../../store/training/training.reducer'
import * as UI from '../../store/ui/ui.actions'
import * as training from '../../store/training/training.actions'
import { Store } from '@ngrx/store'

@Injectable({providedIn: 'root'})

export class TrainingService {
  private trainingsSubs$: Subscription[] = []

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading())
    this.trainingsSubs$.push(
      this.db.collection<Exercise>('availableExercises').snapshotChanges()
      .pipe(
        map(documentArray => {
          return documentArray.map(document => ({
            id: document.payload.doc.id,
            ...<Object>document.payload.doc.data()
          } as Exercise))
        })
      )
      .subscribe({
        next: (exercises: Exercise[]) => {
          this.store.dispatch(new training.SetAvailableExercises(exercises))
          this.store.dispatch(new UI.StopLoading())
        },
        error: () => {
          this.store.dispatch(new training.SetAvailableExercises([]))
          this.store.dispatch(new UI.StopLoading())
          this.uiService.showSnack(
            'Fetching exercises failed, try again later.',
            'OK',
            {duration: 3000}
          )
        }
      })
    )
  }

  selectExercise(selectedExId: string) {
    this.store.dispatch(new training.StartTraining(selectedExId))
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe(exercise => {
      if (exercise) {
        this.postFinishedExerciseToDb({
          ...exercise,
          date: Timestamp.now(),
          state: 'completed'
        })
      }
    })
    this.store.dispatch(new training.StopTraining())
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe(exercise => {
      if (exercise) {
        this.postFinishedExerciseToDb({
          ...exercise,
          date: Timestamp.now(),
          state: 'cancelled',
          duration: +((exercise.duration / 100 * progress).toFixed(2)),
          calories: +((exercise.calories / 100 * progress).toFixed(2))
        })
      }
    })
    this.store.dispatch(new training.StopTraining())
  }

  fetchFinishedExercises() {
    this.trainingsSubs$.push(this.db.collection<Exercise>('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new training.SetFinishedExercises(exercises))
    }))
  }

  cancelAllSubs() {
    this.trainingsSubs$.forEach(sub => sub.unsubscribe())
  }

  private postFinishedExerciseToDb(exercise: Exercise) {
    this.db.collection<Exercise>('finishedExercises').add(exercise)
  }
}
