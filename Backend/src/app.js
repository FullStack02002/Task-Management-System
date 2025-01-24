import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"


const app=express();


const allowedOrigins = [
    process.env.CORS_ORIGIN_1,
    process.env.CORS_ORIGIN_2,
  ];
  
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true, 
    })
  );

app.use(express.json({}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.send("Hello From Express Server")
})


// route import 

import userRouter from "./routes/user.routes.js"
import taskRouter from "./routes/task.routes.js"



// route declaration

app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter)





export {app};


