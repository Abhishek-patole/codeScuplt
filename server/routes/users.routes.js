import { Router } from 'express';
import { requireAuth } from '@clerk/express';

const router = Router();

// Example: get current user
router.get('/me', requireAuth(), async (req, res) => {
  const { userId, sessionId } = req.auth;
  res.json({ ok: true, userId, sessionId });
});

export default router;
