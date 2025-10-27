const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

//  GET - Lấy tất cả thực phẩm
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    console.log(` GET: Trả về ${foods.length} thực phẩm`);
    res.json(foods);
  } catch (error) {
    console.error(' GET Error:', error);
    res.status(500).json({ message: error.message });
  }
});

//  GET - Lấy 1 thực phẩm theo ID
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Không tìm thấy thực phẩm' });
    }
    console.log(` GET by ID: ${food.tenThucPham}`);
    res.json(food);
  } catch (error) {
    console.error(' GET by ID Error:', error);
    res.status(500).json({ message: error.message });
  }
});

//  POST - Thêm thực phẩm mới
router.post('/', async (req, res) => {
  try {
    const { tenThucPham, gia } = req.body;

    // Validate
    if (!tenThucPham || !gia) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
    }

    const food = new Food({
      tenThucPham,
      gia: Number(gia),
    });

    const newFood = await food.save();
    console.log(` POST: Đã thêm "${newFood.tenThucPham}" - Giá: ${newFood.gia}đ`);
    res.status(201).json(newFood);
  } catch (error) {
    console.error(' POST Error:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT - Cập nhật thực phẩm
router.put('/:id', async (req, res) => {
  try {
    const { tenThucPham, gia } = req.body;

    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Không tìm thấy thực phẩm' });
    }

    // Cập nhật thông tin
    food.tenThucPham = tenThucPham || food.tenThucPham;
    food.gia = gia !== undefined ? Number(gia) : food.gia;

    const updatedFood = await food.save();
    console.log(` PUT: Đã cập nhật "${updatedFood.tenThucPham}" - Giá: ${updatedFood.gia}đ`);
    res.json(updatedFood);
  } catch (error) {
    console.error(' PUT Error:', error);
    res.status(400).json({ message: error.message });
  }
});

//  DELETE - Xóa thực phẩm
router.delete('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Không tìm thấy thực phẩm' });
    }

    await Food.findByIdAndDelete(req.params.id);
    console.log(` DELETE: Đã xóa "${food.tenThucPham}"`);
    res.json({ message: 'Đã xóa thực phẩm thành công' });
  } catch (error) {
    console.error(' DELETE Error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;