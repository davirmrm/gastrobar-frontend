import { AddAlert } from '../../../components'
import api from '../../../helpers/api'
import textoDefault from '../nls/pt-BR.json'

const atualizaCampoPesquisa = e => ({
  type: 'CHANGE_PESQUISA_PROVIDERS',
  payload: e
})

export const handleCampoPesquisa = e => [atualizaCampoPesquisa(e.value)]
export const campoPesquisaLimpar = e => [atualizaCampoPesquisa(''), pesquisarProviders()]

const modalOpen = e => ({
  type: 'MODAL_OPEN',
  payload: e
})

const modalClose = () => ({
  type: 'MODAL_OPEN',
  payload: ''
})

export const setCarregarProvider = e => ({
  type: 'PROVIDERS_CARREGAR',
  payload: e
})

export const setProvidersLimpar = () => ({
  type: 'PROVIDERS_LIMPAR'
})
export const modalNovo = () => [modalOpen('novo'), setProvidersLimpar()]
export const modalEditar = e => [modalOpen('editar'), setCarregarProvider(e)]
export const modalRemover = e => [modalOpen('remover'), setCarregarProvider(e)]
export const modalFechar = e => [modalClose()]

export const changeInformacao = e => ({
  type: 'CHANGE_PROVIDERS',
  payload: e
})

export const setListarProviders = e => ({
  type: 'LISTAR_PROVIDERS',
  payload: e
})

export const setAddPlataforma = e => ({
  type: 'PROVIDERS_ADD_PLATAFORMA',
  payload: e
})

export const setRemovePlataforma = e => ({
  type: 'PROVIDERS_REMOVE_PLATAFORMA',
  payload: e
})

export const listarProviders = e => {
  return dispatch => {
    api.get(`/developer/platform/manager/companies`)
    .then(resposta => {
      dispatch(setListarProviders(resposta.data))
    })
    .catch(error => {
      console.log(error, 'error listarProviders');
    })
  }
}

export const setListarCities = e => ({
  type: 'LISTAR_CITIES',
  payload: e
})

export const listarCities = e => {
  return dispatch => {
    api.get(`/developer/platform/manager/cities`)
    .then(resposta => {
      dispatch(setListarCities(resposta.data))
    })
    .catch(error => {
      dispatch(AddAlert('error', textoDefault.mensagem[error.request.response]))
    })
  }
}

export const setListarCompanyTypes = e => ({
  type: 'LISTAR_COMPANY_TYPES',
  payload: e
})

export const listarCompanyTypes = e => {
  return dispatch => {
    api.get(`/developer/platform/manager/company_types`)
    .then(resposta => {
      dispatch(setListarCompanyTypes(resposta.data))
    })
    .catch(error => {
      dispatch(AddAlert('error', textoDefault.mensagem[error.request.response]))
    })
  }
}

export const pesquisarProviders = e => {
  return dispatch => {
    api
      .get(`/colaboradores/pesquisar/${e}`)
      .then(resposta => {
        dispatch(setListarProviders(resposta.data))
      })
      .catch(error => {
        dispatch(AddAlert('error', textoDefault.mensagem[error.request.response]))
      })
  }
}

export const salvarProviders = e => {
  let contract = {
    platform_id: '',
    cities_id: [],
    started_at: '',
    expired_at: '',
  }
  let params = {
    is_active: '',
    name: '',
    type: '',
    contracts: [],
  }
  Object.keys(params).map(p=> {
    params = {...params, [p]: e[p]}
  })
  params.contracts = e.contracts.map(contract=> ({
    id: contract._id.toString(),
    platform_id: contract.platform.id,
    started_at: `${contract.started_at}  00:00:00.000000`,
    expired_at: `${contract.expired_at}  23:59:59.000000`,
    cities_id: contract.cities.map(citie=> (citie._id)),
  }))
  params.type = e.type.id;
  return dispatch => {
    api.post(`/developer/platform/manager/companies`, params)
    .then(() => {
      dispatch([
        modalFechar(), 
        AddAlert('success', 'Providers salvo com sucesso.')
      ])
    })
    .catch(error => {
      console.log(error, 'salvarProviders error')
      if (error.response.data.code) {
        dispatch(AddAlert('error', `${error.response.data.code} | ${error.response.data.message}`))
      } else {
        dispatch(AddAlert('error', `${error.response.status} | ${error.message}`))
      }
    })
  }
}

export const editarProviders = e => {
  let contract = {
    platform_id: '',
    cities_id: [],
    started_at: '',
    expired_at: '',
  }
  let params = {
    id: '',
    is_active: '',
    name: '',
    type: '',
    contracts: [],
  }
  Object.keys(params).map(p=> {
    params = {...params, [p]: e[p]}
  })
  params.contracts = e.contracts.map(contract=> ({
    id: contract._id,
    platform_id: contract.platform.platform_id,
    started_at: `${contract.started_at.slice(0, 10)}T00:00:00.177Z`,
    expired_at: `${contract.expired_at.slice(0, 10)}T23:59:59.177Z`,
    cities_id: contract.cities.map(citie=> (citie._id)),
  }))
  params.type = e.type.id
  return dispatch => {
    api.put(`/developer/platform/manager/companies`, params)
    .then(resposta => {
      dispatch([modalFechar(), AddAlert('success', 'Providers editado com sucesso.')])
    })
    .catch(error => {
      console.log(error, 'editarProviders erro')
      if (error.response.data.code) {
        dispatch(AddAlert('error', `${error.response.data.code} | ${error.response.data.message}`))
      } else {
        dispatch(AddAlert('error', `${error.response.status} | ${error.message}`))
      }
    })
  }
}

export const removerProviders = e => {
  return dispatch => {
    api
      .get(`/colaboradores/remover/${e['_id']}`)
      .then(resposta => {
        dispatch([modalFechar(), AddAlert('success', 'Providers removido com sucesso.')])
      })
      .catch(error => {
        dispatch(AddAlert('error', textoDefault.mensagem[error.request.response]))
      })
  }
}
