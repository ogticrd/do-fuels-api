# Servicio de precio de combustibles dominicanos ⛽️

[![Linting](https://github.com/opticrd/citizens-photo-api/actions/workflows/lint.yml/badge.svg)](https://github.com/opticrd/citizens-photo-api/actions/workflows/lint.yml)

## Tabla de contenidos

- [Servicio de precio de combustibles dominicanos](#servicio-de-precio-de-combustibles-dominicanos)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Descripción y contexto](#descripción-y-contexto)
  - [Referencia del servicio](#referencia-del-servicio)
  - [Cómo iniciar](#cómo-iniciar)
  - [Stack de desarrollo](#stack-de-desarrollo)
    - [Servidor](#servidor)
    - [Base de datos](#base-de-datos)
  - [Descargo de responsabilidad](#descargo-de-responsabilidad)
  - [Autores](#autores)

## Descripción y contexto

---

Este servicio es un [wrapper](https://es.quora.com/Qu%C3%A9-es-exactamente-un-wrapper-API-Y-en-qu%C3%A9-se-diferencia-de-solo-una-API) del RSS de los precios de combustibles dominicanos del [Ministerio de Industria, Comercio y Mypimes (MICM)](https://www.micm.gob.do/).

## Referencia del servicio

- [Documentación oficial](https://developers.digital.gob.do)

## Cómo iniciar

1. Configuración del repositorio

```sh
    # Clonar repositorio
    git clone https://github.com/opticrd/do-fuels-api.git;
```

2. Declarar y definir las variables de entorno

```sh
    # Crear archivo de variables de entorno
    cd do-fuels-api;
    touch .env;
```

```sh
    # Application
    PORT=
    API_VERSION=
    DEFAULT_PAGINATION_RESPONSE=
    NODE_ENV=

    # Database
    DB_HOST=
    DB_PORT=
    DB_USER=
    DB_NAME=
    DB_PASSWORD=
    DB_LOGGING=
```

3. Instalar dependecias

```sh
    yarn
```

4. Correr proyecto

```sh
    npm run start:dev
```

## Stack de desarrollo

### Servidor

- Node.js
  - Nest.js Framework

### Base de datos

- Postgres

## Descargo de responsabilidad

La información expuesta a través de este servicio proviene del RSS público expuesto por el **MICM** que normalmente se actualiza todos los viernes. En ocasiones, esta fuente de información tarda en actualizarse, por lo que este servicio puede presentar retraso en la exposción de la información.

## Dependencias

Este proyecto requiere de un [cron-job](https://github.com/opticrd/do-fuels-cron) que inserta la información en la base de datos semanal.

## Autores

Septiembre 2021

- [Marluan Espiritusanto](https://github.com/marluanespiritusanto)
