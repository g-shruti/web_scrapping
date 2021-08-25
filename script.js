const request = require("request");
const cheerio = require("cheerio");

request("",callback);

function callback(error,response,html)
{
    if(!error)
    {
        const manipulationTool = cheerio.load(html);
        let comment = manipulationTool().text;
        console.log(comment);
    }
}