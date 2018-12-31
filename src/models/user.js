import { Schema, model } from 'mongoose';


const UserSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: {
    createdAt: 'created_at', updatedAt: 'updated_at',
  },
});

const User = model('User', UserSchema);

export default User;
