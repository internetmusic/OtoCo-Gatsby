import {
  SET_OWN_SERIES,
  SET_MANAGE_SERIES,
  CLEAR_MANAGE_SERIES,
  SET_MANAGE_SECTION,
  SET_CONTACT_FORM,
  IManagementState,
  ManagementActionTypes,
} from './types'

export const initialState = {
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
        section: undefined,
        token: {},
        ens: {},
        multisig: {},
      }
    case SET_MANAGE_SECTION:
      return {
        ...state,
        section: action.payload,
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
