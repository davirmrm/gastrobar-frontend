import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from '../../components'
import { modalFechar, removerProviders } from './redux/empresasActions'

export default () => {
  const dispatch = useDispatch()
  const {modalStatus, provider} = useSelector(state => state.empresasState)

  return (
    <Modal
      title={'Remover empresa'}
      open={modalStatus === 'remover' ? true : false}
      close={() => dispatch(modalFechar())}
      closeText='Cancelar'
      size='small'
      actions={
        <>
          <Button color='danger' onClick={() => dispatch(removerProviders(provider))}>
            Remover
          </Button>
        </>
      }
    >
      <section>
        <p>Tem certeza que deseja remover esta empresa?</p>
        <p><strong>{provider.nome}</strong></p>
      </section>
    </Modal>
  )
}
