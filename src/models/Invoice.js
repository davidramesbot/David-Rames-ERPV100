import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true,
      required: true,
    },
    client: {
      type: String,
      required: [true, 'Please provide client name'],
    },
    items: [
      {
        description: String,
        quantity: Number,
        unitPrice: Number,
        total: Number,
      },
    ],
    subtotal: {
      type: Number,
      default: 0,
    },
    advance: {
      type: Number,
      default: 0,
    },
    remaining: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['معلقة', 'مدفوعة', 'جزئية'],
      default: 'معلقة',
    },
    type: {
      type: String,
      enum: ['فاتورة', 'دفعة'],
      default: 'فاتورة',
    },
    dueDate: Date,
    paidDate: Date,
    notes: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-increment invoice number
invoiceSchema.pre('save', async function (next) {
  if (!this.isNew) return next();
  try {
    const count = await mongoose.model('Invoice').countDocuments();
    this.invoiceNumber = `INV-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('Invoice', invoiceSchema);
