import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
      auto: true,
    },
    client: {
      type: String,
      required: [true, 'Please provide client name'],
      trim: true,
    },
    product: {
      type: String,
      required: [true, 'Please provide product name'],
    },
    contractValue: {
      type: Number,
      required: [true, 'Please provide contract value'],
      min: [0, 'Contract value cannot be negative'],
    },
    engStage: {
      type: String,
      enum: [
        'initial_design',
        'design_discussion',
        'design_approval',
        'design_pricing',
        'dimension_match',
        'job_order',
        'job_order_review',
      ],
      default: 'initial_design',
    },
    prdStage: {
      type: String,
      enum: [
        'operation',
        'cutting',
        'tape',
        'assembly',
        'finishing',
        'quality',
        'packing',
        'loading',
        'install',
        'delivery',
      ],
      default: null,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    notes: [{
      text: String,
      author: mongoose.Schema.Types.ObjectId,
      createdAt: { type: Date, default: Date.now },
    }],
    attachments: [{
      filename: String,
      url: String,
      uploadedBy: mongoose.Schema.Types.ObjectId,
      uploadedAt: { type: Date, default: Date.now },
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-increment order number
orderSchema.pre('save', async function (next) {
  if (!this.isNew) return next();
  try {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `WO-${(count + 1001).toString()}`;
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('Order', orderSchema);
