import {
  SET_OWN_SERIES,
  SET_MANAGE_SERIES,
  CLEAR_MANAGE_SERIES,
  SET_MANAGE_OPTION,
  SET_TOKEN_CONFIG,
  SET_TOKEN_DEPLOYED,
  SET_ENS_CONFIG,
  SET_CONTACT_FORM,
  IManagementState,
  ManagementActionTypes,
} from './types'

export const initialState = {
  manageOption: 0,
  contactForm: false,
  series: [],
}

const reducer = (
  state: IManagementState = initialState,
  action: ManagementActionTypes
): IManagementState => {
  switch (action.type) {
    case SET_OWN_SERIES:
      return {
        ...state,
        series: action.payload,
      }
    case SET_MANAGE_SERIES:
      return {
        ...state,
        managing: action.payload,
      }
    case CLEAR_MANAGE_SERIES:
      return {
        ...state,
        managing: undefined,
        ensConfig: undefined,
        tokenConfig: undefined,
        manageOption: 0,
      }
    case SET_MANAGE_OPTION:
      return {
        ...state,
        manageOption: action.payload,
      }
    case SET_TOKEN_CONFIG:
      return {
        ...state,
        tokenConfig: action.payload,
      }
    case SET_TOKEN_DEPLOYED:
      return {
        ...state,
        tokenDeployed: action.payload,
      }
    case SET_ENS_CONFIG:
      return {
        ...state,
        ensConfig: action.payload,
      }
    case SET_CONTACT_FORM:
      return {
        ...state,
        contactForm: action.payload,
      }
    default:
      return state
  }
}

export default reducer
