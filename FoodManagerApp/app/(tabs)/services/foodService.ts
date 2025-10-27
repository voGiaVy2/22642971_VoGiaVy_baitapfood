import { Food } from './food.types';
import { API_ENDPOINTS } from './api';

export class FoodService {
  static async getAllFoods(): Promise<Food[]> {
    try {
      console.log('Dang lay danh sach tu:', API_ENDPOINTS.GET_ALL);
      
      const response = await fetch(API_ENDPOINTS.GET_ALL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Lay duoc', data.length, 'thuc pham');
      return data;
    } catch (error) {
      console.error('Loi getAllFoods:', error);
      throw error;
    }
  }

  static async createFood(tenThucPham: string, gia: number): Promise<Food> {
    try {
      console.log('Dang them food:', { tenThucPham, gia });
      
      const response = await fetch(API_ENDPOINTS.CREATE, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tenThucPham, gia }),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Response loi:', errorData);
        throw new Error('Khong the them');
      }
      
      const data = await response.json();
      console.log('Da them:', data);
      return data;
    } catch (error) {
      console.error('Loi createFood:', error);
      throw error;
    }
  }

  static async updateFood(id: string, tenThucPham: string, gia: number): Promise<Food> {
    try {
      console.log('Dang cap nhat food:', { id, tenThucPham, gia });
      
      const response = await fetch(API_ENDPOINTS.UPDATE(id), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tenThucPham, gia }),
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Response loi:', errorData);
        throw new Error('Khong the cap nhat');
      }
      
      const data = await response.json();
      console.log('Da cap nhat:', data);
      return data;
    } catch (error) {
      console.error('Loi updateFood:', error);
      throw error;
    }
  }

  static async deleteFood(id: string): Promise<void> {
    try {
      console.log('Dang xoa food voi ID:', id);
      console.log('URL xoa:', API_ENDPOINTS.DELETE(id));
      
      const response = await fetch(API_ENDPOINTS.DELETE(id), {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response loi:', errorText);
        throw new Error(`Khong the xoa (Status: ${response.status})`);
      }
      
      // Parse response JSON từ backend
      const data = await response.json();
      console.log('Da xoa thanh cong:', data.message);
      
    } catch (error) {
      console.error('Loi deleteFood:', error);
      if (error instanceof Error) {
        console.error('Chi tiet loi:', error.message);
      }
      throw error;
    }
  }
}