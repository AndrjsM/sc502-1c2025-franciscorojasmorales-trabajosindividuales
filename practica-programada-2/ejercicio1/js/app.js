
function calcularDeducciones() {
    const salarioBruto = parseFloat(document.getElementById('salarioBruto').value);
    if (isNaN(salarioBruto) || salarioBruto <= 0) { //https://www.w3schools.com/jsref/jsref_isNaN.asp
        alert('Por favor, ingrese un salario bruto válido.');
        return;
    }

    // Cálculo de cargas sociales
    const cargasSocialesTrabajador = salarioBruto * 0.1067;
    const cargasSocialesPatrono = salarioBruto * 0.2667;
    const totalCargasSociales = cargasSocialesTrabajador + cargasSocialesPatrono;

    // Cálculo del impuesto sobre la renta https://www.hacienda.go.cr/docs/CP1032024.pdf
    let impuestoRenta = 0;
    let salarioRestante = salarioBruto; // Copia de salarioBruto para cálculos de renta

    if (salarioRestante > 4745000) {
        impuestoRenta += (salarioRestante - 4745000) * 0.20;
        salarioRestante = 4745000;
    }
    if (salarioRestante > 2373000) {
        impuestoRenta += (salarioRestante - 2373000) * 0.15;
        salarioRestante = 2373000;
    }
    if (salarioRestante > 1352000) {
        impuestoRenta += (salarioRestante - 1352000) * 0.10;
        salarioRestante = 1352000;
    }
    if (salarioRestante > 922000) {
        impuestoRenta += (salarioRestante - 922000) * 0.10;
    }

    // Salario neto
    const salarioNeto = salarioBruto - cargasSocialesTrabajador - impuestoRenta;

    // Mostrar resultados 
    // .toFixed convierte el metodo en una cadena y el parametro indica la cnatidad de decimales https://www.w3schools.com/jsref/jsref_tofixed.asp
    document.getElementById('cargasSociales').textContent = totalCargasSociales.toFixed(2);
    document.getElementById('impuestoRenta').textContent = impuestoRenta.toFixed(2);
    document.getElementById('salarioNeto').textContent = salarioNeto.toFixed(2);
}