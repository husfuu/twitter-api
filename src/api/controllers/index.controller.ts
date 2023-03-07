import { NextFunction, Request, Response } from "express";

class IndexController {
    index = async (request: Request, response: Response, next: NextFunction) => {
        try {
            response.sendStatus(200)
        } catch (error) {
            next(error)
        }
    };
}

export default IndexController