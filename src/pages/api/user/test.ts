import { withSession } from '@middlewares/session.middleware';

export default withSession(async (req, res) => {
  return res.json({
    user: req.session.get('user')
  })
})