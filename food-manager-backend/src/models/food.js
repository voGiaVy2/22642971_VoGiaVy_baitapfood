const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    tenThucPham: {
      type: String,
      required: [true, 'Vui lòng nhập tên thực phẩm'],
      trim: true,
    },
    gia: {
      type: Number,
      required: [true, 'Vui lòng nhập giá'],
      min: [0, 'Giá phải lớn hơn 0'],
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
  }
);

module.exports = mongoose.model('Food', foodSchema);
