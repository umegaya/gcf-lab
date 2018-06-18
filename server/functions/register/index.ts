import { Request, Response } from 'express';
import { GetDB, Database } from '../../database/Database';
import { User } from "../../database/entities/User";


export var register = async (req: Request, res: Response) => {
    try {
        var db: Database = await GetDB();

        console.log("Inserting a new user into the database...");
        const user = new User();
        const userRepo = db.getRepository(User);
        user.name = req.body.name;

        await userRepo.save(user);
        console.log("Saved a new user with id: " + user.id);
        
        res.status(200);
        res.send({
            id: user.id
        });
    } catch (e) {
        res.status(500);
        res.send(e);
    }
}
