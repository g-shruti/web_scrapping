const request = require("request");
const cheerio = require("cheerio");

request("https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/full-scorecard",callback);

// word wrap -- Alt+Z

function callback(error,response,html)
{
    if(!error)
    {
        const manipulationTool = cheerio.load(html);
        let bothTables= manipulationTool(".table.bowler");

        let player ="";
        let maxWicket = 0;
        for(let i =0; i<bothTables.length;i++)
        {
            let tableRows = manipulationTool(bothTables[i]).find("tbody tr");
            for(let j=0; j<tableRows.length; j++)
            {
                let allRowsColumns = manipulationTool(tableRows[j]).find("td");
                let currentPlayer =manipulationTool(allRowsColumns[0]).text();
                let currentWicket =manipulationTool(allRowsColumns[4]).text();
                if(maxWicket<currentWicket)
                {
                    maxWicket=currentWicket;
                    player= currentPlayer;
                }
            }   
        }
        console.log(player); 
    }
}