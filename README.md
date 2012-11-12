#GeonamesServer

[![Build Status](https://secure.travis-ci.org/alchemy-fr/GeonamesServer.png?branch=master)](https://travis-ci.org/alchemy-fr/GeonamesServer)

A node.js server used to get the biggest or the closest cities based on a given HTTP request.

##Documentation

Read The Documentation at [Read The Docs !](https://geonames-server.readthedocs.org/)


##Usage Example

```bash
curl -XGET "§SERVER_URL/find_city?city=paris"
curl -XGET "§SERVER_URL/find_city?city=paris,f"
curl -XGET "§SERVER_URL/find_city?city=paris,f&sort=population"
curl -XGET "$SERVER_URL/getname?geonameid=123456"
curl -XGET "$SERVER_URL/getname?geonameid=123456"

```

##License

This project is licensed under the [MIT license](http://opensource.org/licenses/MIT).


