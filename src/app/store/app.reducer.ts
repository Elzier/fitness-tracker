import * as fromUI from './ui/ui.reducer'
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import { UIAction } from './ui/ui.actions'

export interface State {
  ui: fromUI.State
}

export const reducers: ActionReducerMap<State, UIAction> = {
  ui: fromUI.uiReducer
}

export const getUiState = createFeatureSelector<fromUI.State>('ui')
export const isLoading = createSelector(getUiState, fromUI.getIsLoading)
