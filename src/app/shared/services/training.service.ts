import { Injectable } from '@angular/core'
import { Exercise } from '../models'
import { Subject } from 'rxjs'

@Injectable({providedIn: 'root'})

export class TrainingService {
  runningExercise: Exercise | null = null
  exerciseChanged = new Subject<Exercise | null>()
  lastExercises: Exercise[] = []

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ]

  getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice()
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
    console.log(progress)
    if (this.runningExercise) {
      this.lastExercises.push({
        ...this.runningExercise,
        date: new Date(),
        state: 'cancelled',
        duration: this.runningExercise.duration / 100 * progress,
        calories: this.runningExercise.calories / 100 * progress
      })
    }
    this.runningExercise = null
    this.exerciseChanged.next(null)
  }

  getLastExercises() {
    return this.lastExercises.slice()
  }
}
