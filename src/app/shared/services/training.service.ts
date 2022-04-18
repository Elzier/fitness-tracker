import { Injectable } from '@angular/core'
import { Exercise } from '../models'
import { map, Subject, Subscription } from 'rxjs'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import firebase from 'firebase/compat/app'
import Timestamp = firebase.firestore.Timestamp
import { UIService } from './ui.service'
import * as fromRoot from '../../store/app.reducer'
import * as UI from '../../store/ui/ui.actions'
import { Store } from '@ngrx/store'

@Injectable({providedIn: 'root'})

export class TrainingService {
  currentExerciseChanged = new Subject<Exercise | null>()
  availableExercisesChanged = new Subject<Exercise[] | null>()
  finishedExercisesChanged = new Subject<Exercise[]>()
  private runningExercise: Exercise | null = null
  private availableExercises: Exercise[] = []
  private trainingsSubs$: Subscription[] = []

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromRoot.State>
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
          this.availableExercises = exercises
          this.availableExercisesChanged.next(exercises)
          this.store.dispatch(new UI.StopLoading())
        },
        error: () => {
          this.availableExercisesChanged.next(null)
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
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedExId) || null
    if (this.runningExercise) {
      this.currentExerciseChanged.next({...this.runningExercise})
    }
  }

  getRunningExercise(): Exercise | null {
    if (this.runningExercise) {
      return {...this.runningExercise}
    }
    return null
  }

  completeExercise() {
    if (this.runningExercise) {
      this.postFinishedExerciseToDb({
        ...this.runningExercise,
        date: Timestamp.now(),
        state: 'completed'
      })
    }
    this.runningExercise = null
    this.currentExerciseChanged.next(null)
  }

  cancelExercise(progress: number) {
    if (this.runningExercise) {
      this.postFinishedExerciseToDb({
        ...this.runningExercise,
        date: Timestamp.now(),
        state: 'cancelled',
        duration: +((this.runningExercise.duration / 100 * progress).toFixed(2)),
        calories: +((this.runningExercise.calories / 100 * progress).toFixed(2))
      })
    }
    this.runningExercise = null
    this.currentExerciseChanged.next(null)
  }

  fetchFinishedExercises() {
    this.trainingsSubs$.push(this.db.collection<Exercise>('finishedExercises').valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises)
    }))
  }

  cancelAllSubs() {
    this.trainingsSubs$.forEach(sub => sub.unsubscribe())
  }

  private postFinishedExerciseToDb(exercise: Exercise) {
    this.db.collection<Exercise>('finishedExercises').add(exercise)
  }
}
