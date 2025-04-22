import { Request, Response } from "express"


export const getUser = (req: Request, res: Response) => {
    console.log(req.url)
    res.status(200).json({"name": "krishna"});
}