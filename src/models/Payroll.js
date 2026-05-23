import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    month: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}$/,
    },
    baseSalary: {
      type: Number,
      required: true,
    },
    overtime: {
      hours: Number,
      rate: Number,
      amount: Number,
    },
    deductions: {
      insurance: Number,
      tax: Number,
      advances: Number,
      other: Number,
      total: Number,
    },
    bonuses: {
      performance: Number,
      incentive: Number,
      total: Number,
    },
    netSalary: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['معلقة', 'موافق عليها', 'مدفوعة'],
      default: 'معلقة',
    },
    approvedBy: mongoose.Schema.Types.ObjectId,
    approvalDate: Date,
    paidDate: Date,
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
payrollSchema.index({ employee: 1, month: 1 }, { unique: true });
payrollSchema.index({ status: 1 });

export default mongoose.model('Payroll', payrollSchema);
