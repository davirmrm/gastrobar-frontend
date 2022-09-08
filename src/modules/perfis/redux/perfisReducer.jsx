const initialStatePerfil = { 
  is_active: true,
  id: '', 
  name: '', 
  platform: {},
  rules: []
}
const initialState = {
  modalStatus: '',
  campoPesquisa: '',
  perfis: [],
  perfisModulos: [],
  perfisModulosRules: [],
  perfil: initialStatePerfil
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'MODAL_OPEN':
      return { ...state, modalStatus: payload }
    case 'LISTAR_PERFIS':
      return { ...state, perfis: payload }
    case 'LISTAR_MODULOS_PERFIS':
      return { ...state, perfisModulos: payload }
    case 'LISTAR_MODULOS_RULES_PERFIS':
      return { ...state, perfisModulosRules: payload }
    case 'PERFIS_CARREGAR':
      return { ...state, perfil: payload }
    case 'PERFIS_LIMPAR':
      return { ...state, perfil: initialState.perfil }
    case 'CHANGE_PERFIS':
      return { ...state, perfil: { ...state.perfil, [payload.name]: payload.value } }
    case 'CHANGE_PESQUISA_PERFIS':
      return { ...state, campoPesquisa: payload }
    default:
      return state
  }
}
