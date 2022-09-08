import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { Loading } from './components';
import { history } from './helpers/history';
import AuthLayout from './layout/layout';
import { loged } from './layout/redux/layoutActions';
import colaboradores from './modules/colaboradores/colaboradores';
import empresas from './modules/empresas/empresas';

import Home from './modules/home/home'
import login from './modules/login/login';
import recuperar from './modules/login/recuperar';
import recuperarSenha from './modules/login/recuperarSenha';
import perfis from './modules/perfis/perfis';
import plataformas from './modules/plataformas/plataformas';

import homePublic from './modulesPublic/home/home'
import cardapioPublic from './modulesPublic/cardapio/cardapio'
import sobrePublic from './modulesPublic/sobre/sobre'


const PrivateRoute = ({ component: Component, path }) => {
  const dispatch = useDispatch()
  const logInStorage = sessionStorage.token
  const { logIn } = useSelector(state => state.layoutState)

  useEffect(() => {
    dispatch([loged()])
  }, [])

  if (!logIn || !logInStorage) {
    history.push('/')
    return <></>;
  } else {
    return (
      <Route
        exact
        path={path}
        render={props =>
          <AuthLayout>
            <Component {...props} />
          </AuthLayout>
        }
      />
    )
  }

}

export default () => {
  const { load } = useSelector(state => state.layoutState)
  return (
    <Router history={history}>
      {load? <Loading /> :null}
      <Switch>
        <Route exact path='/login' component={login} />
        <Route exact path='/recuperar' component={recuperar} />
        <Route exact path='/recuperar/senha' component={recuperarSenha} />
        <Route exact path='/recuperar/senha/:idUser' component={recuperarSenha} />

        <Route exact path='/' component={homePublic} />
        <Route exact path='/cardapio' component={cardapioPublic} />
        <Route exact path='/sobre' component={sobrePublic} />

        <PrivateRoute path='/home' exact component={Home} />
        <PrivateRoute path='/colaboradores' exact component={colaboradores} />
        <PrivateRoute path='/empresas' exact component={empresas} />
        <PrivateRoute path='/perfis' exact component={perfis} />
        <PrivateRoute path='/plataformas' exact component={plataformas} />
      </Switch>
    </Router>
  )
}
