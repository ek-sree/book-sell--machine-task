import { Request, Response } from "express";
import { StatusCode } from "../../interface/enum";

export default class BookController {
    constructor(){

    }

    addBook = async(req: Request, res: Response): Promise<void> =>{
        try {
            console.log(req.body);
        } catch (error) {
            console.log("Error add books",error);
            res.status(StatusCode.InternalServerError).json({ message: 'Internal server error' });
        }
    }
}