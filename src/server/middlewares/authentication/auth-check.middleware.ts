import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@typing/api-response.interface";

/**
 * Checks for authenticated status before allowing or not the request handling to continue.
 *
 * @param {NextApiHandler<ApiResponse>} handler Next handler to call.
 * @return {NextApiHandler<ApiResponse>}
 */
export default (
    handler: NextApiHandler<ApiResponse>
  ): NextApiHandler<ApiResponse> =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
  ): Promise<void> => {
    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        error: "Il faut être connecté.",
      });
    } else {
      return handler(req, res);
    }
  };
