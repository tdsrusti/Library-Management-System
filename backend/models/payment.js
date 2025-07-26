// server/models/payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  textbookId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Textbook', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['view', 'download'], 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  sessionId: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Payment', paymentSchema);