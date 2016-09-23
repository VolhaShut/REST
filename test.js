var assert=require('assert');
var rp=require('request-promise'); 
var fs=require('fs');
var filename='response.json';
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
describe('Preparing test...', function() {
    var readData;
    var responseData;
    before(function(){
        return Promise.all([
                rp(options),
                new Promise(function(success, fail){

                    fs.readFile(filename,{encoding:"utf8"},function(err,content){
                        if(err){
                            fail(err);
                        }
                        else{
                            success(JSON.parse(content));
                        }
                        
                    });

                })
            ]) 
            .then(function(data){
                responseData=data[0];
                readData=data[1];
            });
    });
    describe('Comparing JSON...',function(){
       it('should have a JSON', function(done) {
            assert.equal(
                JSON.stringify(readData),
                JSON.stringify(responseData)
            );
            done();
        });
    });
});