import { Component, OnInit, Input } from '@angular/core';
import { InventoryItem } from '../../models/inventory-item';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css']
})
export class InventoryDetailComponent implements OnInit {
  @Input() selectedItem: InventoryItem | null = null;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {}

  onStockUpdate(change: number): void {
    if (this.selectedItem) {
      const newStock = Math.max(0, this.selectedItem.stock + change);
      this.inventoryService.updateStock(this.selectedItem.id, newStock);
      // Update local selected item
      this.selectedItem = {
        ...this.selectedItem,
        stock: newStock
      };
    }
  }

  onDeleteItem(): void {
    if (this.selectedItem) {
      this.inventoryService.deleteItem(this.selectedItem.id);
      this.selectedItem = null;
    }
  }

  getStockStatus(stock: number): { class: string, text: string } {
    if (stock === 0) return { class: 'out-of-stock', text: 'Out of Stock' };
    if (stock < 10) return { class: 'low-stock', text: 'Low Stock' };
    return { class: 'in-stock', text: 'In Stock' };
  }
}