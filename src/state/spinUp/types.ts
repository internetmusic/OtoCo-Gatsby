export const SET_CURRENT_STEP = 'SET_CURRENT_STEP'
export const SET_FAST_FEE = 'SET_FAST_FEE'
export const SET_TOTAL_COST = 'SET_TOTAL_COST'
export const SET_COMPANY_NAME = 'SET_COMPANY_NAME'
export const SET_AVAILABLE_NAME = 'SET_AVAILABLE_NAME'
export const CLEAR_AVAILABLE_NAME = 'CLEAR_AVAILABLE_NAME'
export const SET_JURISDICTION = 'SET_JURISDICTION'

interface SetCurrentStep {
  type: typeof SET_CURRENT_STEP
  payload: number
}

interface SetFastFee {
  type: typeof SET_FAST_FEE
  payload: number
}

interface SetTotalCost {
  type: typeof SET_TOTAL_COST
  payload: number
}

interface SetCompanyName {
  type: typeof SET_COMPANY_NAME
  payload: string
}

interface SetAvailableName {
  type: typeof SET_AVAILABLE_NAME
}

interface ClearAvailableName {
  type: typeof CLEAR_AVAILABLE_NAME
}

interface SetJurisdiction {
  type: typeof SET_JURISDICTION
  payload: IJurisdictionOption
}

export interface IJurisdictionOption {
  key: string
  text: string
  value: string
}

export interface ISpinUpState {
  currentStep: number
  fastFee: number
  totalCost: number
  companyName: string
  availableName: string
  jurisdictionSelected: string
  jurisdictionName: string
  jurisdictionOptions: IJurisdictionOption[]
  jurisdictionStreet: { [key: string]: string }
  error: string | undefined
}

export type SpinUpActionTypes =
  | SetCurrentStep
  | SetFastFee
  | SetTotalCost
  | SetCompanyName
  | SetAvailableName
  | ClearAvailableName
  | SetJurisdiction
