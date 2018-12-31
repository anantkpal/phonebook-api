import { Schema, model } from 'mongoose';


const ContactSchema = Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: String,
  phone: {
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
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
{
  timestamps: {
    createdAt: 'created_at', updatedAt: 'updated_at',
  },
});

const Contact = model('Contact', ContactSchema);

export default Contact;
