const request = require("request");
const cheerio = require("cheerio");
let fs = require("fs");
let data ={};

request("https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/full-scorecard",callback);

// word wrap -- Alt+Z

function callback(error,response,html)
{
    if(!error)
    {
        const manipulationTool = cheerio.load(html);
        
        let allPlayerAnchors= manipulationTool(".Collapsible__contentInner tbody a.small");
        for( let i =0; i<allPlayerAnchors.length;i++){
            profileProcessor(manipulationTool(allPlayerAnchors[i]).text(),"https://www.espncricinfo.com" + manipulationTool(allPlayerAnchors[i]).attr('href'));
        }
        
    }
}

function profileProcessor(name,url){
    request(url, function(error,response,html){
            const manipulationTool = cheerio.load(html);
            let list =manipulationTool(".player-card-description.gray-900");
            data[name] = manipulationTool(list[1]).text();
            fs.writeFileSync("data.json",JSON.stringify(data));
        });
}