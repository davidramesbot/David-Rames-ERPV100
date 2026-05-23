import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeIn: {
      type: String,
      default: null,
    },
    timeOut: {
      type: String,
      default: null,
    },
    workedHours: {
      type: Number,
      default: 0,
    },
    overtime: {
      type: Number,
      default: 0,
    },
    deduction: {
      type: Number,
      default: 0,
    },
    deductionReason: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['حاضر', 'غائب', 'إجازة', 'مرض'],
      default: 'حاضر',
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });
attendanceSchema.index({ date: 1 });

export default mongoose.model('Attendance', attendanceSchema);
