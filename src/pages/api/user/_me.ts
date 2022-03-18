import { withSession } from "@middlewares/session.middleware";

export default withSession(async (req, res) => {
  const { user } = req.session;

  if (!user) {
    return res.status(401).json({
      success: false,
      error: "Il faut être connecté.",
    });
  }

  return res.status(200).json({
    success: true,
    user,
  });
});
