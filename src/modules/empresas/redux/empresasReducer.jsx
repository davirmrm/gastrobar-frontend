const initialStateProviderSeguranca = {
  _id: '',
  plataform: {},
  started_at: '',
  expired_at: '',
  cities: [],
  states: [],
}
const initialStateProvider = { 
  is_active: true,
  id: '', 
  name: '', 
  type: '', 
  usuariosAtivos: '', 
  totalUsuarios: '', 
  contracts: []
}
const initialState = {
  modalStatus: '',
  campoPesquisa: '',
  providers: [],
  cidades: [],
  companyTypes: [],
  provider: initialStateProvider
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'MODAL_OPEN':
      return { ...state, modalStatus: payload }
    case 'LISTAR_CITIES':
      return { ...state, cidades: payload }
    case 'LISTAR_PROVIDERS':
      return { ...state, providers: payload }
    case 'LISTAR_COMPANY_TYPES':
      return { ...state, companyTypes: payload }
    case 'PROVIDERS_CARREGAR':
      return { ...state, provider: payload }
    case 'PROVIDERS_LIMPAR':
      return { ...state, provider: initialStateProvider }
    case 'CHANGE_PROVIDERS':
      return { ...state, provider: { ...state.provider, [payload.name]: payload.value } }
    case 'CHANGE_PESQUISA_PROVIDERS':
      return { ...state, campoPesquisa: payload }
    case 'PROVIDERS_ADD_PLATAFORMA':
      return { ...state, provider: { ...state.provider, contracts: [ ...state.provider.contracts?state.provider.contracts:[], {...initialStateProviderSeguranca, _id: Math.floor(Math.random() * 3000)}] } }
    case 'PROVIDERS_REMOVE_PLATAFORMA':
      return { ...state, provider: { ...state.provider, contracts: state.provider.contracts?.filter(e=> e._id !== payload) } }
    default:
      return state
  }
}