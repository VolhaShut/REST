var rp=require('request-promise'); //import
var fs=require('fs');
var options = {
    uri: 'http://jsonplaceholder.typicode.com/comments/',
    qs: {
        postId:'1',     
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response 
};

function catch1(){
  console.log('error');  
}

function getObj(repos) {
    console.log(repos);
    return repos;
}

function writeObj(repos){
    fs.writeFile(
        'response.json',
        JSON.stringify(repos),
        function(){
           console.log("Ok!"); 
        }
    );
}

rp(options)
    .then(getObj,catch1)
    .then(writeObj)
  