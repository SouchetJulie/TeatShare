import {withSession} from '@middlewares/session.middleware';
import {IUserPublic} from '@typing/user.interface';
import { ISessionApiRequest } from "@typing/session-api-request.interface";

export default withSession(async (req: ISessionApiRequest, res) => {
    return res.json({
        user: req.session.get<IUserPublic>('user')
    });
})
