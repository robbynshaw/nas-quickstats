# nas-quickstats
A simple node library for accessing the National Agriculture Service QuickStats database.

For a quick example...

    $node test

API
------------------
1.  Add the library into your file

    ```javascript
    var nas = require('nas-quickstats');
    ```

1.  Declare your key that you obtained from the
    [nas site](http://quickstats.nass.usda.gov/api 'nas api').

    ```javascript
    nas.key = 'asldfaj-sadfas-adsf-asdfsdf';
    ```

1.  Create a query using the variables from the
    [nas site](http://quickstats.nass.usda.gov/api 'nas api').

    ```javascript
    var q = nas.query({
      commodity_desc: 'BEETS',
      statisticcat_desc: 'YIELD'
    });
    ```

    'query' takes an options object which can contain any
    number of key value pairs describing the query.

1.  Create a request declaring a type and passing in your query
    and a callback.

    Available types are: get, params, and counts.

    ```javascript
    var r = nas.request(nas.type.get, q, function(data){
      console.log(data);
    });
    ```

1.  Send the request, and be on your merry way.

    ```javascript
    r.send();
    ```


More details about the NAS api itself can be found
@ http://quickstats.nass.usda.gov/api. Be sure to obtain
an API key (it's instant) and read the terms and conditions
of use.
