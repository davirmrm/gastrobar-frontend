import { loaded, loading, modalOpen } from "../../../layout/redux/layoutActions"


export const setDetalharProduto = e => ({
  type: 'DETALHAR_PRODUTO',
  payload: e
})


export const detalharProduto = e => {
  return dispatch => {
    dispatch([
      loading(),
      setDetalharProduto(e),
      modalOpen('detalharCardapio'),
      loaded()
    ])
  }
}
