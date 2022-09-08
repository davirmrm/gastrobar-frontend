import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Modal } from '../../components'
import { modalOpen } from '../../layout/redux/layoutActions'

export default () => {
  const dispatch = useDispatch()
  const { statusModal } = useSelector(state => state.layoutState)
  return (
    <Modal
      title={'Sair'}
      size='medium'
      open={statusModal === 'detalharCardapio' ? true : false}
      close={() => dispatch(modalOpen(''))}
      closeText='Cancelar'
      actions={
        <></>
      }
    >
      Tem certeza que deseja sair da aplicação?
    </Modal>
  )
}
