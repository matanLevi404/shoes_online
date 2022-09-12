import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAddFormComponent } from './comps/admin-add-form/admin-add-form.component';
import { CheckoutComponent } from './comps/checkout/checkout.component';
import { InvoiceComponent } from './comps/invoice/invoice.component';
import { RegisterComponent } from './comps/register/register.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { ReceiptPageComponent } from './pages/receipt-page/receipt-page.component';
import { ShoppingPageComponent } from './pages/shopping-page/shopping-page.component';

const routes: Routes = [
  {
    path: 'shoesOnline/main/category/:category',
    component: ShoppingPageComponent,
  },
  { path: '', component: MainpageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shoesOnline/main/search', component: ShoppingPageComponent },
  { path: 'shoesOnline/main/filterBy', component: ShoppingPageComponent },
  { path: 'shoesOnline/main/cart', component: ShoppingPageComponent },
  { path: 'shoesOnline/main/checkout', component: CheckoutComponent },
  { path: 'shoesOnline/main/receipt', component: ReceiptPageComponent },
  {
    path: 'shoesOnline/main/admin/addProduct',
    component: AdminAddFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
