import { Response, Request } from "express"
import { TOKEN_SECRET } from "../const/share"

const jwt = require('jsonwebtoken')

const authMiddleware = (req: Request, res: Response, next: any) => {
    
    if (req.originalUrl.startsWith("/user/login")) {
        next()
        return
    }

    const token = req.headers.authorization
    if (!token) res.status(406).json({error: "please provide a token"})
    else {
        jwt.verify(token.split(" ")[1], TOKEN_SECRET, (err: any, value: any) => {
            if (err) res.status(403).json({error: 'failed to authenticate token'})
            //req.user = value.data
            next()
        })
    }
}

export { authMiddleware }