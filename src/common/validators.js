const checked = (value,options)=>{
  if(value!==true){
    return options.message || 'Debe ser checked'
  }
}

const keyPressNumeric = (code)=>{
  if(code!==undefined){
    return true
  }
}

const MontoDecimal = (x)=>{
  if(x!==undefined)
    return Number.parseFloat(x).toFixed(2);
}


export default {
  checked,
  keyPressNumeric,
  MontoDecimal
}
