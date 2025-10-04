import { Component, OnInit } from '@angular/core';
import { InventoryItem } from './models/inventory-item';
import { InventoryService } from './services/inventory.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Inventory Management System';
  selectedItem: InventoryItem | null = null;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    // Subscribe to selected item changes
    this.inventoryService.selectedItem$.subscribe(item => {
      this.selectedItem = item;
    });
  }

  onItemSelected(item: InventoryItem): void {
    this.selectedItem = item;
    this.inventoryService.setSelectedItem(item);
  }

  onItemAdded(): void {
    // Item added, no need to do anything specific as the service handles it
  }
}