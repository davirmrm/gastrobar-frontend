export const adicionaZero = (numero) => {
  if (numero <= 9) return `0${numero}`;
  else return numero;
};

export const MaskTelefone = (valor) => {
  valor = valor || '';
  let valueNew = '';
  if (valor.length <= 10) {
    valueNew = valor
      .replace(/\D/g, '')
      .replace(/^(\d)/, '($1')
      .replace(/(.{3})(\d)/, '$1)$2')
      .replace(/(.{4})(\d)/, '$1 $2')
      .replace('-', '')
      .replace(/(\d{4})(\d)/, '$1-$2');
  } else if (valor.length > 10) {
    valueNew = valor
      .replace(/\D/g, '')
      .replace(/^(\d)/, '($1')
      .replace(/(.{3})(\d)/, '$1)$2')
      .replace(/(.{4})(\d)/, '$1 $2')
      .replace('-', '')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
  return valueNew;
};

export const MaskItemCep = (valor) => {
  let valueNew = '';
  valueNew = valor.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
  return valueNew;
};

export const MaskCpf = (valor) => {
  let valueNew = '';
  valueNew = valor
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2');

  return valueNew;
};

const lenguageList = {
  "pt-BR": { style: 'currency', currency: 'BRL' }
}
export const MaskValorMoedaex = (valor, language = "pt-BR") => {
  valor = String(valor)
  if(valor?.includes('R$ ')){
    valor = valor.replace('R$ ', '').replace('.', '').replace('.', '').replace('.', '');
  }
  valor = valor.replace('.', ',').split(',')
  const formatter = new Intl.NumberFormat(language, lenguageList[language]);
  const val = formatter.format(valor[0]);
  return val;
};

export const MaskValor = (valor, language = "pt-BR" ) => {
  let v = valor.toLocaleString(language)
  return v
}

export const removeAcento = (e) => {       
    e = e.toLowerCase();                                                         
    e = e.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    e = e.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    e = e.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    e = e.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    e = e.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    e = e.replace(new RegExp('[Ç]','gi'), 'c');
    return e;                 
}