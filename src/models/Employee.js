import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide employee name'],
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    phone: String,
    position: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      enum: ['المبيعات', 'المحاسبة', 'الهندسة', 'الإنتاج', 'الموارد البشرية', 'الإدارة'],
    },
    salary: {
      type: Number,
      required: [true, 'Please provide salary'],
      min: [0, 'Salary cannot be negative'],
    },
    hireDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['نشط', 'إجازة', 'إيقاف', 'استقالة'],
      default: 'نشط',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    bank: {
      accountName: String,
      accountNumber: String,
      bankName: String,
      iban: String,
    },
    emergency: {
      name: String,
      phone: String,
      relation: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Employee', employeeSchema);
