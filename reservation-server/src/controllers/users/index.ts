import { Response, Request } from "express"
import { IUser } from "../../types/user"
import User from "../../models/user"
import { TOKEN_SECRET } from "../../const/share" 
import { histogram } from "../prometheus"

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getUsers = async(req: Request, res: Response): Promise<void> => {
    try{
        const end = histogram.startTimer();

        let users: IUser[] | null
        users = await User.find()

        end({ route: req.route.path, code: res.statusCode, method: req.method })
        res.status(200).json({users})
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const addUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const end = histogram.startTimer();
        const body = req.body as Pick<IUser, "userType" | "userName" | "password" | "phone">
        
        const useInDB: IUser | null = await User.findOne({userName: body.userName})
        if (useInDB !== null) {
            res.status(406).send("User already exists")
            return
        }

        let hash = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));
        const user: IUser = new User({
            userType: body.userType,
            userName: body.userName,
            password: hash,
            phone: body.phone
        })
        const newUser: IUser = await user.save();

        end({ route: req.route.path, code: res.statusCode, method: req.method })
        res.status(201).json({message: "User added", user: newUser})
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const updateUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const end = histogram.startTimer();

        const id = req.params.id
        const body = req.body as Pick<IUser, "userType" | "userName" | "password" | "phone">
        const updateUser: IUser | null = await User.findByIdAndUpdate(id, body)
        
        end({ route: req.route.path, code: res.statusCode, method: req.method })
        res.status(200).json({
            message: "User updated",
            user: updateUser
        })
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const deleteUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const end = histogram.startTimer();
        
        const deleteUser: IUser | null = await User.findByIdAndDelete (
            req.params.id
        )
        
        end({ route: req.route.path, code: res.statusCode, method: req.method })
        res.status(200).json({
            message: "User deleted",
            user: deleteUser
        })
    } catch(error) {
        console.log(error);
        res.status(500).send(error);
    }
}

const userLogin = async(req: Request, res: Response): Promise<void> => {
    try{
        const body = req.body as Pick<IUser, "userName" | "password">
        const user: IUser | null = await User.findOne({userName: body.userName})
        if (user === null) {
            res.status(404).send("User not found")
            return
        }
        bcrypt.compare(body.password, user?.password).then((success: boolean) => {
            if (success !== true) {
                res.status(403).send("Failed to login")
                return
            }
            let userToken = jwt.sign({data: user}, TOKEN_SECRET, {expiresIn: '24h'})
            res.status(200).json({user: user, token: userToken})
        });
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

export { getUsers, addUser, updateUser, deleteUser, userLogin }