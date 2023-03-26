const app=require('express')()
const cors=require('cors')
const PORT=5005;
const API='https://weather-api.dugun.work/'

app.use(cors())
app.get('/', (req,res)=>{
    const {lat,lng}=req.query
        fetch(`${API}?latitude=${lat}&longitude=${lng}`).then((r)=> r.json()).then((d)=>{
        const {windDirection,windSpeed}=d.data
        res.json({windDirection,windSpeed}).status(200)

    }).catch(()=>{
        res.json({windDirection:-1,windSpeed:-1}).status(500)
    })
})
app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ${PORT}`)
})