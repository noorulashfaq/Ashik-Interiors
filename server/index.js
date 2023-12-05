const expRef = require('express')
const sqlRef = require('mysql2')
const app = expRef()
const cors=require('cors')

const db = sqlRef.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ashik_interiors'
})

app.use(cors())
app.use(expRef.json())
app.use(expRef.urlencoded({extended:true}))

db.connect(()=>{
    console.log('Database connected')
})

app.post('/insert',async(req,res)=>{
    const {customer_name,customer_phone_number,customer_address} = req.body
    const sql = "insert into customer_details (customer_name,customer_phone_number,customer_address) values (?,?,?)"
    //update mec_students set DOB=?, Age=? where id=?
    db.query(sql,[customer_name,customer_phone_number,customer_address],(err,result)=>{
        if(err){
            res.status(500).json({"error":err.message})
            return
        }
        res.status(200).json({"message":result.affectedRows})
    })
})

app.get('/list',async(req,res)=>{
    const sql = "select * from customer_details"
    //update mec_students set DOB=?, Age=? where id=?
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).json({"error":err.message})
        }
        else if(result.length==0){
            res.status(404).json({"message":"No data found"})
            return
        }
        res.status(200).json({result})
    })
})

app.listen(1122, ()=>{
    console.log('Server started')
})

https://www.pwc.com/us/en/services/alliances/assets/pwc-generative-ai-chatbot-using-llama2-on-aws.pdf
