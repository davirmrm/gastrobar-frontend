import React, { useEffect, useState } from 'react'
import { Button } from '../../button/button'
import { adicionaZero } from '../Mask'
import { IcoArrowBack } from '../../icon/back-arrow-icon'
import { IcoArrowForward } from '../../icon/forward-arrow-icon'

const dataInfo = {
    nomesDias:['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    numeroSemanas: [1, 2, 3, 4, 5],
    numeroDiasSemana: [1, 2, 3, 4, 5, 6, 7],
    nomesMeses:[
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ]
}

export function CalendarYear({ 
  name,
  label,
  action, 
  value, 
  dataInicio, 
  dataFim 
}) {
  let dataAtual = new Date()
  let dataAtualAno = dataAtual.getFullYear()
  let dataFimAno = dataFim
  let dataInicioAno = dataInicio
  const [calendarioMesAno, setcalendarioMesAno] = useState(false)
  const [dataState, setDataState] = useState({
    anoInicio: dataAtualAno - 6,
    anofim: dataAtualAno + 6,
    ano: dataAtualAno,
    anos: []
  })
console.log(dataFim, 'dataFimdataFim', dataFimAno);

  useEffect(()=>{
    let anos = []
    let anofim = dataAtualAno + 6
    let anoInicio = dataAtualAno - 6

    if (dataFim && dataAtualAno + 6 >= dataFimAno) {
      anofim = dataFimAno
      anoInicio = dataFimAno - 11
      if (dataInicio && anoInicio <= dataInicioAno) {
          anoInicio = dataInicioAno
      }
    }

    for (let i = 0; i < anofim - anoInicio + 1; i++) {
      anos = [...anos, anoInicio + i]      
    }
    setDataState({...dataState, anos, anofim, anoInicio})
  },[])

  const handleSelect = (e) => {
    action({name, value: e}, {name, message: false})
  }

  const seeMinus = (e) => {
    let anos = []
    let anofim = dataState.anos[0]
    let anoInicio = dataState.anos[0] - 11
 
    if (dataInicio && anoInicio <= dataInicioAno) {
        anoInicio = dataInicioAno
        anofim = dataInicioAno + 11 
        if (dataFim && dataState.anos[0] >= dataFimAno) {
          anofim = dataFimAno
        }
    }

    for (let i = 0; i < anofim - anoInicio + 1; i++) {
      anos = [...anos, anoInicio + i]      
    }
    setDataState({...dataState, anos, anofim, anoInicio})
  }

  const seeMore = (e) => {
    let anos = []
    let anofim = dataState.anos[dataState.anos.length] + 11
    let anoInicio = dataState.anos[dataState.anos.length]

    if (dataFim && dataAtualAno + 6 >= dataFimAno) {
      anofim = dataFimAno
      anoInicio = dataFimAno - 11
      if (dataInicio && anoInicio <= dataInicioAno) {
          anoInicio = dataInicioAno
      }
    }

    for (let i = 0; i < anofim - anoInicio + 1; i++) {
      anos = [...anos, anoInicio + i]      
    }
    setDataState({...dataState, anos, anofim, anoInicio})
  }

  return (
    <div className='box-calendario'>
      {!calendarioMesAno? <table>
        <thead>
          <tr>
            <th>
              {
                dataInicio ?
                <Button color='default' type='btn circle' onClick={() => seeMinus()} disabled={dataInicioAno <= dataState.anoInicio?false:true}>
                  <IcoArrowBack />
                </Button>
                :null
              }
            </th>
            <th colSpan='5'>
              <span style={{fontSize: '16px', padding: '5px 5px', display: 'block'}}>{label}</span>
            </th>
            <th>
              {
                dataFim ?
                <Button color='default' type='btn circle' onClick={() => seeMore()} disabled={dataFimAno >= dataState.anofim?false:true}>
                  <IcoArrowForward />
                </Button>
                :null
              }
            </th>
          </tr>        
        </thead>
        <tbody>
          <tr>
            <td colSpan='7' className='btn-meses'>
              <YearsContent
               data={dataState}
               selectYear={(e)=> handleSelect(e)}
               selected={value}
              />
            </td>
          </tr>
          <tr>
            <td colSpan='7'>
              <div className='box-btn' style={{margin: '10px 5px 5px 5px'}}>
                <Button color={'primary'} type='link' 
                  onClick={() => handleSelect('')}
                >
                  Limpar
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      :    
      <></>
      }
    </div>
  )
}

const YearsContent = ({data, selectYear, selected}) => {
  return data?.anos ? data?.anos.map((e, i) => {
    return <Button 
      key={i} color={selected === e ? 'primary' : 'default'} type='btn' 
      onClick={() => selectYear(e)} 
      style={{width: '68px'}}
    >
      {e}
    </Button>
  })
  :<>Carregando</>
}


export const CalendarioDias = ({name, dataState, dataAtual, action, value, dataInicio, dataFim, mesNovo}) => {
  var data = new Date()
  const scheduleYear = value[dataState.ano]
  const schedule = scheduleYear? scheduleYear[dataAtual.getMonth() + 2] : {}
  
  return (<>
    {dataInfo.numeroSemanas.map(s => {
      const semanaDias = () =>
      dataInfo.numeroDiasSemana.map((d) => {
          const diaAtual = dataAtual.getDate()
          const mesAtual = dataAtual.getMonth() //dataState.mes
          const anoAtual = dataAtual.getFullYear()
          dataAtual.setDate(diaAtual + 1)
          const diaAgenda = schedule? schedule[diaAtual]?schedule[diaAtual]:{}: {}

          const styleActual = () => {
            let stlA = ''
            if (data.getDate() === diaAtual && data.getMonth() === mesAtual && data.getFullYear() === anoAtual) {
              stlA = 'atual'
              action({name: name, date: `${adicionaZero(diaAtual)}/${adicionaZero(mesAtual + 1)}/${dataState.ano}`, value: diaAgenda})
            } else if(diaAgenda?.status === 'open'){
              stlA = 'disponivel'
            } else if(diaAgenda?.status === 'close'){
              stlA = 'ocupado'
            } else if(diaAgenda?.status === 'appointment'){
              stlA = 'compromisso'
            }
            return stlA
          } 

          return (
            <td
              key={`dia-${diaAtual}`}
              className={diaAtual === data.getDate() && mesAtual === data.getMonth()? 'dia-atual' : mesAtual === mesNovo ? 'mes-atual' : 'mes-aleatorio'}
            >
              <Button
                color={styleActual()}
                type='btn circle'
                action={() => action({name: name, date: `${adicionaZero(diaAtual)}/${adicionaZero(mesAtual + 1)}/${dataState.ano}`, value: diaAgenda})}
              >
                {diaAtual}
              </Button>
            </td>
          )
        })

      return <tr key={`semana-${s}`}>{semanaDias()}</tr>
    })}
  </>)
}