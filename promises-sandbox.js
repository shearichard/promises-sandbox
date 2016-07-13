$( document ).ready(function() {
  // Handler for .ready() called.
    function logit(s){
        var date = moment();
        var msSinceEpoch = date.valueOf();
        var strMsSinceEpoch = msSinceEpoch.toString(10);
        console.log(strMsSinceEpoch.substring(strMsSinceEpoch.length - 6) + ' ' + s);
    }
    var count = 0;
    function onSuccess () {
        logit('In onSuccess. About to increment count. Current value is  : ' + count);
        count++;
    }
    function callback (data) {
        logit('Call back : ' + data);
    }
        
    function showData() {
        logit('showData : ' + count + ' (invoked when both method1 and method 2 have succeeded)');
    }
    function method1() {
        return $.ajax('http://jsfiddle.net/echo/jsonp/', {
            dataType: 'jsonp',
            //jsonp: '$callback',
            success: onSuccess
        });
    }
    function method2() {
        return $.ajax('http://jsfiddle.net/echo/jsonp/', {
            dataType: 'jsonp',
            //jsonp: '$callback',
            success: onSuccess
        });
    }
    logit("About to invoke method1 and method 2");
    $.when(method1(), method2()).then(showData);
    logit("Finished invoke of method1 and method 2");
    logit("2++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    var myAjaxCall1 = function() {
       return $.ajax('https://httpbin.org/get?Z=Y,X,W');
    };

    var myAjaxCall2 = function() {
       return $.ajax('https://httpbin.org/get?A=B,C,D');
    };

    $.when( myAjaxCall1(), myAjaxCall2() ).then(function(a1, a2) {
        // a1[0] is data from first ajax call
        // a2[0] is data from second ajax call
        logit(a1[0]);
        logit(a1[0].args.Z);
        logit(a2[0]);
        logit(a2[0].args.A);
    });    
});


