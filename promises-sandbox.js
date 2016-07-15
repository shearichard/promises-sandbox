$( document ).ready(function() {
  // Handler for .ready() called.
    function logit(s){
        var date = moment();
        var msSinceEpoch = date.valueOf();
        var strMsSinceEpoch = msSinceEpoch.toString(10);
        console.log(strMsSinceEpoch.substring(strMsSinceEpoch.length - 6) + ' ' + s);
    }
    //
    var blnDoTest1 = false;
    var blnDoTest2 = true;
    //
    if (blnDoTest1 === true){
        var count = 0;
        function onSuccess1 (data, textStatus, jqXHR) {
            logit('In onSuccess1.');
        }
        function onSuccess2 (data, textStatus, jqXHR) {
            logit('In onSuccess2.');
        }
        function onSuccess3 (data, textStatus, jqXHR) {
            logit('In onSuccess3.');
        }
        function onSuccess (data, textStatus, jqXHR) {
            logit('In onSuccess. About to increment count. Current value is  : ' + count);
            count++;
        }
        function onError (data, textStatus, jqXHR) {
            logit('In onError.');
        }
        function callback (data) {
            logit('Call back : ' + data);
        }
            
        function showData() {
            logit('showData : ' + count + ' (invoked when both method1 and method 2 have succeeded)');
        }
        function method1() {
            logit("method1");
            return $.ajax('http://jsfiddle.net/echo/jsonp/', {
                dataType: 'jsonp',
                //jsonp: '$callback',
                success: [onSuccess, onSuccess1],
                error: onError
            });
        }
        function method2() {
            logit("method2");
            return $.ajax('http://jsfiddle.net/echo/jsonp/', {
                dataType: 'jsonp',
                //jsonp: '$callback',
                success: [onSuccess, onSuccess2],
                error: onError
            });
        }
        function method3() {
            logit("method3");
            return $.ajax('http://jsfiddle.net/echo/jsonp/', {
                dataType: 'jsonp',
                //jsonp: '$callback',
                success: [onSuccess, onSuccess3],
                error: onError
            });
        }
        logit("1++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        logit("About to invoke method1 and method 2");
        method1().then(method2()).then(method2()).then(method3());
        logit("Finished invoke of method1 and method 2");
    }
    if (blnDoTest2 === true){
        logit("2++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        var myAjaxCall1 = function() {
           return $.ajax('https://httpbin.org/delay/3?A=B,C,D');
        };

        var myAjaxCall2 = function() {
           return $.ajax('https://httpbin.org/get?Z=Y,X,W');
        };

        var myAjaxCall3 = function() {
           return $.ajax('https://httpbin.org/delay/1?P=R,S,T');
        };
        var allGood = function(a1, a2, a3){
            // a1[0] is data from first ajax call
            // a2[0] is data from second ajax call
            logit("Start allGood");
            logit("Reporting results from invocation of myAjaxCall1 , myAjaxCall2 and myAjaxCall3");
            logit(a1[2].status);
            logit(a1[0].args.A);
            logit("");
            logit(a2[2].status);
            logit(a2[0].args.Z);
            logit("");
            logit(a3[2].status);
            logit(a3[0].args.P);
            logit("End allGood");
        };
        var someProblems = function(a1, a2){
            logit("Start someProblems");
            logit("End someProblems");
        };

        logit("About to invoke myAjaxCall1 and myAjaxCall2");
        $.when( myAjaxCall1(), myAjaxCall2(), myAjaxCall3() ).then(allGood, someProblems)
        logit("Finished invoke of myAjaxCall1 and myAjaxCall2");
        logit("3++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    }
});


