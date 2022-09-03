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

# RAISE the API

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


# Endpoints and Routes

## Swagger
I have generated a swagger to make it easier to request and consume the API. <br>
This can be found in the following link:
#### [SWAGGER](http://localhost:3000/api/)<br />

## Postman
I have also generated a collection in Postman which you can import and use in your client. _The routes and request are ready to be used_

### Link a importar: https://www.getpostman.com/collections/e145d5f7e3c7683675c6

## How to use routes?
In the endpoint that obtains the information from the database, it has filters _(node-news/hits/filters)_ such as:
**Pagination:** here it shows the news 5 by 5 and the default page is 1. <br>
**Filter by Author:** for this filter the _author_ field is used where it shows us the author's news that we place in the request. <br>
**Filter by title:** in this filter we use the _storytitle_ field since the _title_ field returns null in all news. <br>
**Filter by tags:** In this filter we use the _tags_ field to filter the API response. <br>

## NOTE
Please use exact words to use the filters, for example: <br>
I have one or several elements with the title **"Node News in this year"**, if I want to use the _title_ filter, I have to search for any word that is equal to any of the title but the same as it is written in the registry

**Not this way**
❌ **_Filter title:_** node news
or
❌ **_Filter title:_** news this Year

**Correct this way**
✅ **_Filter title:_** Node News
or
✅ **_Filter title:_** News this year

