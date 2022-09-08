
const initialStatePlataform = { 
  is_active: true,
  id: '', 
  name: '', 
}
const initialState = {
  modalStatus: '',
  campoPesquisa: '',
  plataformas: [],
  plataforma: initialStatePlataform
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'MODAL_OPEN':
      return { ...state, modalStatus: payload }
    case 'LISTAR_PLATAFORMAS':
      return { ...state, plataformas: payload }
    case 'PLATAFORMAS_CARREGAR':
      return { ...state, plataforma: payload }
    case 'PLATAFORMAS_LIMPAR':
      return { ...state, plataforma: initialState.plataforma }
    case 'CHANGE_PLATAFORMAS':
      return { ...state, plataforma: { ...state.plataforma, [payload.name]: payload.value } }
    case 'CHANGE_PESQUISA_PLATAFORMAS':
      return { ...state, campoPesquisa: payload }
    default:
      return state
  }
}
