import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { notImplementedHandler } from "@common/not-implemented.handler";
import authCheckMiddleware from "@middlewares/auth-check.middleware";
import { ApiResponse } from "@typing/api-response.interface";

/**
 * Aiguille la requête vers la bonne méthode pour exécuter le traitant approprié.
 *
 * @param {Record<string, NextApiHandler>} handlers Liste des traitants, au plus un par méthode.
 * @param {string|undefined} method Méthode HTTP appelée par la requête.
 * @param {boolean} requiresAuth Whether the route requires the user to be connected. (default = true)
 * @return {NextApiHandler}
 */
export default (
    handlers: Record<string, NextApiHandler>,
    method: string | undefined,
    requiresAuth = true
  ): NextApiHandler =>
  async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
  ): Promise<void> => {
    if (!method) {
      throw new Error("No request method");
    }

    const handler = handlers[method];

    // Calling a route that doesn't have a handler for this specific method
    if (!handler) {
      return notImplementedHandler(req, res);
    }

    if (requiresAuth) {
      return authCheckMiddleware(handler)(req, res);
    } else {
      return handler(req, res);
    }
  };
