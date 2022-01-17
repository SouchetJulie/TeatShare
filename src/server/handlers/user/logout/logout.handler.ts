import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';

import {isUser} from '@services/users.service';
import {withSession} from '@middlewares/session.middleware';
import {IUserPublic} from "@typing/user.interface";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const user: IUserPublic = req.session.user;

    if (!isUser(user)) {
        console.log(`[LOGOUT] Logout failed.`);
        return res.status(200).json({
            success: false,
            error: user['error'] || 'Logout failed.'
        });
    }

    req.session.destroy();
    console.log(`[LOGOUT] Removed session for ${user.email}.`);

    res.status(200).json({
        success: true
    });
};

export const logoutHandler: NextApiHandler = withSession(handler);
