'use strict';

module.exports = function(Candystore) {

  //define status method that takes no args, checks the time and returns JSON status msg
  Candystore.status = function(cb) {
   var currentDate = new Date();
   var currentHour = currentDate.getHours();
   var OPEN_HOUR = 6;
   var CLOSE_HOUR = 20;
   console.log('Current hour is %d', currentHour);w
   var response;
   if (currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR) {
     response = 'We are open for business.';
   } else {
     response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
   }
   cb(null, response);
 };
 Candystore.remoteMethod(
   'status', {
     http: {
       path: '/status',
       verb: 'get'
     },
     returns: {
       arg: 'status',
       type: 'string'
     }
   }
 );

 //define remote method that returns store name given id
 Candystore.getName = function(shopId, cb) {
    Candystore.findById( shopId, function (err, instance) {
        var response = "Name of candy shop is " + instance.name;
        cb(null, response);
        console.log(response);
    });
  }

  Candystore.remoteMethod (
        'getName',
        {
          http: {path: '/getname', verb: 'get'},
          accepts: {arg: 'id', type: 'number', http: { source: 'query' } },
          returns: {arg: 'name', type: 'string'}
        }
    );
};
