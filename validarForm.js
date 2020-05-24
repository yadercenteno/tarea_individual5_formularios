window.onload=function(){
  var formulario = document.forms[0];
  //agregar manejador de evento para el formulario
  if(document.addEventListener){
    formulario.addEventListener("submit", validarFormulario);
  }
  else if(document.attachEvent){
    formulario.attachEvent("onsubmit", validarFormulario);
  }
}
function validarFormulario(event){
  var inputEmail = document.getElementById('email');

  //validar código de cliente
  var codcliente = document.getElementById("codcliente");

  if ( !(/^\d{3}-\d{3}$/.test(codcliente.value)) ) {
    alert("El formato de Código de cliente debe ser 3 numeros separados por guión seguido de 3 números más (000-000)");
    console.log("El formato de Código de cliente debe ser 3 numeros separados por guión seguido de 3 números más (000-000)");
    event.preventDefault();

    codcliente.focus();

    return false;
  }


  //validar correo electrónico
  if (!validarEmail(inputEmail.value)) {
    alert("email no valido");
    console.log("email no valido");
    event.preventDefault();//evitar que formulario se envie

    inputEmail.focus();

    return false;//dirección de correo no válida
  }

  //validar número de factura
  //formato es digito-3digitos
  var numFactura = document.getElementById("numFactura");

  if ( !(/^[a-zA-Z0-9]{1}-[a-zA-Z0-9]{3}$/.test(numFactura.value)) ) {
    alert("El formato de Número de factura debe ser 1 digito separados por guión seguido de 3 digitos números más (#-###)");
    console.log("El formato de Número de factura debe ser 1 digito separados por guión seguido de 3 digitos números más (#-###)");
    event.preventDefault();

    numFactura.focus();
    return false;
  }  


  //validar monto a pagar, solo aceptar valores en coma flotate,
  //por ejemplo: 133.30 o 1020.15
  var montoPago = document.getElementById("montoPago");
  
  if ( isNaN(montoPago.value) ) {
    alert("El monto a pagar debe ser un valor númerico");
    console.log("El monto a pagar debe ser un valor númerico");
    event.preventDefault();

    montoPago.focus();
    return false;
  }

  // Valido que el monto a pagar tenga 2 decimales
  if ( !(/^[0-9]*\.[0-9]{2}$/.test(montoPago.value)) ) {
    alert ("Por favor, ingresa un monto a pagar con 2 números decimales.");
    console.log("Por favor, ingresa un monto a pagar con 2 números decimales.");
    event.preventDefault();

    montoPago.focus();
    return false;
  }  


  //validar tarjeta de crédito
  //formato valido es 3333-3333-3333-33333
  //16 digitos en grupos de 4 separados por guión
  var numtarjeta = document.getElementById("numtarjeta");

  if ( !(/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(numtarjeta.value)) ) {
    alert("El formato del Número de tarjeta de crédito debe ser de 16 numeros en grupos de 4 separados por guión (0000-0000-0000-0000)");
    console.log("El formato del Número de tarjeta de crédito debe ser de 16 numeros en grupos de 4 separados por guión (0000-0000-0000-0000)");
    event.preventDefault();

    numtarjeta.focus();

    return false;
  }


  //validar nombre tarjeta habiente, no debe ser vacío
  var tarjetaHabiente = document.getElementById("tarjetahabiente");
  if(tarjetaHabiente.value.trim().length==0){
    console.log("tarjeta habiente no puede ser vacío");
    event.preventDefault();
    return false;
  }

  //validar fecha de experición de tarjeta
  //formato es mm-aa (dos digitos para mes, guión, dos digitos para año)
  //por ejemplo: 09-18
  var fechaexp = document.getElementById("fechaexp");

  if ( !(/^(0[1-9]|1[012])-\d{2}$/.test(fechaexp.value)) ) {
    alert("El formato de la fecha de experación de la tarjeta de crédito debe ser de dos dígitos para mes seguidos de un guión y dos dígotos para el año (mm-yy)");
    console.log("El formato de la fecha de experación de la tarjeta de crédito debe ser de dos dígitos para mes seguidos de un guión y dos dígotos para el año (mm-yy)");
    event.preventDefault();

    fechaexp.focus();

    return false;
  }


  //Si todo fue validado, retornar true
  console.log("ok");
  return true;
}
function getTarget(e){
  var target;
  if(e.target)
    target = e.target;
  else if(e.srcElement)
    target = e.srcElement;
  if(target.nodeType==3) //safari
    target = target.parentNode;

  return target;
}
function validarEmail(email){
  //expresión regular para validar correo
  var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
  return re.test(email);
}
