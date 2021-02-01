const Express = require("express")
const app = new Express()
const db = require("quick.db")
app.listen(3000, ()=>{
    console.log("Running on port")
})


function add(id, money) {
    if(isNaN(money)) return "You may only add numbers";
    if(money.includes("." || "?" || "+" || "-")) return "Do not use any blocked words :kek:";
    db.add(id, money)
    return "sucsses"
}

function remove(id, money) {
    if(isNaN(money)) return "You may only add numbers";
    if(money.includes("." || "?" || "+" || "-")) return "Do not use any blocked words :kek:";
    db.subtract(id, money)
    return "sucsses"
}
function get(id) {
    if(!id) return false;
    let data = db.get(id)
    if(!data) return "There's no data stored for " + id
    return data;
}

app.get("/add/coins/:guild/:userid/:coins", async(req,res)=> {
    let guild = req.params.guild
    let user = req.params.userid
    let coins = req.params.coins

    if(!guild) return res.send(false)
    if(!user) return res.send(false)
    if(!coins) return res.send(false)
    
    let data = add(`coins_${user}_${guild}`, coins)
    return res.send(data)
})


app.get("/remove/coins/:guild/:userid/:coins", async(req,res)=> {
    let guild = req.params.guild
    let user = req.params.userid
    let coins = req.params.coins

    if(!guild) return res.send(false)
    if(!user) return res.send(false)
    if(!coins) return res.send(false)
    
    let data = remove(`coins_${user}_${guild}`, coins)
    return res.send(data)
})

app.get("/get/:guild/:userid", async(req,res)=> {
    let guild = req.params.guild
    let user = req.params.userid
 
    if(!guild) return res.send(false)
    if(!user) return res.send(false)
     
    let data = get(`coins_${user}_${guild}`)
     return res.send(`${data}`)
})
