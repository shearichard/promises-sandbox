$( document ).ready(function() {
  // Handler for .ready() called.
    function logit(s){
        var date = moment();
        var msSinceEpoch = date.valueOf();
        var strMsSinceEpoch = msSinceEpoch.toString(10);
        var strTest = 'Mozilla and then some';
        //console.log(date.toISOString() + ' ' + s);
        //
        console.log(strMsSinceEpoch.substring(strMsSinceEpoch.length - 6) + ' ' + s);
        //console.log(strTest.substring(strTest.length - 5) + ' ' + s);

        //$('#output #outputtable tr:last').append('<tr><td>' + date.toISOString() + '</td><td>' + '<div class=logout><pre>' + s + '</pre></div>' + '</td></tr>');
        //$('#output #outputtable tr:last').append('<tr><td>' + date.toISOString() + '</td><td>' + '<pre>' + s + '</pre>' + '</td></tr>');
        //
        $('#output #outputtable tr:last').append('<tr><td>' + date.toISOString() + '</td><td>' + '' + s + '' + '</td></tr>');
    }
    var p0 = new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve("Yay! This is p0");
        },20);
    });
    var p1 = new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve("Yay! This is p1");
        },19);
    });
    var p00 = new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve("Yay! This is p00");
        },200);
    });
    var p10 = new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve("Yay! This is p10");
        },1);
    });
    logit("A");
    p0.then(function(msg){
        logit(msg); 
    });
    p1.then(function(msg){
        logit(msg); 
    });
    logit("B");
    //var fetch0 = function() { return {$.ajax('https://httpbin.org/get?A=B,C,D')}};
    var fetch1 = function() 
    { 
      return function(){
        $.ajax('https://httpbin.org/get?Z=Y,X,W');  
      };
    };
    var fetch11 = function() 
    { 
      $.ajax('https://httpbin.org/get?Z=Y,X,W');  
    };
    //var fetch1 = { return {$.ajax}}
    var goodFetches = function (v1, v2){
      logit("GOOD : All out of when's");
      logit(v1[0].args.A);
      //logit(v1[1]);
      //logit(v1[2].statusText);
      //logit(v1[2].responseJSON.args.A);
      logit(v2[0].args.Z);
      logit(v2);  
    };
    var badFetches = function(v1, v2){
      logit("BAD : All out of when's");
      logit(v1.responseText);
      logit(v2.responseText);
    };
    //$.when( fetch11, $.ajax('https://httpbin.org/get?Z=Y,X,W'))
    //  .then(goodFetches, badFetches);
    logit("C");
    logit("1++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    var count = 0;
    function onSuccess () {
        count++;
    }
    function callback (data) {
        logit('Call back : ' + data);
    }
        
    function showData() {
        logit('showData : ' + count);
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
    logit("D");
    $.when(method1(), method2()).then(showData);
    logit("E");
    logit("2++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    function f1(v1, v2){
        logit('f1 (OK)');
    }
    function f2(v1, v2){
        logit('f2 (NOK)');
    }
    $.when(p00, p10).then(f1, f2);
    logit("3++++++++++++++++++++++++++++++++++++++++++++++++++++++");
});


