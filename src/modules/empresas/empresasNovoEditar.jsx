import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Checkbox, Input, Modal, Select, IcoAdd, IcoBin, validacaoForm, validarCampo, removeAcento } from '../../components'
import { listarPlataformas } from '../plataformas/redux/plataformasActions'
import { modalFechar, editarProviders, salvarProviders, changeInformacao, setAddPlataforma, setRemovePlataforma, listarCities, listarCompanyTypes } from './redux/empresasActions'
import estadosList from './estados.json'
import nls from './nls/pt-BR.json'

export default () => {
  const dispatch = useDispatch()
  const {modalStatus, provider, cidades, companyTypes} = useSelector(state => state.empresasState)
  const {plataformas} = useSelector(state => state.plataformasState)
  const [erro, setErro] = useState({})
  // const [estados, setestados] = useState([])
  // const [cidades, setcidades] = useState([])

  useEffect(()=>{
    // setestados(estadosList.states)
    // setcidades(estadosList.cities)
  }, [])
  
  const tipos = [
    {
      id: 'interno',
      name: 'Interno'
    },
    {
      id: 'externo',
      name: 'Externo'
    },
    {
      id: 'cliente',
      name: 'Cliente'
    },
    {
      id: 'teste',
      name: 'Teste'
    }
  ]
  
  useEffect(() => {
    dispatch([
      listarPlataformas(),
      listarCities(),
      listarCompanyTypes()
    ])
  }, [])
  
  useEffect(()=>{
    setErro({})
  },[modalStatus])

  const formRequired = {
    name: '',
    type: 'select'
  }
  
  const hanldeChange = (e, v) => {
    if (e.type === 'select' && formRequired[e.name] !== undefined) {
      const val = validarCampo(e)
      setErro({...erro, [val.name]: val.message})
    }
    if (e.type !== 'select' && formRequired[v.name] !== undefined) {
      setErro({...erro, [v.name]: v.message})
    }
    dispatch(changeInformacao(e))
  }
  
  const hanldeSalvar = (e) => {
    const valida = validacaoForm({formRequired, formValues: e})
    const valid = Object.keys(valida).filter(v=> valida[v] !== false? valida[v] : null)
    setErro(valida)
    if (!valid.length) {
      if (modalStatus === 'novo') {
        dispatch(salvarProviders(provider))
      } else {
        dispatch(editarProviders(provider))
      }
    }
  }

  const contractHandle = (e, id) => {
    let ajustResult = provider.contracts.map(s=> {
      return s._id === id ? {...s, [e.name]: e.value} : s
    })
    dispatch(changeInformacao({name: 'contracts', value: ajustResult}))
  }

  const selectEstado = e => {
    let listCity = estadosList.cities.filter(c=> {
      const IsActive = e.filter(d=> c.state_id === Number(d.code) )
      if (IsActive.length) {
        return c
      }
    })
    setcidades(listCity)
  }

  // const selectFilterEstado = e => {
  //   let listStates = estadosList.states.filter(c=> {
  //     return removeAcento(c.name).includes(removeAcento(e.value))
  //   })
  //   setestados(listStates)
  // }

  // const selectFilterCidade = e => {
  //   let listCity = estadosList.cities.filter(c=> {
  //     return removeAcento(c.name).includes(removeAcento(e.value))
  //   })
  //   setcidades(listCity)
  // }

  return (
    <Modal
      title={modalStatus === 'novo' ? 'Novo empresa' : 'Editar empresa'}
      open={modalStatus === 'editar' || modalStatus === 'novo' ? true : false}
      close={() => dispatch(modalFechar())}
      closeText='Descartar'
      size='large'
      actions={
        <>
          <Button
            color='success'
            onClick={() => hanldeSalvar(provider)}
          >
            {modalStatus === 'novo' ? 'Adicionar' : 'Salvar'}
          </Button>
        </>
      }
    >
      <section className='modal-provider'>
        <div className='content-info'>
          <div className='content-info-title'>
            <h6>Informações</h6>
            <Checkbox
              label=''
              type='switch'
              name='is_active'
              action={(e, ef) => dispatch(changeInformacao(ef))}
              checked={provider.is_active}
              text={provider.is_active ? 'Ativo' : 'Inativo'}
              cy='formUsuarioIsActive'
            />
          </div>
          <div className='row'>
            <div className='col-6'>
              <Input label='Nome da empresa' name='name' 
                action={(e, ef) => hanldeChange(e, ef)}
                value={provider.name} 
                cy='formUsuarioNome'
                required={{
                  pattern: formRequired.name,
                  erro: erro,
                  message: nls.mensagem[`obrigatorio`]
                }}
              />
            </div>
            <div className='col-6'>
              <Select
                label='Tipo'
                name='type'
                action={(e) => hanldeChange(e)}
                options={companyTypes}
                selected={provider.type?provider.type:''}
                cy='formUsuarioType'
                // filter={{
                //   clean: <IcoClose />,
                //   text: <IcoSearch />,
                //   title: 'Filtrar'
                // }}
                required={{
                  pattern: formRequired.type,
                  erro: erro,
                  message: nls.mensagem[`obrigatorio`]
                }}
              ></Select>
            </div>
          </div>
        </div>
        <div className='content-info'>
          <div className='content-info-title'>
            <h6>Segurança</h6>
          </div>
          <div className='box-permissoes-providers'>
            {
              provider.contracts?.map((contract, i)=> {
                contract.platform = contract.platform?contract.platform:contract.platform_id?{platform_id: contract.platform_id, name: contract.platform_name}:{}
                return (
                  <div className='row' key={`contract-${contract?._id}-${i}`}>
                    <div className='col-6'>
                      <Select
                        label='Plataforma'
                        name='platform'
                        action={(e) => contractHandle(e, contract._id)}
                        options={plataformas}
                        selected={contract.platform?contract.platform:{}}
                        // optionValue='platform_id'
                        cy='formUsuarioPlataforma'
                      ></Select>
                    </div>
                    <div className='col-3'>
                      <Input type='date' label='Data de ínicio' name='started_at' 
                        action={(e) => contractHandle(e, contract._id)}
                        value={contract.started_at.slice(0, 10)} 
                        cy='formUsuarioDataInicio'
                      />
                    </div>
                    <div className='col-3'>
                      <Input type='date' label='Data final' name='expired_at'
                        action={(e) => contractHandle(e, contract._id)}
                        value={contract.expired_at.slice(0, 10)} 
                        cy='formUsuarioDataFFim'
                      />
                    </div>
                    {/* <div className='col-5'>
                      <Select
                        label='Estados'
                        name='states'
                        action={(e) => [
                          contractHandle(e, contract.id),
                          selectEstado(e.value)
                        ]}
                        options={estados}
                        multiSelect
                        selected={contract.states?contract.states:[]}
                        optionValue='code'
                        cy='formUsuarioEstados'
                        filter={true}
                        actionFilter={(o, e)=> {
                          selectFilterEstado(e)
                        }}
                      ></Select>
                    </div> */}
                    <div className='col-6'>
                      <Select
                        label='Cidade'
                        name='cities'
                        action={(e) => contractHandle(e, contract._id)}
                        options={cidades}
                        multiSelect
                        selected={contract.cities}
                        cy='formUsuarioCidade'
                        optionValue='_id'
                        // filter={true}
                        // actionFilter={(o, e)=> {
                        //   selectFilterCidade(e)
                        // }}
                      ></Select>
                    </div>
                    <div className='col-6'>
                      <div className='box-btn mt-35'>
                        <Button
                          color='danger'
                          variant='outlined'
                          size='small'
                          onClick={() =>
                            dispatch(setRemovePlataforma(contract._id))
                          }
                        >
                          <IcoBin />
                        </Button>
                      </div>
                    </div>
                  </div>)
              })
            }
          </div>
          <div className=''>
            <Button
              color='success'
              variant='outlined'
              size='small'
              onClick={() =>
                dispatch(setAddPlataforma())
              }
            >
              <IcoAdd /> Adicionar plataforma
            </Button>
          </div>
        </div>
      </section>
    </Modal>
  )
}
