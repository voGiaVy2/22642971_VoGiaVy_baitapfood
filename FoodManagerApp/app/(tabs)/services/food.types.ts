export interface Food {
  _id: string;  
  tenThucPham: string;
  gia: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface FoodItemProps {
  item: Food;
  onEdit: (item: Food) => void;
  onDelete: (id: string) => void;
}

export interface FoodFormProps {
  editId: string | null;
  tenThucPham: string;
  gia: string;
  onTenThucPhamChange: (text: string) => void;
  onGiaChange: (text: string) => void;
  onAdd: () => void;
  onUpdate: (id: string) => void;
  onCancelEdit: () => void;
  tenRef: React.RefObject<any>;
  giaRef: React.RefObject<any>;
}

export interface FoodListProps {
  foods: Food[];
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  onEdit: (item: Food) => void;
  onDelete: (id: string) => void;
}