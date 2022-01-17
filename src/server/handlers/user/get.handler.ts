import {NextApiRequest, NextApiResponse} from 'next';
import {getAllUsers, getOneUser} from '@services/users.service';

export const userGetAllHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const users = await getAllUsers();
    res.status(200).json({users});
};

export const userGetOneHandler = (_id: string) => async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await getOneUser(_id);

    if ('error' in result) {
        return res.status(404).json({success: false, error: result.error});
    }

    return res.status(200).json({success: true, lesson: result});
};
