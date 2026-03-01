export enum Role {
  ADMIN = 'ADMIN',
  JEFE_ALMACEN = 'JEFE_ALMACEN',
  GESTOR_VENTAS = 'GESTOR_VENTAS',
  VENDEDOR = 'VENDEDOR'
}

export interface User {
  id: string; // Unique ID
  username: string;
  email: string;
  phone: string;
  role: Role;
  scope: string; // 'Global' | 'Almacén Norte' | Warehouse Name
  avatar: string;
  name: string;
}

export interface Product {
  sku: string;
  name: string; // Composite Name: BaseName (Specs) Brand
  baseName: string; // "El Qué"
  modelOrSpecs: string; // "El Cuánto"
  brand: string; // "El Quién"

  price: number;
  cost: number;
  managerCommission: number;
  extraCommission: number;

  image: string;
  category: string;
  description?: string;
  dimensions?: string;

  tags?: string[];
  specs?: Record<string, string>; // Legacy support or extra specs
  isPublished?: boolean;
}

export interface StockEntry {
  sku: string;
  warehouseId: number;
  quantity: number; // Stock Físico
  reservedQuantity: number; // Stock Bloqueado
  location: string;
}

export interface Warehouse {
  id: number;
  name: string;
  managerId?: string; // Username of the manager
}

export interface CartItem {
  sku: string;
  quantity: number;
}

export interface SaleRequest {
  id: string;
  sku: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  agentName: string;
  timestamp: Date | string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DISPATCHED';
  reservationId?: string;
}

export type ReservationStatus = 'PENDING' | 'VALIDATED' | 'DISPATCHED' | 'EXPIRED' | 'CANCELLED';

export interface Reservation {
  id: string;
  sku: string;
  warehouseId: number;
  quantity: number;
  sellerId: string;
  gestorId?: string;
  status: ReservationStatus;
  notes?: string;
  createdAt: string;
  expiresAt: string;
}

// New Types for Investment Module
export type InvestmentOrigin = 'CUBA' | 'USA';
export type InvestmentStatus = 'COMPLETED' | 'IN_TRANSIT' | 'PARTIAL';

export interface InvestmentItem {
  id?: string;
  vendor?: string; // Proveedor individual de este producto dentro de la inversión
  baseName: string;
  modelOrSpecs: string;
  brand: string;
  quantity: number;
  receivedQuantity: number;
  // Campos Financieros Variables por Origen
  costCUP?: number; // Solo si Origin CUBA
  costUSD: number; // Compra USD si USA, o Calculado si CUBA
  shippingCost?: number; // Costo Envio (Solo USA)
  commission?: number; // Comisión (Solo USA)
  tips?: number; // Propina (Solo USA)
  finalCostUSD: number; // Calculado automático

  // Opcionales descriptivos
  details?: string;
  dimensions?: string;
}

export interface Investment {
  id: string; // Generado Automáticamente AAMMDDHHmm
  date: Date | string;
  vendor: string;
  exchangeRate?: number; // Tasa cambio (Solo si Origin CUBA)
  origin: InvestmentOrigin;
  status: InvestmentStatus;
  items: InvestmentItem[];
  totalCostUSD: number; // Calculado
  totalCostCUP?: number; // Sumatoria Solo si Origin CUBA
  notes?: string;
}

export interface Transfer {
  id: string;
  date: Date | string;
  sku: string;
  sourceWarehouseId: number;
  targetWarehouseId: number;
  quantity: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  requestedBy: string; // User ID or Name
}

export type ViewState = 'LOGIN' | 'CATALOG' | 'INVENTORY' | 'DASHBOARD' | 'PRODUCT_DETAIL' | 'REGISTER_SALE' | 'WAREHOUSES' | 'POS_CHECKOUT' | 'SALES_HISTORY';

export interface Customer {
  id: string;
  name: string;
  type: 'RETAIL' | 'WHOLESALE';
  phone?: string;
  email?: string;
}

export interface SaleItem {
  sku: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  date: string; // ISO String
  total: number;
  items: SaleItem[];
  userId: string; // Agent who made the sale
  customerId?: string;
  customerName?: string; // Snapshot
  paymentMethod: 'CASH' | 'TRANSFER' | 'CREDIT';
  status: 'COMPLETED' | 'REFUNDED';
  warehouseId?: number;
}