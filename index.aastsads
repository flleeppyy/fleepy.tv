// you may be asking, why the fuck did you run your front end on node when nginx can just provide the files without a server in the /var/www directory?
// because fuck you thats why

const path = require("path")

const express = require("express")
const app = express() // let app be express()
const cheerio = require('cheerio');
const fs = require('fs')
const bytes = require('bytes');
const requestp = require('request-promise')

const serveIndex = require('serve-index')
const rateLimit = require("express-rate-limit"); // https://github.com/nfriedly/express-rate-limit

const port = 8001

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    message: { status: false, message: "Too many requests, please try again after 15 minutes" },
    onLimitReached: function(req, res, options) {
        console.log(`IP: ${req.ip} - Too many requests - Rate Limited`);
    }
});


/*
let quota;

async function checkquota() {
    try {
        const res = await requestp.get({url: "https://api.linode.com/v4/linode/instances/20200727/transfer", headers: {'Authorization': 'Bearer 2209efca6d32f79a8339f5ec64e9d4b37d0d82c07179ee1e9a98f0f20f5aa3f3'}})
        data = JSON.parse(res)
        quota = bytes(data['used'], {decimalPlaces: 0, unit: "GB"})
        // console.log(quota);
        return quota
    } catch (e) {
        console.log(e)
        return null
    }
}


interval = setInterval(() => {
    checkquota()
}, 1800000);


checkquota()

app.use('/tf2classic/getquota', limiter)
app.get('/tf2classic/getquota', (req, res) => {
    res.send({quota: `${quota} Used - Linode`, quotaraw: Number(quota.split('GB')[0])})
    // res.send({quota: "838GB", quotaraw: 838})

})
*/

app.use((req,res,next) => {
    res.setHeader('x-powered-by', 'Chen')
    res.setHeader('server', 'Nazrin/1.2.3 (Unix)')
    res.setHeader('x-favorite-doujins', 'https://nhentai.net/g/249128; https://nhentai.net/g/288583; https://nhentai.net/g/165909; https://nhentai.net/g/266403; https://nhentai.net/g/253006; https://nhentai.net/g/251845; https://nhentai.net/g/85026; https://nhentai.net/g/303607; https://nhentai.net/g/153540; https://nhentai.net/g/155384; https://nhentai.net/g/250247; https://nhentai.net/g/250077; https://nhentai.net/g/207790; https://nhentai.net/g/158985; https://nhentai.net/g/289120; https://nhentai.net/g/227161; https://nhentai.net/g/327825; https://nhentai.net/g/199888')
    res.setHeader('x-did-you-know', "i fucking love chen, she is fucking adorable and i honestly want to fuck her.")
    res.setHeader('x-do-not-do-the-following', "1. fuck anime girls if they do not enjoy it; 2. fuck anime girls in their sleep; 3. fuck anime girls without giving headpats and kisses")
    next()
})
app.use('/', express.static(__dirname + '/public')) // Static route; DO NOT ADD TRAILING SLASH IN EXPRESS.STATIC

app.use('/tf2classic/dl', express.static('public/tf2classic/dl'), serveIndex('public/tf2classic/dl', {'icons': true}))
// app.use('/tf2classic/dl', (req, res) => {
    // res.send(serveIndex(__dirname + '/public/tf2classic/dl'))
// });

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