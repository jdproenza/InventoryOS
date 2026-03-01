import { User, Role, Product, StockEntry, Warehouse } from './types';

export const USERS: User[] = [
  {
    id: 'USR-001',
    username: 'admin',
    email: 'admin@inventoryos.com',
    phone: '+1 555-0100',
    role: Role.ADMIN,
    scope: 'Global',
    name: 'Administrador',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcEiBLhszWzf9M8rWteA1nvI_LRw5HeFNDSG8LqIox2gU1qATmgXTGAEu79vgQnZt5nGLRylR9VLxIk_HW9dJiG2PVKBHyC4Yr7UzG72EA8dnEpOW21AmmR4qvgNNf9Ug6YcCmTeWXWvDQS8ipBE9EsZ2biZiwmPmtifyjyMaP8_0CoLKMKch-j8PS1mo7ZJ66rEUCZIv-pp484ObpnbjllIQ2-Z6jLu0E713Kb6G-_UnL0lFTtHU52fbaSP0OBTubt477Ng1hHxM'
  },
  {
    id: 'USR-002',
    username: 'jefe_norte',
    email: 'gerencia.norte@inventoryos.com',
    phone: '+1 555-0102',
    role: Role.JEFE_ALMACEN,
    scope: 'Almacén Norte',
    name: 'Gerente Almacén',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAazniqBRMvzVLgkonRXRcJ5_YN7G1097yqI2RvaauVTiN7V4FXLAN21n9SYtS18nH6TgGZ-VxMeyBolIVEi5R55uWixt_v4IaKqI8NqenF0KHhn4If3W57BC1TfUFPfs1PCet_MJhqhL0n1gJJ8Gdo6A8sq5RSEs-CYe51GRROcsf3LJPbcdwSrPPzrKnYtNSDe6lzsPuVlFtYn9t5WCLMZtCUWtL0BPPGt12CBi0qfptAZd2WzekbX8urLnxkCQ8xkCqqQkSy37g'
  },
  {
    id: 'USR-003',
    username: 'vendedor_1',
    email: 'ventas1@inventoryos.com',
    phone: '+1 555-0103',
    role: Role.VENDEDOR,
    scope: 'Almacén Norte',
    name: 'Agente Ventas',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-BLAcbuy3e7n8pL41K_QK3CFyqvOJYKOQxS66G_0NS4spiwgdWYk3h-3yUaCkhRrFKyP-2Hnbl4zTaCE4AtM5PPpcnxC7fQiOLKyeVjdf75FpYI3eLrpQ-P3IeOL084GI_buU9XQ3rgYi-AnWe9LbI00yxXq2xFdFpkoIdKU3KsOWeHGw50dRQp2j-lvXDtUhjyTzyT6JmMORbySXN3DJIFxOhb1FLHopkfkk9zwLh1da-vAfyx4CfXD8vtFkbvxYrt3hlPjfVQI'
  }
];

export const WAREHOUSES: Warehouse[] = [
  { id: 1, name: 'Almacén Norte' },
  { id: 2, name: 'Almacén Sur' }
];

export const VENDORS: string[] = [
  'Eglis Import',
  'Proveedor Juan',
  'Tech Distributors SA',
  'María Imports'
];

