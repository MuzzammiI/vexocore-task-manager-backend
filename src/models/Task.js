import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    // Add an index to the 'user' field for fast lookups by user ID.
    index: true, 
  },
}, { timestamps: true });

// Add a compound index on 'user' and 'status' for efficient queries
// that find tasks for a specific user with a certain status.
taskSchema.index({ user: 1, status: 1 });

export default mongoose.model('Task', taskSchema);