import { Injectable } from '@angular/core'
import { Exercise } from '../models'
import { concat, map, of, Subject, Subscription, throwError } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import firebase from 'firebase/compat/app'
import Timestamp = firebase.firestore.Timestamp
import { UIService } from './ui.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'

@Injectable({providedIn: 'root'})

export class TrainingService {
  currentExerciseChanged = new Subject<Exercise | null>()
  availableExercisesChanged = new Subject<Exercise[]>()
  finishedExercisesChanged = new Subject<Exercise[]>()
  private runningExercise: Exercise | null = null
  private availableExercises: Exercise[] = []
  private trainingsSubs$: Subscription[] = []

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private _snack: MatSnackBar,
    private router: Router
  ) {}

  fetchAvailableExercises() {
    this.uiService.showLoader()

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
          this.uiService.hideLoader()
        },
        error: () => {
          this.uiService.hideLoader()
          this._snack.open('Something went wrong.', 'Go Home Page', {duration: 3000})
            .afterDismissed()
            .subscribe(_ => {
              this.router.navigate(['/'])
          })
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
