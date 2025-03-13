<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">

<head>
    <title>Pagina de transacciones</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="/assets/css/docs.css">
</head>

<body>
    <?php include 'header.php'; ?>
    <main class="container mt-5">
        <div class="row">
            <?php
            $productos = [
                [
                    'titulo' => 'Cafe de exportación 1',
                    'descripcion' => 'Esquicito cafe de 1000 gramos',
                    'precio' => 20,
                    'img' => 'https://micafemex.com/wp-content/uploads/2021/04/bolsa-cafe.png',
                    'detalles' => ['Tueste oscuro', 'Molido', '1000 gramos']
                ],
                [
                    'titulo' => 'Cafe de exportación 2',
                    'descripcion' => 'Esquicito cafe de 1000 gramos en grano',
                    'precio' => 25,
                    'img' => 'https://micafemex.com/wp-content/uploads/2021/04/bolsa-cafe.png',
                    'detalles' => ['Tueste oscuro', 'Grano entero', '1000 gramos']
                ],
                [
                    'titulo' => 'Cafe de exportación 3',
                    'descripcion' => 'Esquicito cafe de 500 gramos',
                    'precio' => 12,
                    'img' => 'https://micafemex.com/wp-content/uploads/2021/04/bolsa-cafe.png',
                    'detalles' => ['Tueste oscuro', 'Molido', '500 gramos']
                ]
            ];

            foreach ($productos as $producto) {
                echo '<div class="col-md-4 my-3">';
                echo '<div class="card shadow">';
                echo '<img src="' . $producto['img'] . '" class="card-img-top" alt="...">';
                echo '<div class="card-body">';
                echo '<h5 class="card-title">' . $producto['titulo'] . '</h5>';
                echo '<p class="card-text">' . $producto['descripcion'] . '</p>';
                echo '</div>';
                echo '<ul class="list-group list-group-flush">';
                foreach ($producto['detalles'] as $detalle) {
                    echo '<li class="list-group-item">' . $detalle . '</li>';
                }
                echo '</ul>';
                echo '<div class="card-body">';
                echo '<div class="row align-items-center text-center">';
                echo '<div class="col-6 ">';
                echo '<span class="fs-3">$' . $producto['precio'] . '</span>';
                echo '</div>';
                echo '<div class="col-6">';
                echo '<form action="checkout.php" method="GET">';
                echo '<input type="hidden" name="producto_nombre" value="' . $producto['titulo'] . '">';
                echo '<input type="hidden" name="producto_descripcion" value="' . $producto['descripcion'] . '">';
                echo '<input type="hidden" name="producto_precio" value="' . $producto['precio'] . '">';
                echo '<button type="submit" class="btn btn-secondary">Comprar</button>';
                echo '</form>';
                echo '</div>';
                echo '</div>';
                echo '</div>';
                echo '</div>';
                echo '</div>';
            }
            ?>
        </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>

</html>