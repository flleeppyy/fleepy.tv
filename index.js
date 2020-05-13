const path = require("path")

const express = require("express")
const app = express() // let app be express()

const port = 8001

app.use('/assets', express.static(__dirname + '/public/assets')) // Static route, /src serves anything in the public/assets folder
app.get('/', (req, res) => {
    res.sendFile(
            path.join(__dirname, 'public/index.html')
        )
        /*
         .catch(e => { // If theres an error (most like)
            res.status(404).sendFile(path.join(__dirname, 'public/fuckywucky.html')) // show an error page (just sending pure html text wont cut it)
        })
        */

})

app.listen(port, () => console.log(`listening at http://localhost:${port}`)) // listen the server, make it live