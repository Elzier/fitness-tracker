import { Action } from '@ngrx/store'
import { Exercise } from '../../shared/models'

export const SET_AVAILABLE_EXERCISES = '[TRAINING] Set available exercises'
export const SET_FINISHED_EXERCISES = '[TRAINING] Set finished exercises'
export const START_TRAINING = '[TRAINING] Start training'
export const STOP_TRAINING = '[TRAINING] Stop training'

export class SetAvailableExercises implements Action {
  readonly type = SET_AVAILABLE_EXERCISES
  constructor(public payload: Exercise[]) {}
}

export class SetFinishedExercises implements Action {
  readonly type = SET_FINISHED_EXERCISES
  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING
  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING
}

export type TrainingAction = SetAvailableExercises | SetFinishedExercises | StartTraining | StopTraining
