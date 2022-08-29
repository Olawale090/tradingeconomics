const express = require("express");
var cors = require('cors')
const te = require("tradingeconomics");
var bodyParser = require('body-parser')
const app = express();


te.login();

const cluster = require("cluster")
const os = require("os");
const cpuNumber = os.cpus().length;

app.set("view engine","ejs");
app.use("/script",express.static('script'))
app.use("/style",express.static('style'))
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
app.use(cors())


app.get("/country_news_report",(req,res)=>{
    te.getNews(country = 'china', limit = '4', start = '1').then((data) => {
        res.writeHead(200,{"Content-type" : "application/json"});
        res.end(JSON.stringify(data));
        console.log(data);      
        return data;
    })
    .catch((err) => console.log(err));
});


if(cluster.isMaster){
    for(let i = 0; i<cpuNumber; i++){
        cluster.fork();
        console.log(cpuNumber + " CPU LENGTH ");
    }

    cluster.on("exit",(worker,code,signal)=>{
        cluster.fork()
        console.log("worker: "+worker);
        console.log("code: "+code);
        console.log("signal: "+signal);
    })

}else{
    app.listen(6600,()=>{
        console.log(`cpu ${process.pid}`);
    });
}


