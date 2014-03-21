var links = [];
var casper = require('casper').create();

var titles = [];

function getLinks() {
    var links = document.querySelectorAll('h3.r a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

var host = 'http://www.google.com.hk';

casper.start('http://www.google.com.hk/', function() {
    // search for 'casperjs' from google form
    this.fill('form[action="/search"]', { q: '兰博基尼' }, true);
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
    links = this.evaluate(getLinks);
    // now search for 'phantomjs' by filling the form again
    for(var i in links){
        console.log(host + links[i]);
    }
    this.fill('form[action="/search"]', { q: 'abc' }, true);
});

casper.then(function() {
    // aggregate results for the 'phantomjs' search
    links = links.concat(this.evaluate(getLinks));
    for(var i in links){
        console.log(host + links[i]);
    }
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
/*    for(var i in links){
        console.log(i);
        var url = links[i];
        console.log(host + url);
    }
    for(var i in titles){
        console.log(titles[i]);
    }*/
    this.exit();

});