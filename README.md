<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://allasexpress.com/apks/Imagenes%20CP/allasXnest2.svg" width="320" alt="Nest Logo" /></a>
</p>

## Some Facilities

#### • **Nest:** 9.0.0 _(Currently used)_<br />

#### • **Node:** v16.17.0 LTS _(Currently used)_<br />

#### • **NPM:** 8.5.5 \_(Currently used)<br />

## Links que pueden serte útil

#### [Repositorio API](https://bitbucket.org/allas-repuestos/canje-premios-api/src/dev/)<br />

#### [Documentacion](https://allasrepuestos.atlassian.net/wiki/spaces/CA/pages/327683/Requisitos+de+Soluci+n+-+Canje+de+premio+-+2o+trimestre+-+2022)<br />

#### [Requerimientos](https://allasrepuestos.atlassian.net/wiki/spaces/CA/pages/4587593/Requerimientos+funcionales+API)<br />

#### [Ambientes de Produccion](https://allasrepuestos.atlassian.net/wiki/spaces/CA/pages/2458012/Preparar+ambientes+de+produccion+y+de+desarrollo+Node+v16)<br />

# Install MongoDB

To install MongoDB we need to execute a series of steps

## First step

We need to install MongoDB on our PC, we can do this in the following link:
#### [MongoDB Commnity Server](https://bitbucket.org/allas-repuestos/canje-premios-api/src/dev/)<br />

## Second step

We are going to create in our **local disk C:** a folder called **data**data and inside it a folder called **db**, it would look like this: **C:\data\db**

## Third step

We have to add the file **bin** to the path of our environment variables, normally this is located in **C:\Program Files\MongoDB\Server\6.0\bin**
## Fourth step

Finally we start our MongoDB service, in our terminal we execute the following command

```
$  mongod
```

## NOTE
We can use Compass to see our DB when it is created or some other IDE that can connect to a Mongo DB like Navicat or another

### Raise the API

## First step

We clone the project, and get our node_modules

```
$  npm install
```

## Second step

We run the API with the NestJS command

```
$  nest start
```

Or we can execute the following command to see the changes in the API automatically

```
$  nest start:dev
```

## NOTE
The API has a CRON (Task scheduling) and when the application is started it runs every hour, what it does is get the news from the provided URL and insert the information in the DB.

We can modify the time so that it runs every 10 seconds or every 10 minutes and thus be able to see the functionality and have records in the DB.

In our **node-new.service** we can change the CRON time from **EVERY_HOUR** to **EVERY_10_MINUTES** or **EVERY_10_SECONDS** or even some specific time.


### Endpoints and Routes

## Swagger
I have generated a swagger to make it easier to request and consume the API. <br>
This can be found in the following link:
#### [SWAGGER Localhost](http://localhost:3000/api/)<br />


```bash
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Url } from 'url';

export class InfoProductoDto {
    //*
    @ApiProperty({
        description: 'Devuelve info de un producto por su codigo de producto',
        required: false,
    })
    @IsOptional()
    @Type((type) => String)
    @IsString()
    public codigoProducto?: string;
}
```

### Modules

En la carpeta **src** se encuentra la carpeta **Modules** donde estan las carpetas de cada modulo de Canje de Premios, ahi mismo se encuentras los _DTOs_, los _Controllers_ y los _service_ para realizar cada consulta a la base de datos.

![Modules API](https://allasexpress.com/apks/Imagenes%20CP/ejemplo.png)

## Como crear un Module nuevo

Para crear un nuevo _**Module**_ es tan sencillo como ejecutar el siguiente comando de Nest:

### Ejemplo

Vamos a crear un modulo llamado **ejemplo**, primero especificapos la carpeta donde vamos a crear el modulo seguido del nombre.

```bash
$  nest g res modules/ejemplo
```

Luego verificamos que el modulo sea creado con exito.

![Ejemplo Module](https://allasexpress.com/apks/Imagenes%20CP/moduleEjemplo.png)

## Controllers

Los **Controllers** son de las piezas principales de las aplicacion, nos ayudan a dar soporte o respoder las solicitudes realizadas al servidor.

```bash
# Ejemplo de un Controller
@Controller('carritos')
export class CarritoController {
    constructor(private readonly carritoService: CarritoService) {}

    //* <- RECIBE LAS SOLICITUDES PARA OBTENER EL DETALLE DE UN CARRITO ->
    @Get(':carritoId/customers/:customerId')
    obtieneCarritoDetalle(@Param() params: GetCarritoDetalleDto) {
        return this.carritoService.obtieneCarritoDetalle(params);
    }
}
```

## Services

Los **Services** nos proporcionan el acceso a los datos que necesita la aplicacion o el cliente para funcionar. Estos nos ayudar a liberar el codigo de los Controllers.

```bash
# Ejemplo de un Service
@Injectable()
export class CarritoService {
    constructor(private readonly pgService: PgService) {}

    //* <- RECIBE LAS SOLICITUDES PARA OBTENER EL DETALLE DE UN CARRITO ->
    @Get(':carritoId/customers/:customerId')
    obtieneCarritoDetalle(@Param() params: GetCarritoDetalleDto) {
        return this.carritoService.obtieneCarritoDetalle(params);
    }
}
```

### Licencia

Derechos reservados a **ALLAS Repuestos**.
