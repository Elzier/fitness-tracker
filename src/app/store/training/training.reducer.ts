import {
  SET_AVAILABLE_EXERCISES,
  SET_FINISHED_EXERCISES,
  START_TRAINING,
  STOP_TRAINING,
  TrainingAction
} from './training.actions'
import { Exercise } from '../../shared/models'
import * as fromRoot from '../../store/app.reducer'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export interface TrainingState {
  availableExercises: Exercise[],
  finishedExercises: Exercise[],
  activeTraining: Exercise | null
}

export interface State extends fromRoot.State {
  training: TrainingState
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
}

export function trainingReducer(state = initialState, action: TrainingAction) {
  switch (action.type) {
    case SET_AVAILABLE_EXERCISES:
      return {
        ...state,
        availableExercises: action.payload
      }
    case SET_FINISHED_EXERCISES:
      return {
        ...state,
        finishedExercises: action.payload
      }
    case START_TRAINING:
      return {
        ...state,
         activeTraining: {...state.availableExercises.find(training => training.id === action.payload)}
      }
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      }
    default:
      return state
  }
}


const getTrainingState = createFeatureSelector<TrainingState>('training')

export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
)

export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercises
)

export const getIsExerciseActive = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining != null
)

export const getActiveExercise = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
)
