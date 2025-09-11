import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import CodeFile from '../models/CodeFile.js';
import { attachDbUser } from '../middleware/attachDbUser.js';

const router = Router();

// All routes require auth and db user
router.use(requireAuth());
router.use(attachDbUser);

// Create a new code file
router.post('/', async (req, res) => {
  const { title = 'Untitled', language = 'javascript', content = '' } = req.body || {};
  const doc = await CodeFile.create({
    userId: req.dbUser._id,
    title,
    language,
    content,
  });
  res.status(201).json(doc);
});

// List my files
router.get('/', async (req, res) => {
  const docs = await CodeFile.find({ userId: req.dbUser._id }).sort({ updatedAt: -1 });
  res.json(docs);
});

// Get one file
router.get('/:id', async (req, res) => {
  const doc = await CodeFile.findOne({ _id: req.params.id, userId: req.dbUser._id });
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
});

// Update file
router.put('/:id', async (req, res) => {
  const { title, language, content } = req.body || {};
  const doc = await CodeFile.findOneAndUpdate(
    { _id: req.params.id, userId: req.dbUser._id },
    {
      $set: {
        ...(title !== undefined && { title }),
        ...(language !== undefined && { language }),
        ...(content !== undefined && { content }),
      },
    },
    { new: true }
  );
  if (!doc) return res.status(404).json({ message: 'Not found' });
  res.json(doc);
});

// Delete file
router.delete('/:id', async (req, res) => {
  const result = await CodeFile.deleteOne({ _id: req.params.id, userId: req.dbUser._id });
  if (result.deletedCount === 0) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
});

export default router;
