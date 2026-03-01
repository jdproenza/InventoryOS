import React, { useState, Suspense } from 'react';
import { useBackend } from './hooks/useBackend';
import { Role, Product } from './types';

// Lazy load views
const AdminDashboard = React.lazy(() => import('./views/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const SalesCatalog = React.lazy(() => import('./views/SalesCatalog').then(m => ({ default: m.SalesCatalog })));
const InventoryControl = React.lazy(() => import('./views/InventoryControl').then(m => ({ default: m.InventoryControl })));
const LoginView = React.lazy(() => import('./views/LoginView').then(m => ({ default: m.LoginView })));
const ProductDetail = React.lazy(() => import('./views/ProductDetail').then(m => ({ default: m.ProductDetail })));
const RegisterSale = React.lazy(() => import('./views/RegisterSale').then(m => ({ default: m.RegisterSale })));
const WarehouseManagement = React.lazy(() => import('./components/WarehouseManagement').then(m => ({ default: m.WarehouseManagement })));
const POSCheckout = React.lazy(() => import('./views/Sales/POSCheckout').then(m => ({ default: m.POSCheckout })));
const SalesHistory = React.lazy(() => import('./views/Sales/SalesHistory').then(m => ({ default: m.SalesHistory })));

export default function App() {
  const {
    currentUser, login, logout,
    products, users, warehouses, stock, salesQueue, vendors, investments, // Data
    getStockForProduct, getLocationForProduct, // Reads
    updateStock, reserveStock, validateReservation, dispatchReservation, // Transactions
    addProduct, updateProduct, deleteProduct, addUser, updateUser, deleteUser, addWarehouse, updateWarehouse, registerInvestment, receiveInvestment, // Creates & Edits
    addToCart, cart,
    updateInvestment, deleteInvestment,
    transfers, transferStock, confirmTransfer,
    // Sales
    sales,
    customers,
    processSale,
    removeFromCart,
    clearCart,
    updateCartItemQty,
    isOnline,
    predictiveStats,
    reservations
  } = useBackend();

  const [viewState, setViewState] = useState<'HOME' | 'PRODUCT' | 'REGISTER' | 'POS_CHECKOUT'>('HOME');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (!currentUser) {
    return <LoginView onLogin={login} />;
  }

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setViewState('PRODUCT');
  };

  const handleBack = () => {
    setViewState('HOME');
    setSelectedProduct(null);
  };

  const handleRegisterSaleStart = () => {
    setViewState('REGISTER');
  };

  const handleRegisterConfirm = (qty: number) => {
    if (selectedProduct) {
      // PHASE 5: Create a real stock reservation
      reserveStock(selectedProduct.sku, qty, 1, `Solicitado por ${currentUser.name}`);
      alert(`Reserva de stock por ${qty} unidad(es) de ${selectedProduct.name} realizada con éxito.`);
      handleBack();
    }
  };

  const handleConfirmSale = (customerId: string | undefined, paymentMethod: 'CASH' | 'TRANSFER' | 'CREDIT') => {
    if (currentUser?.role === Role.VENDEDOR) {
      // PHASE 5: Create a real stock reservation for each item in cart
      const promises = cart.map(item => {
        const prod = products.find(p => p.sku === item.sku);
        const notes = `Orden de ${currentUser.name} para ${customerId || 'Consumidor Final'} (${paymentMethod})`;
        return reserveStock(item.sku, item.quantity, 1, notes); // Assuming WH 1 for now
      });

      Promise.all(promises).then(() => {
        alert(`Se han solicitado las reservas para ${cart.length} productos. Por favor, espere validación administrativa.`);
        clearCart();
        setViewState('HOME');
      });
      return;
    }

    const success = processSale(cart, customerId, paymentMethod);
    if (success) {
      alert('Venta registrada con éxito');
      setViewState('HOME');
    }
  };

  if (viewState === 'POS_CHECKOUT') {
    return (
      <React.Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <POSCheckout
          cart={cart}
          products={products}
          customers={customers}
          onConfirmSale={handleConfirmSale}
          onCancel={() => setViewState('HOME')}
          onUpdateQty={updateCartItemQty}
          onRemoveItem={removeFromCart}
          user={currentUser}
        />
      </React.Suspense>
    );
  }

  if (viewState === 'REGISTER' && selectedProduct) {
    return (
      <RegisterSale
        product={selectedProduct}
        stock={getStockForProduct(selectedProduct.sku)}
        onConfirm={handleRegisterConfirm}
        onCancel={() => setViewState('PRODUCT')}
      />
    );
  }

  if (viewState === 'PRODUCT' && selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onBack={handleBack}
        onRegisterSale={handleRegisterSaleStart}
        stock={getStockForProduct(selectedProduct.sku)}
      />
    );
  }



  // Role based routing for Home
  if (currentUser.role === Role.VENDEDOR) {
    return (
      <SalesCatalog
        user={currentUser}
        products={products}
        getStock={getStockForProduct}
        cart={cart}
        addToCart={addToCart}
        onLogout={logout}
        onCheckout={() => setViewState('POS_CHECKOUT')}
        onHistory={() => setViewState('SALES_HISTORY')}
      />
    );
  }

  if (currentUser.role === Role.GESTOR_VENTAS) {
    // Gestores might share the AdminDashboard or have a tailored one. 
    // For now, they see the Dashboard with restricted tabs (handled inside AdminDashboard).
    return (
      <AdminDashboard
        user={currentUser}
        products={products}
        users={users}
        warehouses={warehouses}
        salesQueue={[]} // Deprecated in favor of reservations
        stock={stock}
        vendors={vendors}
        investments={investments}
        reservations={reservations}
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
        onAddUser={addUser}
        onUpdateUser={updateUser}
        onDeleteUser={deleteUser}
        onAddWarehouse={addWarehouse}
        onProcessSale={() => { }} // Deprecated
        onRegisterInvestment={registerInvestment}
        onReceiveInvestment={receiveInvestment}
        onRestock={() => { }}
        onDeleteInvestment={deleteInvestment}
        onUpdateInvestment={updateInvestment}
        onTransfer={transferStock}
        onConfirmTransfer={confirmTransfer}
        onUpdateWarehouse={updateWarehouse}
        transfers={transfers}
        sales={sales}
        onLogout={logout}
        isOnline={isOnline}
        predictiveStats={predictiveStats}
        onReserve={reserveStock}
        onValidate={validateReservation}
        onDispatch={dispatchReservation}
      />
    );
  }

  if (viewState === 'SALES_HISTORY' && currentUser) {
    return (
      <React.Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <SalesHistory
          sales={sales}
          users={users}
          customers={customers}
          currentUser={currentUser}
          onBack={() => setViewState(currentUser.role === Role.VENDEDOR ? 'CATALOG' : 'HOME')} // Redirect to CATALOG if agent, HOME otherwise
        />
      </React.Suspense>
    );
  }

  if (currentUser.role === Role.JEFE_ALMACEN) {
    return (
      <InventoryControl
        user={currentUser}
        products={products}
        warehouses={warehouses}
        getStock={getStockForProduct}
        getLocation={getLocationForProduct}
        onSelectProduct={handleProductSelect}
        onUpdateStock={updateStock}
        onTransfer={transferStock}
        onConfirmTransfer={confirmTransfer}
        transfers={transfers}
        onLogout={logout}
      />
    );
  }

  if (currentUser.role === Role.ADMIN) {
    return (
      <AdminDashboard
        user={currentUser}
        products={products}
        users={users}
        warehouses={warehouses}
        salesQueue={[]}
        stock={stock}
        vendors={vendors}
        investments={investments}
        reservations={reservations}
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
        onAddUser={addUser}
        onUpdateUser={updateUser}
        onDeleteUser={deleteUser}
        onAddWarehouse={addWarehouse}
        onProcessSale={() => { }}
        onRegisterInvestment={registerInvestment}
        onReceiveInvestment={receiveInvestment}
        onRestock={() => { }}
        onDeleteInvestment={deleteInvestment}
        onUpdateInvestment={updateInvestment}
        onTransfer={transferStock}
        onConfirmTransfer={confirmTransfer}
        onUpdateWarehouse={updateWarehouse}
        transfers={transfers}
        sales={sales}
        onLogout={logout}
        isOnline={isOnline}
        predictiveStats={predictiveStats}
        onReserve={reserveStock}
        onValidate={validateReservation}
        onDispatch={dispatchReservation}
      />
    );
  }

  return <div>Rol Desconocido</div>;
}