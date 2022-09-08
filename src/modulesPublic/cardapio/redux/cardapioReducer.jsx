const initialState = {
  detalharProduto: [],
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'DETALHAR_PRODUTO':
      return { ...state, detalharProduto: payload }
    default:
      return state
  }
}
