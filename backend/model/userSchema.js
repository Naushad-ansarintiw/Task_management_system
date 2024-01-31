const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  });
  
  

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: {
    type: [taskSchema],
    required: function () {
      // If the role is 'employee', tasks are required
      return this.role === 'employee';
    },
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;