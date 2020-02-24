import express,{ Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";
import {getDb  } from "./db/mongo";
import router from "./routes/router";

export class  App{
    private app:Application;
  constructor(private port?:number|string) {
        config();
        this.database();
        
        this.app=express();        
        this.settings();
        this.middlewares();
        this.routes();        
    }

    settings(){
        this.app.set('port',process.env.PORT||this.port||3000);
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(morgan('dev'));
    }
    database(){
        getDb();
    }

    routes(){
        //this.app.use(IndexRoutes);
        this.app.use(router);
    }


    async listen(){                
        const appListen:any  =await this.app.listen(this.app.get('port'));
        console.log("Server on port ", this.app.get('port'));
        return appListen
        
    }
}