require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/database');
const foodRoutes = require('./routes/foodRoutes');

// Khởi tạo Express app
const app = express();

// =====================================================
// MIDDLEWARE
// =====================================================
app.use(cors()); // Cho phép truy cập từ mọi nguồn (React Native)
app.use(express.json()); // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded body

// =====================================================
// KẾT NỐI DATABASE
// =====================================================
connectDatabase();

// =====================================================
// ROUTES
// =====================================================
app.use('/api/foods', foodRoutes);

// Route test
app.get('/', (req, res) => {
  res.json({
    message: ' Food Manager API - MSSV: 22642971',
    student: 'Vo Gia Vy',
    class: 'DHKTPM17CTT',
    endpoints: {
      'GET /api/foods': 'Lấy tất cả thực phẩm',
      'GET /api/foods/:id': 'Lấy 1 thực phẩm theo ID',
      'POST /api/foods': 'Thêm thực phẩm mới (Body: {tenThucPham, gia})',
      'PUT /api/foods/:id': 'Cập nhật thực phẩm (Body: {tenThucPham, gia})',
      'DELETE /api/foods/:id': 'Xóa thực phẩm',
    },
  });
});

// =====================================================
// LẤY ĐỊA CHỈ IP LOCAL
// =====================================================
const os = require('os');
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

// =====================================================
// KHỞI ĐỘNG SERVER
// =====================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  const localIP = getLocalIP();
  
  console.log('\n' + '='.repeat(60));
  console.log('    FOOD MANAGER API - Vo Gia Vy (22642971)');
  console.log('='.repeat(60));
  console.log('');
  console.log(' Server đang chạy tại:');
  console.log(`    Local:   http://localhost:${PORT}`);
  console.log(`   Network: http://${localIP}:${PORT}`);
  console.log('');
  console.log('='.repeat(60));
  console.log(' ĐỂ KẾT NỐI TỪ ĐIỆN THOẠI (Expo Go):');
  console.log(`   Sử dụng địa chỉ: http://${localIP}:${PORT}/api/foods`);
  console.log('='.repeat(60));
  console.log('');
  console.log(' LƯU Ý QUAN TRỌNG:');
  console.log('   1. Laptop và điện thoại phải cùng mạng WiFi');
  console.log('   2. Tắt Firewall nếu không kết nối được');
  console.log(`   3. Ghi nhớ IP: ${localIP}`);
  console.log('');
  console.log('='.repeat(60) + '\n');
});
