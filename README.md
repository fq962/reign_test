<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://allasexpress.com/apks/Imagenes%20CP/allasXnest2.svg" width="320" alt="Nest Logo" /></a>
</p>

## Versiones

#### • **Nest:** 8.2.5 _(Actualmente usada)_<br />

#### • **Node:** v16.15.0 _(Actualmente usada)_<br />

#### • **NPM:** 8.5.5 \_(Actualmente usada)<br />

## Links que pueden serte útil

#### [Repositorio API](https://bitbucket.org/allas-repuestos/canje-premios-api/src/dev/)<br />

#### [Documentacion](https://allasrepuestos.atlassian.net/wiki/spaces/CA/pages/327683/Requisitos+de+Soluci+n+-+Canje+de+premio+-+2o+trimestre+-+2022)<br />

#### [Requerimientos](https://allasrepuestos.atlassian.net/wiki/spaces/CA/pages/4587593/Requerimientos+funcionales+API)<br />

#### [Ambientes de Produccion](https://allasrepuestos.atlassian.net/wiki/spaces/CA/pages/2458012/Preparar+ambientes+de+produccion+y+de+desarrollo+Node+v16)<br />

# REST API CP

Esta es la API actual que se esta utilizando en produccion para el sistema de Canje de Premios de ALLAS Repuestos para proveer una herramienta que la empresa pueda utilizarla para aumentar la conversión de los clientes, así como aumentar su lealtad a la empresa e influenciar su comportamiento de compra.

## ¿Que es una REST API?

Una API, o interfaz de programación de aplicaciones, es un conjunto de reglas que determinan cómo las aplicaciones o los dispositivos pueden conectarse y comunicarse entre sí. Una API REST es una API que se ajusta a los principios de diseño de REST, un estilo de arquitectura también denominado transferencia de estado representacional.

## Instalación

Antes de poder utilizar y consumir la API es necesario instalar los paquetes de NODE en su ultima version con el comando **npm install** o su comando corto:

```bash
$  npm i
```

## Iniciar el API

Para poder iniciar el API existen 2 comandos, uno para desarrollo y otro para produccion que serian los siguiente:

### Desarrollo

```
$  npm run start:dev
```

### Producción

```
$  npm run start:prod
```

## ¿Que son los DTOs de NestJS?

Los DTOs o Data Transfer Object son un objeto que se transfiere por la red entre dos sistemas, son utilizados mayormente en aplicaciones cliente/servidor y aplicaciones Web modernas.

### Ejemplo DTO

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
