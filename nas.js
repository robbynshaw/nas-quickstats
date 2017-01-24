var qs = require('querystring');
var http = require('https');

module.exports = (function(){
    var nas = {};
    var host = 'quickstats.nass.usda.gov';
    
    nas.key = '';
    
    nas.type = {
        get: 0,
        params: 1,
        counts: 2
    };

    nas.query = function(options){
        options.key = nas.key;
        options.format = 'JSON';
        return options;
    };

    var genCallback = function(callback){
        var f = function(response) {
            var s = '';
            //response.on('answer', function(data){
            //    console.log(data);
            //})
            response.on('data', function(chunk){
                s += chunk;
            });
            response.on('end', function(){
                if (callback){
                    callback(s);
                }
            });
        };
        return f;
    };

    function createOptions(type, query){
        var apiType = '';
        switch (type){
            case nas.type.get:
                apiType = '/api/api_GET/';
                break;
            case nas.type.params:
                apiType = '/api/get_param_values/';
                break;
            case nas.type.counts:
                apiType = '/api/get_counts/';
                break;
            default:
                console.error('An incorrect type was passed to' +
                             ' the api request');
        }
        return {
            host: host,
            path: apiType + '?' + qs.stringify(query)
        };
    }
    
    nas.request = function(type, query, callback){
        var options = createOptions(type, query);
        var newCallback = genCallback(callback);
        return {
            options: options,
            send: function(){
                http.request(options, newCallback).end();
            }
        };
    };

    return nas;
})();
