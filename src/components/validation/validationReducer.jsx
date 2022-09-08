import {
  VALIDAR_CAMPO,
  VALIDAR_CAMPOS,
  RESETAR_VALIDACAO,
} from './validationActions';

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case VALIDAR_CAMPO:
      return { ...state, [payload.name]: payload.message };
    case VALIDAR_CAMPOS:
      return payload;
    case RESETAR_VALIDACAO:
      return initialState;
    default:
      return state;
  }
};
