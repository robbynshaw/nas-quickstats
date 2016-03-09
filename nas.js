var qs = require('querystring');
var http = require('http');

module.exports = (function(){
    var nas = {};
    var key = 'C47BE18E-7811-30AD-BF3D-2D93716356CE';
    var host = 'quickstats.nass.usda.gov';
    
    nas.type = {
        get: 0,
        params: 1,
        counts: 2
    };

    nas.newQuery = function(){
        return {
            key: key,
            format: 'JSON'
        };
    };

    nas.testYield = function(){
        var q = nas.yieldQuery();
        var r = nas.request(nas.type.get, q, function(data){
            var d = JSON.parse(data);
            var all = d.data;
            console.log(all[0]);
            for (var i=0; i<all.length; i++){
                var yearly = all[i];
                console.log('YEAR: ' + yearly.year);
                console.log('\t' + yearly.Value + ' ' + yearly.unit_desc);
            }
        });
        r.send();
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

    nas.yieldQuery = function(commodity){
        commodity = 'BEETS';
        var q = nas.newQuery();
        q.commodity_desc = commodity;
        q.statisticcat_desc = 'YIELD';
        return q;
    };

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

    return nas;
})();
