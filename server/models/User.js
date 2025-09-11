import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema(
{
clerkId: { type: String, unique: true, index: true, required: true },
email: { type: String },
username: { type: String },
name: { type: String },
imageUrl: { type: String },
},
{ timestamps: true }
);


export default mongoose.model('User', UserSchema);