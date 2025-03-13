<?php
// filepath: c:\Users\andrj\OneDrive - Universidad Fidélitas\Fidelitas\2025\I Cuatrimestre\Ambiente Web ClienteServidor SC-502\sc502-1c2025-franciscorojasmorales-trabajosindividuales\practica-programada-3\checkout.php

include 'funciones.php';

$mensaje = '';

// Capturar datos del formulario y registrar la transacción
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $paymentMethod = $_POST['paymentMethod'];
    $ccName = $_POST['ccName'];
    $ccNumber = $_POST['ccNumber'];
    $ccExpiration = $_POST['ccExpiration'];
    $ccCvv = $_POST['ccCvv'];
    $amount = $_POST['amount'];

    // Obtener transacciones existentes
    $transacciones = obtenerTransacciones();

    // Registrar la transacción
    registrarTransaccion($transacciones, $firstName, $lastName, $paymentMethod, $ccName, $ccNumber, $ccExpiration, $ccCvv, $amount);

    $mensaje = "Transacción guardada correctamente.";

    header('Location: estadoDeCuenta.php');
    exit();
}

// Obtener datos del producto desde la URL
$producto_nombre = isset($_GET['producto_nombre']) ? $_GET['producto_nombre'] : '';
$producto_descripcion = isset($_GET['producto_descripcion']) ? $_GET['producto_descripcion'] : '';
$producto_precio = isset($_GET['producto_precio']) ? $_GET['producto_precio'] : 0;

// Obtener transacciones existentes
$transacciones = obtenerTransacciones();

// Calcular montos
$monto_contado = array_sum(array_column($transacciones, 'amount'));
$monto_interes = $monto_contado * 1.026;
$cash_back = $monto_contado * 0.001;
?>
<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">

<head>
    <title>Pagina de transacciones</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="/assets/css/docs.css">
</head>

<body>
    <header class="container align-items-center">
        <h2 class="text-center">Checkout</h2>
    </header>
    <div class="container">
        <?php if ($mensaje): ?>
            <div class="alert alert-success" role="alert">
                <?php echo $mensaje; ?>
            </div>
        <?php endif; ?>
        <main>
            <div class="row g-5">
                <div class="col-md-5 col-lg-4 order-md-last">
                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                        <span class="text-primary">Your cart</span>
                        <span class="badge bg-primary rounded-pill">1</span>
                    </h4>
                    <ul class="list-group mb-3">
                        <li class="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 class="my-0"><?php echo htmlspecialchars($producto_nombre); ?></h6>
                                <small class="text-body-secondary"><?php echo htmlspecialchars($producto_descripcion); ?></small>
                            </div>
                            <span class="text-body-secondary">$<?php echo htmlspecialchars($producto_precio); ?></span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>$<?php echo htmlspecialchars($producto_precio); ?></strong>
                        </li>
                    </ul>

                </div>
                <div class="col-md-7 col-lg-8">
                    <h4 class="mb-3">Billing address</h4>
                    <form class="needs-validation" novalidate method="POST">
                        <div class="row g-3">
                            <div class="col-sm-6">
                                <label for="firstName" class="form-label">First name</label>
                                <input type="text" class="form-control" id="firstName" name="firstName" placeholder="" value="" required>
                                <div class="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <label for="lastName" class="form-label">Last name</label>
                                <input type="text" class="form-control" id="lastName" name="lastName" placeholder="" value="" required>
                                <div class="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>
                        </div>

                        <hr class="my-4">

                        <h4 class="mb-3">Payment</h4>

                        <div class="my-3">
                            <div class="form-check">
                                <input id="credit" name="paymentMethod" type="radio" class="form-check-input" value="credit" checked required>
                                <label class="form-check-label" for="credit">Credit card</label>
                            </div>
                            <div class="form-check">
                                <input id="debit" name="paymentMethod" type="radio" class="form-check-input" value="debit" required>
                                <label class="form-check-label" for="debit">Debit card</label>
                            </div>
                        </div>

                        <div class="row gy-3">
                            <div class="col-md-6">
                                <label for="cc-name" class="form-label">Name on card</label>
                                <input type="text" class="form-control" id="cc-name" name="ccName" placeholder="" required>
                                <small class="text-body-secondary">Full name as displayed on card</small>
                                <div class="invalid-feedback">
                                    Name on card is required
                                </div>
                            </div>

                            <div class="col-md-6">
                                <label for="cc-number" class="form-label">Credit card number</label>
                                <input type="text" class="form-control" id="cc-number" name="ccNumber" placeholder="" required>
                                <div class="invalid-feedback">
                                    Credit card number is required
                                </div>
                            </div>

                            <div class="col-md-3">
                                <label for="cc-expiration" class="form-label">Expiration</label>
                                <input type="text" class="form-control" id="cc-expiration" name="ccExpiration" placeholder="" required>
                                <div class="invalid-feedback">
                                    Expiration date required
                                </div>
                            </div>

                            <div class="col-md-3">
                                <label for="cc-cvv" class="form-label">CVV</label>
                                <input type="text" class="form-control" id="cc-cvv" name="ccCvv" placeholder="" required>
                                <div class="invalid-feedback">
                                    Security code required
                                </div>
                            </div>
                        </div>

                        <input type="hidden" name="amount" value="<?php echo htmlspecialchars($producto_precio); ?>">

                        <hr class="my-4">

                        <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                    </form>
                </div>
            </div>
        </main>

        <footer class="my-5 pt-5 text-body-secondary text-center text-small">
            <p class="mb-1">&copy; 2025</p>
            <ul class="list-inline">
                <li class="list-inline-item"><a href="#">Privacy</a></li>
                <li class="list-inline-item"><a href="#">Terms</a></li>
                <li class="list-inline-item"><a href="#">Support</a></li>
            </ul>
        </footer>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>

</html>