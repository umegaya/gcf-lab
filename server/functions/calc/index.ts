import { Request, Response } from 'express';
import { Config } from '../../common/config';
const sha3_512 = require('js-sha3').sha3_512;

export var calc = async (req: Request, res: Response) => {
    res.status(200);
    res.send(sha3_512.update(req.body.data).hex() + "\n");
}
