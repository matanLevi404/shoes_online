import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadingComponent } from './comps/heading/heading.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { PanelaComponent } from './pages/mainpage/panela/panela.component';
import { PanelbComponent } from './pages/mainpage/panelb/panelb.component';
import { PanelcComponent } from './pages/mainpage/panelc/panelc.component';
import { ShoppingPageComponent } from './pages/shopping-page/shopping-page.component';
import { ShoppingLogoComponent } from './comps/shopping-logo/shopping-logo.component';
import { ShoppingNavbarComponent } from './comps/shopping-navbar/shopping-navbar.component';
import { NavOptionsComponent } from './comps/nav-options/nav-options.component';
import { GenderOptionsComponent } from './comps/gender-options/gender-options.component';
import { AuthService } from './services/auth.service';
import { SideNavComponent } from './comps/side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { FilterSelectorsComponent } from './comps/filter-selectors/filter-selectors.component';
import { ProductComponent } from './comps/product/product.component';
import { ProductsService } from './services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductContainerComponent } from './comps/product-container/product-container.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CartComponent } from './comps/cart/cart.component';
import { MatTableModule } from '@angular/material/table';
import { CartService } from './services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CheckoutComponent } from './comps/checkout/checkout.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';

import { InvoiceComponent } from './comps/invoice/invoice.component';
import { CheckoutTableComponent } from './comps/checkout-table/checkout-table.component';
import { RegisterComponent } from './comps/register/register.component';
import { Login2Component } from './comps/login2/login2.component';
import { CheckoutService } from './services/checkout.servie';
import { AdminPopupComponent } from './comps/admin-popup/admin-popup.component';
import { AdminService } from './services/admin.service';
import { AdminAddFormComponent } from './comps/admin-add-form/admin-add-form.component';
import { ReceiptPageComponent } from './pages/receipt-page/receipt-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadingComponent,
    MainpageComponent,
    PanelaComponent,
    PanelbComponent,
    PanelcComponent,
    ShoppingPageComponent,
    ShoppingLogoComponent,
    ShoppingNavbarComponent,
    NavOptionsComponent,
    GenderOptionsComponent,
    SideNavComponent,
    FilterSelectorsComponent,
    ProductComponent,
    ProductContainerComponent,
    CartComponent,
    CheckoutComponent,
    InvoiceComponent,
    CheckoutTableComponent,
    RegisterComponent,
    Login2Component,
    AdminPopupComponent,
    AdminAddFormComponent,
    ReceiptPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatSidenavModule,
    MatTreeModule,
    MatSelectModule,
    HttpClientModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatTooltipModule,
  ],
  providers: [
    AdminService,
    AuthService,
    ProductsService,
    CartService,
    CheckoutService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
