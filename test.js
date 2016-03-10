var nas = require('./nas');

nas.key = 'C47BE18E-7811-30AD-BF3D-2D93716356CE';

var q = nas.query({
    commodity_desc: 'BEETS',
    statisticcat_desc: 'YIELD'
});

var r = nas.request(nas.type.get, q, function(data){
    var d = JSON.parse(data),
        all = d.data;
    
    console.log('______JSON DATA e.g._____');
    console.log(all[0]);
    console.log('-------------------------\n\r');
    console.log('_________RESULTS_________');
    for (var i=0; i<all.length; i++){
        var yearly = all[i];
        console.log('YEAR: ' + yearly.year);
        console.log('\t' + yearly.Value + ' ' + yearly.unit_desc);
    }                                                               
});

r.send();

