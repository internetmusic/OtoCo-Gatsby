import {
  SET_CURRENT_STEP,
  SET_AVAILABLE_NAME,
  CLEAR_AVAILABLE_NAME,
  SET_COMPANY_NAME,
  SET_FAST_FEE,
  SET_TOTAL_COST,
  SET_JURISDICTION,
  SpinUpActionTypes,
  ISpinUpState,
} from './types'

export const initialState = {
  loading: false,
  currentStep: 0,
  fastFee: 0,
  totalCost: 0,
  companyName: '',
  availableName: '',
  jurisdictionSelected: 'us_de',
  jurisdictionName: 'Delaware',
  jurisdictionOptions: [
    {
      key: '0',
      text: 'Delaware',
      value: 'us_de',
    },
    {
      key: '1',
      text: 'Wyoming',
      value: 'us_wy',
    },
  ],
  jurisdictionStreet: {
    us_de: '1201 N. Orange Street, Suite 7160, Wilmington, 19801 Delaware.',
    us_wy: '30 N. Gould St Ste R, Sheridan, 82801 Wyoming',
  },
  error: undefined,
}

const reducer = (
  state: ISpinUpState = initialState,
  action: SpinUpActionTypes
): ISpinUpState => {
  switch (action.type) {
    case SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload,
      }
    case SET_FAST_FEE:
      return {
        ...state,
        fastFee: action.payload,
      }
    case SET_TOTAL_COST:
      return {
        ...state,
        totalCost: action.payload,
      }
    case SET_COMPANY_NAME:
      return {
        ...state,
        companyName: action.payload,
      }
    case SET_AVAILABLE_NAME:
      return {
        ...state,
        availableName: state.companyName,
      }
    case CLEAR_AVAILABLE_NAME:
      return {
        ...state,
        availableName: '',
      }
    case SET_JURISDICTION:
      return {
        ...state,
        jurisdictionName: action.payload.text,
        jurisdictionSelected: action.payload.value,
      }
    default:
      return state
  }
}

export default reducer
