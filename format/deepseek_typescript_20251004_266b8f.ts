import { Component, Output, EventEmitter } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory-item';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css']
})
export class AddItemFormComponent {
  @Output() itemAdded = new EventEmitter<void>();

  newItem: Omit<InventoryItem, 'id' | 'lastUpdated'> = {
    name: '',
    category: '',
    price: 0,
    stock: 0,
    description: '',
    image: 'https://via.placeholder.com/300/4F46E5/FFFFFF?text=New+Item',
    sku: ''
  };

  categories: string[] = ['Electronics', 'Furniture', 'Home', 'Office Supplies', 'Clothing', 'Books'];

  showForm = false;

  constructor(private inventoryService: InventoryService) {}

  generateSKU(): void {
    const categoryPrefix = this.newItem.category.substring(0, 4).toUpperCase();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.newItem.sku = `${categoryPrefix}-${randomNum}`;
  }

  onCategoryChange(): void {
    if (this.newItem.category) {
      this.generateSKU();
    }
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.inventoryService.addItem(this.newItem);
      this.resetForm();
      this.itemAdded.emit();
      this.showForm = false;
    }
  }

  resetForm(): void {
    this.newItem = {
      name: '',
      category: '',
      price: 0,
      stock: 0,
      description: '',
      image: 'https://via.placeholder.com/300/4F46E5/FFFFFF?text=New+Item',
      sku: ''
    };
  }

  isFormValid(): boolean {
    return !!(
      this.newItem.name &&
      this.newItem.category &&
      this.newItem.price > 0 &&
      this.newItem.stock >= 0 &&
      this.newItem.description &&
      this.newItem.sku
    );
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }
}