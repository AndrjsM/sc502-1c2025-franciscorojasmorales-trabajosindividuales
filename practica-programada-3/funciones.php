<?php

function registrarTransaccion(&$transacciones, $firstName, $lastName, $paymentMethod, $ccName, $ccNumber, $ccExpiration, $ccCvv, $amount)
{
    // Generar un ID único basado en la fecha y hora actuales
    $id = date('dmY-Hi');

    // Crear la transacción
    $transaccion = [
        'id' => $id,
        'first_name' => $firstName,
        'last_name' => $lastName,
        'payment_method' => $paymentMethod,
        'cc_name' => $ccName,
        'cc_number' => $ccNumber,
        'cc_expiration' => $ccExpiration,
        'cc_cvv' => $ccCvv,
        'amount' => $amount,
        'date' => date('Y-m-d H:i:s')
    ];

    // Agregar la transacción al arreglo de transacciones
    array_push($transacciones, $transaccion);

    // Guardar las transacciones en un archivo
    $file_path = 'transactions.txt';
    $file = fopen($file_path, 'w');
    if ($file) {
        fwrite($file, json_encode($transacciones));
        fclose($file);
    } else {
        echo "Error al abrir el archivo.";
    }
}

function obtenerTransacciones()
{
    $file_path = 'transactions.txt';
    if (file_exists($file_path)) {
        $file_size = filesize($file_path);
        if ($file_size > 0) {
            $file = fopen($file_path, 'r');
            if ($file) {
                $content = fread($file, $file_size);
                fclose($file);
                $transacciones = json_decode($content, true);
                return is_array($transacciones) ? $transacciones : [];
            }
        }
    }
    return [];
}

function obtenerTarjetasUnicas()
{
    $transacciones = obtenerTransacciones();
    $tarjetas = [];
    foreach ($transacciones as $transaccion) {
        if (!in_array($transaccion['cc_number'], $tarjetas)) {
            $tarjetas[] = $transaccion['cc_number'];
        }
    }
    return $tarjetas;
}

function obtenerTransaccionesPorTarjeta($ccNumber)
{
    $transacciones = obtenerTransacciones();
    $transaccionesFiltradas = [];
    foreach ($transacciones as $transaccion) {
        if ($transaccion['cc_number'] == $ccNumber) {
            $transaccionesFiltradas[] = $transaccion;
        }
    }
    return $transaccionesFiltradas;
}
?>