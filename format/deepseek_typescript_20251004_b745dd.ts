import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventoryListComponent } from './components/inventory-list/inventory-list.component';
import { InventoryDetailComponent } from './components/inventory-detail/inventory-detail.component';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryListComponent,
    InventoryDetailComponent,
    AddItemFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }