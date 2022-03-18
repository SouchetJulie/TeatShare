import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { notImplementedHandler } from "@common/not-implemented.handler";

/**
 * Aiguille la requête vers la bonne méthode pour exécuter le traitant approprié.
 *
 * @param {Record<string, NextApiHandler>} handlers Liste des traitants, au plus un par méthode.
 * @param {string|undefined} method Méthode HTTP appelée par la requête.
 * @return {NextApiHandler}
 */
export default (
    handlers: Record<string, NextApiHandler>,
    method: string | undefined
  ): NextApiHandler =>
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const handler =
      (method ? handlers[method] : notImplementedHandler) ||
      notImplementedHandler;
    return handler(req, res);
  };
