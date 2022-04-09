import { Injectable } from '@angular/core'
import { Exercise } from '../models'
import { map, Subject } from 'rxjs'
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Injectable({providedIn: 'root'})

export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>()
  exercisesChanged = new Subject<Exercise[]>()
  private runningExercise: Exercise | null = null
  private lastExercises: Exercise[] = []
  private availableExercises: Exercise[] = []

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.db.collection('availableExercises').snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...<Object>doc.payload.doc.data()
          } as Exercise
        })
      })).subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises
        this.exercisesChanged.next(exercises)
    })
  }

  selectExercise(selectedExId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedExId) || null
    if (this.runningExercise) {
      this.exerciseChanged.next({...this.runningExercise})
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
      this.lastExercises.push({
        ...this.runningExercise,
        date: new Date(),
        state: 'completed'
      })
    }
    this.runningExercise = null
    this.exerciseChanged.next(null)
  }

  cancelExercise(progress: number) {
    if (this.runningExercise) {
      this.lastExercises.push({
        ...this.runningExercise,
        date: new Date(),
        state: 'cancelled',
        duration: +((this.runningExercise.duration / 100 * progress).toFixed(2)),
        calories: +((this.runningExercise.calories / 100 * progress).toFixed(2))
      })
    }
    this.runningExercise = null
    this.exerciseChanged.next(null)
  }

  getLastExercises() {
    return this.lastExercises.slice()
  }
}
