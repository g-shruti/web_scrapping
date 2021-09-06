const request = require("request");
const cheerio = require("cheerio");
let fs = request("fs");
let data = {};

request("https://github.com/topics",callback);


function callback(error,response,html)
{
    if(!error)
    {
        const manipulationTool = cheerio.load(html);
        let allAnchors = manipulationTool(".no-underline.d-flex.flex-column");
        
        for(let i=0;i<allAnchors.length;i++)
        {
            topicProcessor("https://github.com" + manipulationTool(allAnchors[i]).attr("href"),manipulationTool(manipulationTool(allAnchors[i]).find("p")[0]).text().trim());
        
        }
    }
}

function topicProcessor(url,name)
{
    request(url,function(error,response,html){
        const mt = cheerio.load(html);
        let allHeadings = mt(".f3.color-text-secondary.text-normal.lh-condensed");
        allHeadings = allHeadings.slice(0 , 5);

        for(let i = 0; i<allHeadings.length ; i++){
            console.log(mt(mt(allHeadings[i]).find("a")[1]).text().trim());
            console.log("https://github.com/" + mt(mt(allHeadings[i]).find("a")[1]).attr("href"));
            console.log("__________");
        }
    });
}