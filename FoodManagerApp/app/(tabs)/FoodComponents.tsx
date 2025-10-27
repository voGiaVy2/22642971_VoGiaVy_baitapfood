import React, { useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { Food, FoodItemProps, FoodFormProps, FoodListProps } from '@/app/(tabs)/services/food.types';

export const FoodItem: React.FC<FoodItemProps> = ({ item, onEdit, onDelete }) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemInfo}>
        <Text style={styles.name}>{item.tenThucPham}</Text>
        <Text style={styles.price}>Giá: {item.gia.toLocaleString('vi-VN')} đ</Text>
      </View>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={[styles.btn, styles.btnEdit]}
          onPress={() => onEdit(item)}
        >
          <Text style={styles.btnText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnDelete]}
          onPress={() => onDelete(item._id)}
        >
          <Text style={styles.btnText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const FoodForm: React.FC<FoodFormProps> = ({
  editId,
  tenThucPham,
  gia,
  onTenThucPhamChange,
  onGiaChange,
  onAdd,
  onUpdate,
  onCancelEdit,
  tenRef,
  giaRef,
}) => {
  return (
    <>
      {editId && (
        <View style={styles.editMode}>
          <Text style={styles.editModeText}>🔄 Đang chỉnh sửa</Text>
          <TouchableOpacity onPress={onCancelEdit}>
            <Text style={styles.cancelText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          ref={tenRef}
          placeholder="Tên thực phẩm"
          style={[styles.input, editId && styles.inputEditing]}
          onChangeText={onTenThucPhamChange}
          value={tenThucPham}
        />
        <TextInput
          ref={giaRef}
          placeholder="Giá"
          style={[styles.input, editId && styles.inputEditing]}
          keyboardType="numeric"
          onChangeText={onGiaChange}
          value={gia}
        />
        {editId ? (
          <View style={styles.editButtons}>
            <View style={styles.btnWrapper}>
              <Button title="Lưu" color="#388E3C" onPress={() => onUpdate(editId)} />
            </View>
            <View style={styles.btnWrapper}>
              <Button title="Hủy" color="#757575" onPress={onCancelEdit} />
            </View>
          </View>
        ) : (
          <Button title="Thêm" color="#388E3C" onPress={onAdd} />
        )}
      </View>
    </>
  );
};

export const FoodList: React.FC<FoodListProps> = ({
  foods,
  loading,
  refreshing,
  onRefresh,
  onEdit,
  onDelete,
}) => {
  const renderItem = useCallback(
    ({ item }: { item: Food }) => (
      <FoodItem item={item} onEdit={onEdit} onDelete={onDelete} />
    ),
    [onEdit, onDelete]
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={foods}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#2E7D32']}
        />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Chưa có thực phẩm nào</Text>
        </View>
      }
    />
  );
};


const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C8E6C9',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#81C784',
  },
  itemInfo: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 4,
  },
  price: {
    color: '#33691E',
    fontSize: 14,
    fontWeight: '500',
  },
  btnGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 50,
    alignItems: 'center',
  },
  btnEdit: {
    backgroundColor: '#2E7D32',
  },
  btnDelete: {
    backgroundColor: '#C62828',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  editMode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFB74D',
  },
  editModeText: {
    color: '#E65100',
    fontWeight: '600',
    fontSize: 14,
  },
  cancelText: {
    color: '#E65100',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputEditing: {
    borderColor: '#FFB74D',
    borderWidth: 2,
    backgroundColor: '#FFFDE7',
  },
  editButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  btnWrapper: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  loadingText: {
    marginTop: 10,
    color: '#2E7D32',
    fontSize: 16,
  },
  emptyContainer: {
    paddingTop: 80,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#757575',
  },
});