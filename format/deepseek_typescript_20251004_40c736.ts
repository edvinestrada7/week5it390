import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InventoryItem } from '../../models/inventory-item';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
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