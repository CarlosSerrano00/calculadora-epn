const formulario = document.getElementById('formulario');
const errorDiv = document.getElementById('error');
const resultadoDiv = document.getElementById('resultado');
const sumaSpan = document.getElementById('suma');
const estadoSpan = document.getElementById('estado');
const detalleP = document.getElementById('detalle');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const n1 = parseFloat(document.getElementById('aporte1').value);
  const n2 = parseFloat(document.getElementById('aporte2').value);

  errorDiv.hidden = true;
  resultadoDiv.hidden = true;
  resultadoDiv.className = 'resultado';

  if (isNaN(n1) || isNaN(n2)) {
    mostrarError('Debes ingresar ambas notas.');
    return;
  }
  if (n1 < 0 || n1 > 20 || n2 < 0 || n2 > 20) {
    mostrarError('Las notas deben estar entre 0 y 20.');
    return;
  }

  const suma = n1 + n2;
  sumaSpan.textContent = redondear(suma);

  if (suma >= 28) {
    estadoSpan.textContent = 'Aprobado';
    detalleP.textContent = '¡Felicidades! Has aprobado la materia.';
    resultadoDiv.classList.add('aprobado');
  } else if (suma < 18) {
    estadoSpan.textContent = 'Reprobado';
    detalleP.textContent = 'Reprobado, no puede rendir supletorio.';
    resultadoDiv.classList.add('reprobado');
  } else {
    estadoSpan.textContent = 'Va a supletorio';
    const minima = Math.max(24, 48 - suma);
    detalleP.textContent = `Necesita al menos ${redondear(minima)} puntos en el supletorio (sobre 40) para aprobar.`;
    resultadoDiv.classList.add('supletorio');
  }

  resultadoDiv.hidden = false;
});

function mostrarError(msg) {
  errorDiv.textContent = msg;
  errorDiv.hidden = false;
}

function redondear(n) {
  return Math.round(n * 100) / 100;
}
