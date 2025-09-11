import mongoose from 'mongoose';


const CodeFileSchema = new mongoose.Schema(
{
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
title: { type: String, default: 'Untitled' },
language: { type: String, default: 'javascript' },
content: { type: String, default: '' },
},
{ timestamps: true }
);


export default mongoose.model('CodeFile', CodeFileSchema);