const request = require("request");
const cheerio = require("cheerio");

request("https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/ball-by-ball-commentary",callback);

// word wrap -- Alt+Z

function callback(error,response,html)
{
    if(!error)
    {
        const manipulationTool = cheerio.load(html);
        let comments = manipulationTool(".col-14.col-md-15.col-lg-14 .match-comment-long-text p");
        let reqcomment = manipulationTool(comments[0]).text();

        console.log(reqcomment);
    }
}