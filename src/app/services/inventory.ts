import { Injectable } from '@angular/core';
import { InventoryItem } from '../models/inventory-item';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventoryItems: InventoryItem[] = [
    {
      id: 1,
      name: 'Wireless Mouse',
      category: 'Electronics',
      price: 29.99,
      stock: 15,
      description: 'Ergonomic wireless mouse with precision tracking',
      image: 'https://via.placeholder.com/300/4F46E5/FFFFFF?text=Mouse',
      sku: 'ELEC-MOUSE-001',
      lastUpdated: new Date()
    },
    {
      id: 2,
      name: 'Mechanical Keyboard',
      category: 'Electronics',
      price: 89.99,
      stock: 8,
      description: 'RGB mechanical keyboard with cherry MX switches',
      image: 'https://via.placeholder.com/300/4F46E5/FFFFFF?text=Keyboard',
      sku: 'ELEC-KEY-002',
      lastUpdated: new Date()
    },
    {
      id: 3,
      name: 'Office Chair',
      category: 'Furniture',
      price: 199.99,
      stock: 5,
      description: 'Ergonomic office chair with lumbar support',
      image: 'https://via.placeholder.com/300/4F46E5/FFFFFF?text=Chair',
      sku: 'FURN-CHAIR-003',
      lastUpdated: new Date()
    },
    {
      id: 4,
      name: 'Desk Lamp',
      category: 'Home',
      price: 24.99,
      stock: 20,
      description: 'LED desk lamp with adjustable brightness',
      image: 'https://via.placeholder.com/300/4F46E5/FFFFFF?text=Lamp',
      sku: 'HOME-LAMP-004',
      lastUpdated: new Date()
    }
  ];

  private selectedItemSubject = new BehaviorSubject<InventoryItem | null>(this.inventoryItems[0]);
  public selectedItem$ = this.selectedItemSubject.asObservable();

  constructor() {}

  getInventoryItems(): InventoryItem[] {
    return this.inventoryItems;
  }

  getInventoryItemsObservable(): Observable<InventoryItem[]> {
    return new Observable(observer => {
      observer.next(this.inventoryItems);
      observer.complete();
    });
  }

  getItemById(id: number): InventoryItem | undefined {
    return this.inventoryItems.find(item => item.id === id);
  }

  addItem(item: Omit<InventoryItem, 'id' | 'lastUpdated'>): void {
    const newItem: InventoryItem = {
      ...item,
      id: this.generateId(),
      lastUpdated: new Date()
    };
    this.inventoryItems.push(newItem);
  }

  updateItem(updatedItem: InventoryItem): void {
    const index = this.inventoryItems.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.inventoryItems[index] = {
        ...updatedItem,
        lastUpdated: new Date()
      };
    }
  }

  deleteItem(id: number): void {
    this.inventoryItems = this.inventoryItems.filter(item => item.id !== id);
    // If deleted item was selected, select first item or null
    if (this.selectedItemSubject.value?.id === id) {
      this.selectedItemSubject.next(this.inventoryItems[0] || null);
    }
  }

  updateStock(id: number, newStock: number): void {
    const item = this.getItemById(id);
    if (item) {
      this.updateItem({
        ...item,
        stock: newStock
      });
    }
  }

  setSelectedItem(item: InventoryItem | null): void {
    this.selectedItemSubject.next(item);
  }

  private generateId(): number {
    return Math.max(...this.inventoryItems.map(item => item.id)) + 1;
  }
}