export const PRODUCTS: Product[] = [
  {
    sku: 'AUDIO-001',
    baseName: 'Audífonos',
    modelOrSpecs: 'Pro Cancelación Ruido',
    brand: 'Sony',
    name: 'Audífonos (Pro Cancelación Ruido) Sony',
    price: 149.99,
    cost: 80.00,
    managerCommission: 5.00,
    extraCommission: 2.00,
    category: 'Electrónica',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLeRy8-DOyyWaLejlS2Q6U_H8mDIhE5ZtpyGTkjPqsEFQ_fEWHE2DUteJbjZ79OxZxAyFnR4e4N5OSvBdrkmbjMcaHmlE8OHo0d7vdyudQMjjFl-U-pjtqw47RgWhuEw9y0Zc2YaF_pdvI7jQNjftwnmtQOgBtQfJ7g0dRs88TLz_Ix2ynUmaJKuosxII7fzZmquHAjgOMCaAjBah4FrvMMceyn-IdcEYGNboqdSmkH_0Ra3_4TB1Sqa9CDOAgYx9zjiqpkLyphEQ',
    description: 'Audífonos premium con cancelación de ruido, batería de 30 horas y sonido inmersivo.',
    dimensions: '20x15x5 cm',
    isPublished: true
  },
  {
    sku: 'CAM-002',
    baseName: 'Cámara Instantánea',
    modelOrSpecs: 'Mini 11',
    brand: 'Fujifilm',
    name: 'Cámara Instantánea (Mini 11) Fujifilm',
    price: 89.00,
    cost: 45.00,
    managerCommission: 4.00,
    extraCommission: 1.00,
    category: 'Electrónica',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM52KpzJj_RQaOZh7DjN-ZawnO2RPFyEH1gZMjkdbwF7-SIwYLmj9-3r-MXyFvmgREzGsXJ7vjIU7JmaiMcxF1SZwpoOlHwLD1RG6HWIaTzSmXSp2_6nDyVaNZEBnlH7bJ_5QkNTPWHHmY2jI6IgGbJVR7cZV6II0JFgs-MC9e9cUdQNoswkUiCE5UaiQ6G9xqgO9xs9jl737JRM-XNXha9f2B93zR81Me0EySbye6m3dYr5XrShDchwkI12Cu-OYpnd4L1hiGx08',
    dimensions: '10x12x7 cm',
    isPublished: true
  },
  {
    sku: 'SHOE-003',
    baseName: 'Zapatillas Deportivas',
    modelOrSpecs: 'Air Max 270',
    brand: 'Nike',
    name: 'Zapatillas Deportivas (Air Max 270) Nike',
    price: 120.00,
    cost: 60.00,
    managerCommission: 10.00,
    extraCommission: 5.00,
    category: 'Moda',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx7kzuPVhi8-IQFvPpwIEcy46ti-1xFhURQy9CmNv9nwqTOBkU7_qv4A4G742_Zwt8RVJEL35zKYKRGOuEqfL1BUqYS4IVTQpH3tooQ3W_xm2Tixc6m3lhyeFzkvxJKF9walCgV_L5ru5ao0UtxbpCKUH1adGupKJUmlv6ZkL_Efy1aSe8KbSPuWp-aNBN-E467sOwS1_LnLPPEAIdmpS6gmIR8wmj6OUicZ0IB3EA9aUhNMWZS11BEeEoFuZixbsPRJL4nznHkxg',
    dimensions: '30x20x10 cm',
    isPublished: true
  },
  {
    sku: 'WATCH-004',
    baseName: 'Reloj Inteligente',
    modelOrSpecs: 'Serie 7',
    brand: 'Apple',
    name: 'Reloj Inteligente (Serie 7) Apple',
    price: 399.00,
    cost: 250.00,
    managerCommission: 15.00,
    extraCommission: 0.00,
    category: 'Electrónica',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJiLPtn3OJ8LkzwZSSoFvWYtl7r-aBoaCO0jRBAcTV4a8uNA703O41HomDJjFHTTYpxpuBcadLX2Jci79TrwAVeSwmHXn8LljYNZtZ_WCqscI7XUflnKZiJ3XVIkPc0bXWPBGof5Fedknl5-myXkwg2KInMM6RAUXhmciwTLfa4cm4FwVtoBTHNHqCBBRTTQQ0fKChp2v4op-AdO26rp3XeigMxQPaYIoa1iPcV5LeB93BWRlL_egc8pHfIjL-WxLxASxKsHq4rR8',
    dimensions: '5x5x1 cm',
    isPublished: true
  },
  {
    sku: 'HOME-005',
    baseName: 'Altavoz Inteligente',
    modelOrSpecs: 'HomePod Mini',
    brand: 'Apple',
    name: 'Altavoz Inteligente (HomePod Mini) Apple',
    price: 99.00,
    cost: 70.00,
    managerCommission: 3.00,
    extraCommission: 0.00,
    category: 'Hogar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhHwV6Kyl2oDExXhMxepVcmvIb2gMOKMSxEV8pBJv3eEKpWaNagJYphCqrb3lunUfEuqGv1nz1X78eq1Ik8RV-t8rif9SLvqIr9qX41cAzFgh9_J65iMPiyCKkyDn5C03HJ-znaRDYiPj0_cCJlftwwYQXZszwSHlhz8cRLRF7No2keE3m_Zgc8iDlfIh3Qc2-sxKCtDSSe_xzkyWbZgbFAP1Q-ITMtUlzk0abwov6xNSJUgTlZWLuqXWp1Gvqa93JQ_ZGDBlpFaU',
    dimensions: '10x10x10 cm',
    isPublished: true
  },
  {
    sku: 'PD-18V-001',
    baseName: 'Taladro Inalámbrico',
    modelOrSpecs: '18V Brushless',
    brand: 'DeWalt',
    name: 'Taladro Inalámbrico (18V Brushless) DeWalt',
    price: 120.00,
    cost: 60.00,
    managerCommission: 8.00,
    extraCommission: 2.00,
    category: 'Herramientas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrwf6DbhCnuAQAmr6YGyVHzpFzon-dkrTeglo4twYlOzUJWlm7DDlnqsmJT0Q1MUmYFBI0_XU3AP8xDDjwAbuuBHn_9Tzty-lhdvHkdnAge8FmYWsVvkpcEvysc3FaOXm3xRKy00MOWKz7X4qVTjEaD9U8EJitQi1LnquDRUhhSl-EKZygdJAuhphz_Wjc6o8isaYQvNqp719YcDQFfMz_mV53El7babZkyCEcdKd0RsKrNAVZ0BDE0oWw6RH_yPsg0y27_qMLZkk',
    dimensions: '25x20x8 cm',
    isPublished: true
  },
  {
    sku: 'CH-ERG-BLK',
    baseName: 'Silla Ergonómica',
    modelOrSpecs: 'Soporte Lumbar Ajustable',
    brand: 'Herman Miller',
    name: 'Silla Ergonómica (Soporte Lumbar Ajustable) Herman Miller',
    price: 299.00,
    cost: 150.00,
    managerCommission: 20.00,
    extraCommission: 10.00,
    category: 'Muebles',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSbtQ5b2wJ9t8gRT1ELeBOYU2E94Sg2HLqD9OOb1gm6ErchNvbFuQvd1XT5XatGHr6wBB3BrwbRONSQVnaXKTRPt5AWTFUrI-BKgcm_bArOZAaylBJPIRwTLRv5sSWurztLpS64qRYXZ5JZw7K3W98EUUFQRIX9_SFZ1Hhl1hiSVyIv-Q6YNfHfKIKCE1dIBDNq4okXBCvX2fS24fDHOYvI4CrWuJjOu_tElxuz5rIwl4e7sMBIDrLP2JfKQx2SvuBSE-704RAsfM',
    description: 'Silla de malla de alto rendimiento con soporte lumbar ajustable.',
    dimensions: '60x60x120 cm',
    isPublished: true
  }
];

// Initial Stock State
export const INITIAL_STOCK: StockEntry[] = [
  // Almacén Norte (ID 1)
  { sku: 'AUDIO-001', warehouseId: 1, quantity: 150, reservedQuantity: 0, location: 'A-01' },
  { sku: 'CAM-002', warehouseId: 1, quantity: 3, reservedQuantity: 0, location: 'A-02' },
  { sku: 'SHOE-003', warehouseId: 1, quantity: 200, reservedQuantity: 0, location: 'F-10' },
  { sku: 'WATCH-004', warehouseId: 1, quantity: 50, reservedQuantity: 0, location: 'E-05' },
  { sku: 'HOME-005', warehouseId: 1, quantity: 0, reservedQuantity: 0, location: 'H-99' },
  { sku: 'PD-18V-001', warehouseId: 1, quantity: 50, reservedQuantity: 0, location: 'A-12' },
  { sku: 'CH-ERG-BLK', warehouseId: 1, quantity: 45, reservedQuantity: 0, location: 'B-12' },

  // Almacén Sur (ID 2)
  { sku: 'AUDIO-001', warehouseId: 2, quantity: 50, reservedQuantity: 0, location: 'S-01' },
];