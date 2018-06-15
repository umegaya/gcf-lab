import { Request, Response } from 'express';
import { Config } from '../../common/config';
import { sleep } from '../../common/util';

export var hello = async (req: Request, res: Response) => {
    await sleep(req.body.wait_msec);
    res.status(200);
    res.send("delayed hello: " + req.body.wait_msec + " ms\n");
};
