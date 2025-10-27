import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { SafeAreaView, Text, StyleSheet, Alert, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Food } from '@/app/(tabs)/services/food.types';
import { FoodService } from '@/app/(tabs)/services/foodService';
import { FoodForm, FoodList } from '@/app/(tabs)/FoodComponents';
import { testConnection } from '@/app/(tabs)/services/api';

export default function TabOneScreen() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [tenThucPham, setTenThucPham] = useState<string>('');
  const [gia, setGia] = useState<string>('');
  const [editId, setEditId] = useState<string | null>(null);

  const tenRef = useRef<any>(null);
  const giaRef = useRef<any>(null);

  const fetchFoods = useCallback(async () => {
    try {
      setLoading(true);
      const data = await FoodService.getAllFoods();
      setFoods(data);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải danh sách.\nKiểm tra Backend!');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const connected = await testConnection();
      if (connected) {
        fetchFoods();
      }
    };
    init();
  }, [fetchFoods]);

  const memoizedFoods = useMemo(() => foods, [foods]);

  const handleAdd = useCallback(async () => {
    if (!tenThucPham.trim() || !gia.trim()) {
      Alert.alert('Thông báo', 'Nhập đầy đủ thông tin!');
      return;
    }
    try {
      const newFood = await FoodService.createFood(tenThucPham, Number(gia));
      setFoods((prev) => [newFood, ...prev]);
      
      tenRef.current?.clear();
      giaRef.current?.clear();
      setTenThucPham('');
      setGia('');
      
      Alert.alert('Thành công', 'Đã thêm!');
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể thêm');
    }
  }, [tenThucPham, gia]);

  const handleUpdate = useCallback(
    async (id: string) => {
      if (!tenThucPham.trim() || !gia.trim()) {
        Alert.alert('Thông báo', 'Nhập đầy đủ thông tin!');
        return;
      }
      try {
        const updated = await FoodService.updateFood(id, tenThucPham, Number(gia));
        setFoods((prev) => prev.map((item) => (item._id === id ? updated : item)));
        setEditId(null);
        
        tenRef.current?.clear();
        giaRef.current?.clear();
        setTenThucPham('');
        setGia('');
        
        Alert.alert('Thành công', 'Đã cập nhật!');
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể cập nhật');
      }
    },
    [tenThucPham, gia]
  );

  const handleDelete = useCallback((id: string) => {
  console.log('Bat dau xoa food voi ID:', id);
  
  Alert.alert(
    'Xac nhan', 
    'Ban co chac muon xoa thuc pham nay?', 
    [
      { 
        text: 'Huy', 
        style: 'cancel',
        onPress: () => console.log('Da huy xoa')
      },
      {
        text: 'Xoa',
        style: 'destructive',
        onPress: async () => {
          try {
            console.log('Dang goi API xoa...');
            
            await FoodService.deleteFood(id);
            
            console.log('API xoa thanh cong, dang cap nhat UI...');
            
            setFoods((prev) => {
              const newFoods = prev.filter((item) => item._id !== id);
              console.log('So luong food sau khi xoa:', newFoods.length);
              return newFoods;
            });
            
            Alert.alert('Thanh cong', 'Da xoa thuc pham!');
            
          } catch (error) {
            console.error('Loi khi xoa:', error);
            
            let errorMessage = 'Khong the xoa thuc pham';
            
            if (error instanceof Error) {
              errorMessage += `\n\nChi tiet: ${error.message}`;
            }
            
            Alert.alert('Loi', errorMessage);
          }
        },
      },
    ],
    { cancelable: true }
  );
}, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchFoods();
  }, [fetchFoods]);

  const handleEdit = useCallback((item: Food) => {
    setEditId(item._id);
    setTenThucPham(item.tenThucPham);
    setGia(item.gia.toString());
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditId(null);
    setTenThucPham('');
    setGia('');
    tenRef.current?.clear();
    giaRef.current?.clear();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}> food Manager App</Text>
        <FoodForm
          editId={editId}
          tenThucPham={tenThucPham}
          gia={gia}
          onTenThucPhamChange={setTenThucPham}
          onGiaChange={setGia}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onCancelEdit={handleCancelEdit}
          tenRef={tenRef}
          giaRef={giaRef}
        />

        <FoodList
          foods={memoizedFoods}
          loading={loading}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1B5E20',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#558B2F',
    marginBottom: 16,
  },
});