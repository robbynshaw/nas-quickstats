var qs = require('querystring');

module.exports = (function(){
    var nas = {};
    var key = 'C47BE18E-7811-30AD-BF3D-2D93716356CE';
    var host = 'http://quickstats.nass.usda.gov';

    nas.newQuery = function(){
        return {
            key: key,
            format: 'JSON'
        };
    };

    var genCallback = function(response, callback) {
        var s = '';
        response.on('data', function(chunk){
            s += chunk;
        });
        response.on('end', function(){
            console.log(s);
            callback(s);
        });
    };

    nas.yieldQuery = function(commodity){
        commodity = 'BEETS';
        var q = nas.newQuery();
        q.commodity_desc = commodity;
        q.statisticcat_desc = 'YIELD';
        return q;
    };

    nas.request = function(type, query){
        var path = createPath(type, query);
        var options = {
            host: host,
            path: path
        }
        return {
            send: function(callback){
                jsonp(urlStr, callback);
            }
        };
    };


    function createPath(type, query){
        var apiType = '';
        switch (type){
            case 'get':
                apiType = '/api/api_GET/';
                break;
            case 'params':
                apiType = '/api/get_param_values/';
                break;
            case 'counts':
                apiType = '/api/get_counts/';
                break;
        }
        return apiType + '?' + qs.stringify(query);
    }

    return nas;
})();
