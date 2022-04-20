import { Action } from '@ngrx/store'

export const START_LOADING = '[UI] Start loading'
export const STOP_LOADING = '[UI] Stop loading'
export const AUTH_CHECKED = '[UI] Show auth content'

export class StartLoading implements Action {
  readonly type = START_LOADING
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING
}

export class AuthChecked implements Action {
  readonly type = AUTH_CHECKED
}


export type UIAction = StartLoading | StopLoading | AuthChecked
