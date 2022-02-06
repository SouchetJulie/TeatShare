import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {withSession} from "@middlewares/session.middleware";
import {ApiResponse} from "@typing/api-response.interface";

/**
 * Checks for authenticated status before allowing or not the request handling to continue.
 *
 * @param {NextApiHandler} handler Next handler to call.
 * @return {NextApiHandler}
 */
export default (handler: NextApiHandler) => withSession((req: NextApiRequest, res: NextApiResponse<ApiResponse>): void => {
  if (!req.session.user) {
    res.status(401).json({
      success: false,
      error: 'Il faut être connecté.'
    })
  } else {
    handler(req, res);
  }
});
