import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Checkbox, Input, Modal, Select, validacaoForm } from '../../components'
import { listarPlataformas } from '../plataformas/redux/plataformasActions'
import { modalFechar, editarPerfis, salvarPerfis, changeInformacao, listarModulosPerfis, listarModulosRulesPerfis } from './redux/perfisActions'
import permissoesLista from './permissoesLista.json'
import nls from './nls/pt-BR.json'

export default () => {
  const dispatch = useDispatch()
  const {modalStatus, perfil, perfisModulos, perfisModulosRules} = useSelector(state => state.perfisState)
  const {plataformas} = useSelector(state => state.plataformasState)
  const [erro, setErro] = useState({})

  useEffect(() => {
    dispatch([
      listarPlataformas(),
      listarModulosPerfis(),
      listarModulosRulesPerfis()
    ])
  }, [])
  
  useEffect(()=>{
    setErro({})
  },[modalStatus])

  const formRequired = {
    name: ''
  }
  
  const hanldeChange = (e, v) => {
    console.log(e)
    // if (e.type === 'select' && formRequired[e.name] !== undefined) {
    //   const val = validarCampo(e)
    //   setErro({...erro, [val.name]: val.message})
    // }
    if (e.type !== 'select' && formRequired[v.name] !== undefined) {
      setErro({...erro, [v.name]: v.message})
    }
    dispatch(changeInformacao(e))
  }
  
  const hanldeSalvar = (e) => {
    const valida = validacaoForm({formRequired, formValues: e})
    const valid = Object.keys(valida).filter(v=> valida[v] !== false? valida[v] : null)
    setErro(valida);
    // const newData = {...perfil, platform_id: perfil?.platform?.id};
    // console.log(newData);
    if (!valid.length) {
      if (modalStatus === 'novo') {
        dispatch(salvarPerfis(perfil))
      } else {
        dispatch(editarPerfis(perfil))
      }
    }
  }

  const permissoesHandle = e => {
    dispatch(changeInformacao(e))
  }

  return (
    <Modal
      title={modalStatus === 'novo' ? 'Novo perfil' : 'Editar perfil'}
      open={modalStatus === 'editar' || modalStatus === 'novo' ? true : false}
      close={() => dispatch(modalFechar())}
      closeText='Descartar'
      size='large'
      cy='ModalAddEditarPerfil'
      actions={
        <>
          <Button
            color='success'
            onClick={() => hanldeSalvar(perfil)}
            cy='AddEditarSalvarPerfil'
          >
            {modalStatus === 'novo' ? 'Adicionar' : 'Salvar'}
          </Button>
        </>
      }
    >
      <section className='modal-perfis'>
        <div className='content-info'>
          <div className='content-info-title'>
            <h6>Informações</h6>
            <Checkbox
              label=''
              type='switch'
              name='is_active'
              action={(e, ef) => dispatch(changeInformacao(ef))}
              checked={perfil.is_active}
              text={perfil.is_active ? 'Ativo' : 'Inativo'}
              cy='AddEditarFormPerfilIsActive'
            />
          </div>
          <div className='row'>
            <div className='col-6'>
              <Input label='Nome do perfil' name='name' 
                action={(e, ef) => hanldeChange(e, ef)}
                value={perfil.name} 
                cy='AddEditarFormPerfilName'
                required={{
                  pattern: formRequired.name,
                  erro: erro,
                  message: nls.mensagem[`obrigatorio`]
                }}
              />
            </div>
          </div>
        </div>
        <div className='content-info'>
          <div className='content-info-title'>
            <h6>Segurança</h6>
          </div>
          <div className='row'>
            <div className='col-6'>
              <Select
                label='Plataforma'
                name='platform'
                action={(e) => hanldeChange(e)}
                options={plataformas}
                selected={perfil.platform?perfil.platform:''}
                cy='AddEditarFormPerfilPlataforma'
                // optionValue='platform_id'
              ></Select>
            </div>
          </div>
          <label>Permissão</label>
          <div className='boxes-permissao'>
          {
            perfisModulos?.filter(pm=> perfil.platform?.platform_id ?
              pm.platform_id === perfil.platform?.platform_id 
              : perfil.platform?.id ?
              pm.platform_id === perfil.platform?.id
               :  pm.name === perfil.plataformName)?.map((item, i) => {
              // permissoesLista[perfil.plataforma?.platform_id]?.map(item => {
              // const permissoes = perfisModulosRules.filter(f=> f.module_id === item.module_id)
              return <div key={`seguranca-${item.platform_id}-${i}`}>
                {/* <RadioButton
                  name='type'
                  action={e => permissoesHandle(e)}
                  checked={perfil.permissoes?.type?perfil.permissoes.type:[]}
                  options={[{name: item.name, id: item.id}]}
                  cy='AddEditarFormPerfilPlataPermissao'
                /> */}
                {/* <Checkbox
                  type='checkbox list'
                  name='type'
                  action={(e, ef) => permissoesHandle(ef)}
                  checked={perfil.rules?.type?perfil.rules.type:[]}
                  options={[{name: item.name, id: item.module_id}]}
                  cy='AddEditarFormPerfilPlataPermissao'
                /> */}
                <h4>{item.name}</h4>
                <div>
                  <Checkbox
                    type='checkbox list'
                    name='rules'
                    action={(e, ef) => permissoesHandle(ef)}
                    checked={perfil.rules?perfil.rules:[]}
                    options={item.rules}
                    cy='AddEditarFormPerfilPlataPermissaoItem'
                  />
                </div>
              </div>
            })
          }
          </div>
        </div>
      </section>
    </Modal>
  )
}
