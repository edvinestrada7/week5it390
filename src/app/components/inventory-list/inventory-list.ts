import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryItem } from '../../models/inventory-item';
import { InventoryService } from '../../services/inventory';

@Component({
  selector: 'app-inventory-list',
  imports: [CommonModule],
  templateUrl: './inventory-list.html',
  styleUrl: './inventory-list.css'
})
export class InventoryList implements OnInit {
  inventoryItems: InventoryItem[] = [];
  @Output() itemSelected = new EventEmitter<InventoryItem>();

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryItems = this.inventoryService.getInventoryItems();
  }

  onItemSelect(item: InventoryItem): void {
    this.itemSelected.emit(item);
    this.inventoryService.setSelectedItem(item);
  }

  getStockStatus(stock: number): string {
    if (stock === 0) return 'out-of-stock';
    if (stock < 10) return 'low-stock';
    return 'in-stock';
  }
}
