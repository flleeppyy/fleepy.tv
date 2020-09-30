// you may be asking, why the fuck did you run your front end on node when nginx can just provide the files without a server in the /var/www directory?
// because fuck you thats why

const path = require("path")

const express = require("express")
const app = express() // let app be express()
const cheerio = require('cheerio');
const fs = require('fs')
const serveIndex = require('serve-index')

const port = 8001

app.use('/', express.static(__dirname + '/public')) // Static route, /src serves anything in the public/assets folder
app.use('/tf2classic/dl', (req, res) => {
    serveIndex(__dirname + '/public/tf2classic/dl')
});

app.use('/tf2classic', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/tf2classic'))
});

app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'public/favicon.ico')))
app.get('/', (req, res) => { // The index page
    console.log(`IP: ${req.ip} Requested ${req.url}`) // just do some logging
    res.sendFile(
        path.join(__dirname, 'public/index.html')
    )
    /*
         .catch(e => { // If theres an error (most like)
            res.status(404).sendFile(path.join(__dirname, 'public/fuckywucky.html')) // show an error page (just sending pure html text wont cut it)
       })
        */

});

// Other files and shit

app.get('/cirnobot/strings.json', (req, res) => {
    var html = fs.readFileSync('/mnt/botimagestorage/cirnobot/strings.json', 'utf8');
    var $ = cheerio.load(html);
    var styleNode = '<style>body { white-space: pre }</script>';
    var contribution = '<p>Submit Cirno quotes <a href="https://u.fleepy.tv/cirnobotquotesubmission">here!</a></p>'
    $('body').prepend(contribution);
    $('body').append(styleNode);
    //res.setHeader('Content-Type', 'application/json');
    res.send($.html());
})

app.listen(port, () => console.log(`listening at http://localhost:${port}`)) // listen the server, make it live
