import { Response,Request } from "express";
export const getTrack=(req:Request,res:Response)=>{
    res.send("track");
}

export const uploadTrack=(req:Request,res:Response)=>{
    res.send("track save");
}