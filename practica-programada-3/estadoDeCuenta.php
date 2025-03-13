<?php
// filepath: c:\Users\andrj\OneDrive - Universidad Fidélitas\Fidelitas\2025\I Cuatrimestre\Ambiente Web ClienteServidor SC-502\sc502-1c2025-franciscorojasmorales-trabajosindividuales\practica-programada-3\estadoDeCuenta.php

include 'funciones.php';

$tarjetas = obtenerTarjetasUnicas();
$transacciones = [];
$monto_contado = 0;
$monto_interes = 0;
$cash_back = 0;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $ccNumber = $_POST['ccNumber'];
    $transacciones = obtenerTransaccionesPorTarjeta($ccNumber);
    $monto_contado = array_sum(array_column($transacciones, 'amount'));
    $monto_interes = $monto_contado * 1.026;
    $cash_back = $monto_contado * 0.001;
}
?>
<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">

<head>
    <title>Estado de Cuenta</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="/assets/css/docs.css">
</head>

<body>
    <?php include 'header.php'; ?>
    <div class="container">
        <form method="POST" class="mb-4">
            <div class="mb-3">
                <label for="ccNumber" class="form-label">Seleccione una tarjeta de crédito</label>
                <select class="form-select" id="ccNumber" name="ccNumber" required>
                    <option value="">Seleccione...</option>
                    <?php foreach ($tarjetas as $tarjeta): ?>
                        <option value="<?php echo htmlspecialchars($tarjeta); ?>"><?php echo htmlspecialchars($tarjeta); ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Ver Transacciones</button>
        </form>

        <?php if (!empty($transacciones)): ?>
            <h4>Transacciones</h4>
            <ul class="list-group mb-3">
                <?php foreach ($transacciones as $transaccion): ?>
                    <li class="list-group-item d-flex justify-content-between lh-sm">
                        <div>
                            <h6 class="my-0"><?php echo htmlspecialchars($transaccion['date']); ?></h6>
                            <small class="text-body-secondary"><?php echo htmlspecialchars($transaccion['first_name'] . ' ' . $transaccion['last_name']); ?></small>
                        </div>
                        <span class="text-body-secondary">$<?php echo htmlspecialchars($transaccion['amount']); ?></span>
                    </li>
                <?php endforeach; ?>
            </ul>

            <h4>Resumen</h4>
            <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between">
                    <span>Monto total de contado</span>
                    <strong>$<?php echo htmlspecialchars($monto_contado); ?></strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span>Monto total con interés (2.6%)</span>
                    <strong>$<?php echo htmlspecialchars($monto_interes); ?></strong>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span>Cash back (0.1%)</span>
                    <strong>$<?php echo htmlspecialchars($cash_back); ?></strong>
                </li>
            </ul>
        <?php endif; ?>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>

</html>