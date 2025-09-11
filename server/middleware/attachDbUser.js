import User from '../models/User.js';

export async function attachDbUser(req, res, next) {
  try {
    if (!req.auth?.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    let dbUser = await User.findOne({ clerkId: req.auth.userId });
    if (!dbUser) {
      dbUser = await User.create({ clerkId: req.auth.userId });
    }

    req.dbUser = dbUser;
    next();
  } catch (err) {
    console.error('attachDbUser error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
