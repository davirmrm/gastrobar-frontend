const initialStateUsuario = { 
  is_active: true,
  name: '', 
  email: '', 
  senha: '', 
  senhaConfirm: '', 
  company: '', 
  plataforms: [] 
}
const initialStateFilter = { 
  providers: [], 
  plataformas: [],
  perfis: [] 
}
const initialState = {
  modalStatus: '',
  campoPesquisa: '',
  filter: initialStateFilter,
  usuarios: [],
  usuario: initialStateUsuario
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'MODAL_OPEN':
      return { ...state, modalStatus: payload }
    case 'LISTAR_USUARIOS':
      return { ...state, usuarios: payload }
    case 'USUARIOS_CARREGAR':
      return { ...state, usuario: payload }
    case 'USUARIOS_LIMPAR':
      return { ...state, usuario: initialState.usuario }
    case 'CHANGE_USUARIOS':
      return { ...state, usuario: { ...state.usuario, [payload.name]: payload.value } }
    case 'CHANGE_PESQUISA_COLABORADORES':
      return { ...state, campoPesquisa: payload }
    case 'CHANGE_FILTER':
      return { ...state, filter: { ...state.filter, [payload.name]: payload.value } }
    default:
      return state
  }
}
