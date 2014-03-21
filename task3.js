/**
 * Created by gastrodia on 14-3-20.
 */
var Crawler = require("crawler").Crawler;
var cheerio = require('cheerio');

var c = new Crawler({
    maxConnections:10,
    "callback":function(error,result) {
        var html = result.body;
        $ = cheerio.load(html);
        debugger
        $("ul li.result").each(function(i,elem){
            debugger
            var $result = $(this);
            var title = $result.find("h3 a").text;
            var link = $result.find("h3 a").attr("href");

            var $summary = $result.find(".c-summary");

            var summaryPhotoPath = $summary.find("a.c_photo img").attr("src");
            $summary.find("a").remove();
            var summaryText = $summary.text();

        })

    }
});



c.queue([
    {
        "uri":"http://news.baidu.com/ns?cl=2&rn=20&tn=news&word=Lamborghini&ie=utf-8&ie=utf-8",
        "jQuery":false
    }
]);
