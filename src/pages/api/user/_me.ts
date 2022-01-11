import {withSession} from '@middlewares/session.middleware';
import {IUserPublic} from '@typing/user.interface';

export default withSession(async (req, res) => {
    return res.json({
        user: req.session.get<IUserPublic>('user')
    });
})
