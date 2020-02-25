import { Response, Request, } from "express";
import Multer, { StorageEngine } from "multer";
import { getDb } from "../db/mongo";
import { Db, GridFSBucket, GridFSBucketWriteStream, ObjectID, GridFSBucketReadStream } from "mongodb";
import { Readable } from "stream";
export const getTrack = async (req: Request, res: Response) => {
    let id: ObjectID;
    try {
        id = new ObjectID(req.params.trackID);

    } catch (err) {
        return res.status(400).json({ message: "invalid Track Id in url" });
    }

    res.set('Content-type', 'audio/mp3');
    res.set('Accept-ranges', 'bytes');


    let db: Db = getDb();
    let bucket: GridFSBucket = new GridFSBucket(db, { bucketName: 'tracks' });

    let downloadStream: GridFSBucketReadStream = bucket.openDownloadStream(id);

    downloadStream.on('data', chunk => {
        res.write(chunk);
    });

    downloadStream.on('error', () => {
        res.sendStatus(404);
    });

    downloadStream.on('end', () => {
        res.end();
    });






}

export const uploadTrack = (req: Request, res: Response) => {
    const storage: StorageEngine = Multer.memoryStorage();
    const upload = Multer({
        storage,
        limits: {
            fields: 1,//numero de campos filename
            fileSize: 6E6,
            files: 1,
            parts: 2//numero de partes tack y filename
        }
    });

    upload.single("track")(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: err.message })
        }
        else if (!req.body.name) {
            return res.status(400).json({ message: "no track name in request body" })
        }
        const readableTrackStream: Readable = new Readable();
        readableTrackStream.push(req.file.buffer);
        readableTrackStream.push(null);//end file



        let filename = req.body.name;
        let db: Db = getDb();
        let bucket: GridFSBucket = new GridFSBucket(db, { bucketName: 'tracks' });

        let uploadStream: GridFSBucketWriteStream = bucket.openUploadStream(filename);
        const id = uploadStream.id;

        readableTrackStream.pipe(uploadStream);

        uploadStream.on('error', () => {
            return res.status(500).json({ message: "Error upload your file" });
        })
        uploadStream.on("finish", () => {
            return res.status(201).json({ message: "File upload Succesfully", id });
        })


    })


}