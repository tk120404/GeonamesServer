function sendEmptyResult(res)
{
    var builder = require('xmlbuilder');
    res.set('Content-Type', 'text/xml');
    var xml = builder.create('result',
                             {'version':'1.0', 'encoding':'UTF-8'});
    var xmlS = xml.end({pretty:true});
    res.send(xmlS);
}

function getGeoLoc(ip, path)
{
    var geoip = require('geoip');
    var city = new geoip.City(path);
    
    var geo = city.lookupSync(ip);
    return (geo);
}

function sendFullResult(res, result, geoloc, ip)
{
    var builder = require('xmlbuilder');
    res.set('Content-Type', 'text/xml');
    var xml = builder.create('result', {'version':'1.0', 'encoding':'UTF-8'});
    var xmlS = "";
    
    xml.att('for', ip);
    var geo = xml.e('geoname');
    geo.e('city', geoloc.city);
    geo.e('country_code', geoloc.country_code);
    geo.e('country', geoloc.country_name);
    if (result && result.name)
        geo.e('fips', result.name);
    else
        geo.e('fips');
    geo.e('longitude', geoloc.longitude.toString());
    geo.e('latitude', geoloc.latitude.toString());
    xmlS = xml.end({pretty:true});
    res.send(xmlS);
}

module.exports = function(app, express, vars) {
    app.get('/geoip', function(req, res){
            var request = require('request');    
            var mongojs = require('mongojs');
            var db = mongojs(vars.mongo.url);
            var ip, geoloc = "";
            
            if (req.query.ip) {
                ip = req.query.ip;
                geoloc = getGeoLoc(ip, vars.geo.geolitepath);
                
            }
            if (!req.query.ip || !geoloc)
                return (sendEmptyResult(res));
            var adminnames = db.collection(vars.mongo.admincodes);
            var code = geoloc.country_code + "." + geoloc.region;
            adminnames.findOne({'code':code},
                               function(err, result) {
                                   return(sendFullResult(res, result, geoloc, ip));
                               });
            
        })};
