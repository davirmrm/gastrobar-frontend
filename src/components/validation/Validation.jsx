/* eslint-disable no-useless-escape */
const typePatern = {
  phone: /\([0-9]{2}\) [0-9]{4,7}-[0-9]{4,5}$/,
  email: /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g,
  ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  number: /[0-9]+$/,
  senha: {
    especial: `/^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{1,20}$/`,
    maiuscula: `/^(?=.*[A-Z])[@!#$%^&*()/\\a-zA-Z0-9]{1,20}$/`
  }
}

export const validacaoCampo = ({ valor, name, pattern }) => {
  if (pattern?.search('type') !== -1) {
    pattern = JSON.parse(pattern)
  }
  
  if (typeof valor === 'object' && pattern === 'select') {
    if (valor && Object.keys(valor).length === 0 ) {
      return { name: name, message: 'vazio' }
    } else {
      return { name: name, message: false }
    }
  } else if (valor && typeof valor === 'object' && pattern === 'multiselect') {
    if (valor.length === 0 ) {
      return { name: name, message: 'vazio' }
    } else {
      return { name: name, message: false }
    }
  } 
  // else if (valor === undefined) {
  //   return { name: name, message: 'vazio' }
  // }
  if ( typeof pattern === 'object' && pattern.type === 'number' ) {
    return {name: name, message: validarNumber({ valor, max: pattern.max, min: pattern.min })}
  } else if ( typeof pattern === 'object' && pattern.type === 'date' ) {
    return {name: name, message: validarData({ valor, max: pattern.max, min: pattern.min })}
  } else if ( typeof pattern === 'string' && pattern === 'cpf' ) {
    return {name: name, message: validarCPF(valor)}
  } else if (valor?.search(typePatern[pattern] ? typePatern[pattern] : pattern) === -1) {
    return {name: name, message: 'regex'}
  } else {
    return {name: name, message: false}
  }
}

export const validarCampo = e => {
  const valor = e.value
  const { name, pattern } = e
  if (!valor) {
    return { name: name, message: 'vazio' }
  }
  return validacaoCampo({ valor, name, pattern })
}

export const validacaoForm = e => {
  let erro = {}

  const pattern = e => {
    if (typeof e === 'object') {
      return JSON.stringify(e)
    } else if (typeof e === 'string') {
      return e
    } else {
      return ''
    }
  }

  for (const name in e.formRequired) {
    if (e.formRequired[name]) {
      let valForm = validacaoCampo({ valor: e.formValues[name], name, pattern: pattern( e.formRequired[name] ) })
      erro = { ...erro, [name]: valForm.message }
    } else {
      erro = { ...erro, [name]: !e.formValues[name] }
    }
  }
  return erro
}



export const validarCPF = (e) =>{
  if (typeof e !== "string") return 'invalido'
  e = e.replace(/[\s.-]*/igm, '')
  if (
      !e ||
      e.length !== 11 ||
      e === "00000000000" ||
      e === "11111111111" ||
      e === "22222222222" ||
      e === "33333333333" ||
      e === "44444444444" ||
      e === "55555555555" ||
      e === "66666666666" ||
      e === "77777777777" ||
      e === "88888888888" ||
      e === "99999999999" 
  ) {
      return 'invalido'
  }
  var soma = 0
  var resto
  for (var i = 1; i <= 9; i++) 
      soma = soma + parseInt(e.substring(i-1, i)) * (11 - i)
  resto = (soma * 10) % 11
  if ((resto === 10) || (resto === 11)) resto = 0
  if (resto !== parseInt(e.substring(9, 10)) ) return 'invalido'
  soma = 0
  for (var n = 1; n <= 10; n++)
    soma = soma + parseInt(e.substring(n-1, n)) * (12 - n)
  resto = (soma * 10) % 11
  if ((resto === 10) || (resto === 11)) resto = 0
  if (resto !== parseInt(e.substring(10, 11) ) ) return 'invalido'
  return false
}

export const validarData = (e) =>{
  const dmin = new Date(e.min);
  const dmax = new Date(e.max);
  const de = new Date(e.valor);
  if(de < dmin) return 'menor';
  if(de > dmax) return 'maior';
  return false;
}

export const validarNumber = (e) =>{
  if( Number(e.valor) < Number(e.min) ) return 'menor';
  if( Number(e.valor) > Number(e.max) ) return 'maior';
  return false;
}