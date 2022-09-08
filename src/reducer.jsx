import { combineReducers } from 'redux'
import alerts from './components/alert/alertsRedux'
import layoutState from './layout/redux/layoutReducer'
import colaboradoresState from './modules/colaboradores/redux/colaboradoresReducer'
import empresasState from './modules/empresas/redux/empresasReducer'
import perfisState from './modules/perfis/redux/perfisReducer'
import plataformasState from './modules/plataformas/redux/plataformasReducer'

export const rootReducer = combineReducers({
  alerts,
  layoutState,

  colaboradoresState,
  empresasState,
  perfisState,
  plataformasState,
})

export default rootReducer
