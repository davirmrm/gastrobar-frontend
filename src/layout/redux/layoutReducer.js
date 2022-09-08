import React from 'react'

const logIn = sessionStorage.token
const userStorage = sessionStorage.user
const user = userStorage?JSON.parse(userStorage):{}
const prefBrowser = {language: navigator.language === 'pt-PT' || navigator.language === 'pt-BR' ? {id: 'pt-BR', name: 'Português'} : {id: 'en-US', name: 'English'}}
const preferencias = user?.preferencias?user.preferencias:prefBrowser

const initialState = {
  load: false,
  logIn: true,
  logIn: logIn ? true : false,
  sidebarRight: false,
  sidebarLeft: false,
  statusModal: '',
  infoUser: {},
  usuario: user?user:{ nome: '', email: '' },
  preferencias: {...preferencias, modoCor: {}},
  listas: {
    idiomas: [
      {
        id: 'pt-BR',
        name: 'Português'
      },
      {
        id: 'en-US',
        name: 'English'
      }
    ],
    modoCores: [
      {
        id: 'claro',
        name: 'Claro'
      },
      {
        id: 'escuro',
        name: 'Escuro'
      }
    ]
  },
  erro: {},
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOADING':
      return { ...state, load: payload }
    case 'LOG_IN':
      return { ...state, logIn: payload }
    case 'USUARIO_LOGADO_CARREGAR':
      return { ...state, usuario: payload }
    case 'USUARIO_LOGADO_PREFERENCIAS':
      return { ...state, preferencias: {...state.preferencias, ...payload} }
    case 'SIDEBAR_LEFT':
      return { ...state, sidebarLeft: payload }
    case 'SIDEBAR_RIGHT':
      return { ...state, sidebarRight: payload }
    case 'MODAL_OPEN':
      return { ...state, statusModal: payload }
    case 'INFO_USER':
      return { ...state, infoUser: payload }
    case 'VALIDACAO':
      return { ...state, erro: payload }
    default:
      return state
  }
}
