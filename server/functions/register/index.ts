import { Request, Response } from 'express';
import { GetDB, Database } from '../../database/Database';
import {User} from "../../database/entity/User";


export var register = async (req: Request, res: Response) => {
    var db: Database = await GetDB();

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.name = req.body.name;
    await db.manager.save(user);
    console.log("Saved a new user with id: " + user.id);
    
    console.log("Loading users from the database...");
    const users = await db.manager.find(User);
    console.log("Loaded users: ", users);
     
    res.status(200);
    res.send({
        id: user.id
    });
}
