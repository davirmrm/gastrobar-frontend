import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './colaboradores.scss'
import {
  Button,
  Checkbox,
  IcoBin,
  IcoClose,
  IcoFilter,
  IcoPencil,
  IcoSearch,
  Input,
  List,
  ModalRight,
  Paginate,
  removeAcento,
  Select
} from '../../components'

import {
  campoPesquisaLimpar,
  pesquisarUsuarios,
  modalEditar,
  modalNovo,
  modalRemover,
  listarColaboradores,
  handleCampoPesquisa
} from './redux/colaboradoresActions'
import NovoEditar from './colaboradoresNovoEditar'
import Remover from './colaboradoresRemover'
import Filtros from './filtros'
import nls from './nls/pt-BR.json'

export default () => {
  const dispatch = useDispatch()
  
  const {modalStatus, campoPesquisa, usuarios} = useSelector(state => state.colaboradoresState)
  const [sidebar, setSidebar] = useState(false)
  const [actionCheck, setActionCheck] = useState({})
  const [usuariosList, setUsuariosList] = useState({})

  useEffect(() => {
    dispatch(listarColaboradores())
  }, [modalStatus])

  useEffect(() => {
    setUsuariosList(usuarios)
  }, [usuarios])

  const handleCheckboxActionAll = e => {
    let checkAll = {}
    usuarios.map(p=> {
      checkAll = {...checkAll, [p.id]: e}
    })
    setActionCheck({...checkAll, all: e})
  }

  const listAcoes = [
    {
      id: 'ativar',
      name: 'Ativar'
    },
    {
      id: 'inativar',
      name: 'Inativar'
    }
  ]

  const nSelecionados = e => {
    let numeroS = 0
    Object.keys(e).map(n=> {
      numeroS =  n !== 'all' && e[n] === true ? numeroS + 1 : numeroS
    })
    return numeroS
  }

  const limparUsuariosList = e => {
    setUsuariosList(usuarios)
    dispatch(campoPesquisaLimpar())
  }

  const pesquisarUsuariosList = e => {
    const userList = usuarios.filter(u=> removeAcento(u.name).search(removeAcento(e)) !== -1)
    console.log(userList, 'userListuserList');
    setUsuariosList(userList)
  }

  const headDefault = [
    {
      column: 'selecione',
      text: <>
        <Checkbox
          label=''
          name='all'
          action={a => handleCheckboxActionAll(a)}
          checked={actionCheck.all}
          text=''
          cy='formProvidersStatus'
        />
        {
          nSelecionados(actionCheck) ?
          <div className='select-action-list'>
            <Select
              name='acoes'
              action={e => handleCheckboxActionAll(false)}
              options={listAcoes}
              selectedItem={false}            
              textCustom={['Ações']}
              selected={''}
              optionCustom={e=> (<><span className={e.id}></span> {e.name}</>)}
              cy='AcoesList'
            />
            <span>
              {`${nSelecionados(actionCheck)} ${nSelecionados(actionCheck) > 1 ? 'itens selecionados' : 'item selecionado'}`} 
            </span>
          </div>
          :null
        }
      </>,
      className: 'actions'
    },
    {
      column: 'name',
      text: 'Nome',
      className: ''
    },
    {
      column: 'email',
      text: 'E-mail',
      className: ''
    },
    {
      column: 'company_name',
      text: 'Empresa',
      className: ''
    },
    {
      column: 'plataformOffice',
      text: 'Plataforma/Perfil',
      className: ''
    },
    // {
    //   column: 'lastAcess',
    //   text: 'Último acesso',
    //   className: ''
    // },
    {
      column: 'statusCustom',
      text: '',
      className: 'actions'
    },
    {
      column: 'acoes',
      text: '',
      className: 'actions'
    }
  ]

  return (
    <>
      <div className='box-colaboradores'>
        <div className='box-titulo'>
          <h2 className='titulo'>{nls.title}</h2>
          <Button color='primary' type='btn' size='small' 
            onClick={() => dispatch(modalNovo('novo'))} 
            title='Novo'
          >
            Adicionar
          </Button>
        </div>
        <div className='box-content-list'>
          <div className='box-pesquisa'>
            <div>
              <Input label='' name='input' 
                action={e => dispatch(handleCampoPesquisa(e))} 
                value={campoPesquisa}
                cy='pesquisarUsuarios'
                placeholder='Procurar...'
                right={
                  <>
                    {campoPesquisa ? (
                      <Button type='link' 
                        onClick={e => limparUsuariosList()} title='Limpar'
                        // onClick={e => dispatch(campoPesquisaLimpar())} title='Limpar'
                      >
                        <IcoClose />
                      </Button>
                    ) : null}

                    <Button
                      onClick={e => pesquisarUsuariosList(campoPesquisa)}
                      // onClick={e => dispatch(pesquisarUsuarios(campoPesquisa))}
                      title={nls.pesquisar}
                      type='link'
                      disabled={campoPesquisa ? false : true}
                    >
                      <IcoSearch />
                    </Button>
                  </>
                }
              />
            </div>
            <div>
              <Button color='default' type='btn' onClick={() => setSidebar(true)} title='Novo'>
                <IcoFilter cy='FiltrosUsuario' /> Filtrar
              </Button>
            </div>
          </div>
          <List
            header={headDefault}
            data={usuariosList.length?usuariosList:[]}
            cy='tableUsusarios'
            listCustom={(e) => {
              const custom = e
              custom.selecione = <Checkbox
                label=''
                name='status'
                action={a => setActionCheck({...actionCheck, [e.id]: !actionCheck[e.id]})}
                checked={actionCheck?.[e.id]}
                text=''
                cy='formUsuarioStatus'
              />
              custom.statusCustom = <Checkbox
                label=''
                type='switch'
                name='is_active'
                // action={a => dispatch(changeInformacao(a))}
                checked={e.is_active}
                text=''
                cy='formUsuarioIsActive'
              />
              custom.plataformOffice = e.profiles?.map((p, i)=>{
                return <span key={`${e.id}-profiles-${p.id?p.id:i}`}> {i>=1?'/':''} {`${p.platform.name}-${p.name}`} </span>
              })
              custom.company = e.company_id?{id: e.company_id, name: e.company_name}:{}
              custom.acoes = (
                <div className='acoes'>
                  <Button color='primary' type='btn circle' 
                    onClick={() => dispatch(modalEditar(e))} 
                    title='Editar'
                  >
                    <IcoPencil cy='EditarUsuario' />
                  </Button>
                  {/* <Button color='danger' type='btn circle' 
                    onClick={() => dispatch(modalRemover(e))} 
                    title='Remover'
                  >
                    <IcoBin cy='removeUsuario' />
                  </Button> */}
                </div>
              )
              return custom
            }}
          />
          <Paginate
            data={{ 
              pageNumber: 0, 
              totalPages: 1, 
              totalElements: usuarios.length 
            }}
          />
        </div>
      </div>
      <ModalRight
         open={sidebar}
        //  style={{ height: `calc(100vh - 0px)`, width: '260px', top: `0px` }}
         action={ (e)=> setSidebar(e)}
         title='Filtros'
      >
        <Filtros acaoFiltros={(e) => setSidebar(e)} />
      </ModalRight>
      <NovoEditar />
      <Remover />
    </>
  )
}
