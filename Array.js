//Funcion normal

function verificarParImpar(numero) {
  if (numero % 2 === 0) {
    console.log("El número " + numero + " es PAR.");
  } else {
    console.log("El número " + numero + " es IMPAR.");
  }
}

//Funcion flecha

const verificarParImparArrow = (numero) => {
  if (numero % 2 === 0) {
    console.log(`El número ${numero} es PAR.`);
  } else {
    console.log(`El número ${numero} es IMPAR.`);
  }
};

//Ejemplo de uso
verificarParImpar(10);
verificarParImpar(7);

verificarParImparArrow(4);
verificarParImparArrow(9);
