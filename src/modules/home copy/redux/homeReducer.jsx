import {
  LISTAR_MEUS_PRODUTOS,
} from './homeActions'

const initialState = {
  meusProdutos: [],
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LISTAR_MEUS_PRODUTOS:
      return { ...state, meusProdutos: payload }
    default:
      return state
  }
}
