const Axios = require("axios")
const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
var colors = require('colors') 
var bodyParser = require('body-parser')

app.use(cors())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.post("*",async (req,res)=>{
    let url = "http://beexpr.staging.global-connect.asia"+req.url
    // let url = "http://odoo.beexprss.com"+req.url

    const data = req.body
    
    Axios.default.post(url,data)
    .then(data=>{
        // if(data.data.result.error) return res.status(400).send(data.data)
        return res.send( data.data)
    })
    .catch(error=>{
        console.error(error)
        res.status(400).send(error)
    })

})

const logo =`
  _   _   _   _   _   _   _   _   _   _   _    _    _    _   _   _   _   _   _   
 / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\/ \\/ \\/ \\/ \\/ \\
( G | L | O | B | A |  L |  | C | O | N | N | E | C | T |  | A | S | I | A |  | )
 \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ 
`

app.listen(port, () => {
    console.log(colors.rainbow(logo))
    console.log("Status           : " + colors.green("Start"))
    console.log("Name             : " + colors.green("Jumper Server"))
    console.log(`Version          : ${colors.green(process.env.VERSION||"1.0.0.1")}`)
    console.log("Port Number      : " + colors.green(port));
    console.log(`Server Listening : ${colors.green("http://localhost"+port)}`)
})

