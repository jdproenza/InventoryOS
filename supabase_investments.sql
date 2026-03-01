-- ==========================================
-- SCRIPT DE MIGRACIÓN: MÓDULO DE INVERSIONES
-- ==========================================

-- 1. Tabla: Lotes de Inversión (Carátula)
CREATE TABLE IF NOT EXISTS public.investments (
    id TEXT PRIMARY KEY, -- Formato: AAMMDDHHmm (Ej: 2511290830)
    date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    origin TEXT NOT NULL CHECK (origin IN ('CUBA', 'USA')),
    vendor TEXT NOT NULL, -- Puede ser único o múltiple si es USA (Ej: "Temu, Amazon")
    exchange_rate NUMERIC, -- Aplicable solo si origen es CUBA
    status TEXT NOT NULL DEFAULT 'IN_TRANSIT' CHECK (status IN ('IN_TRANSIT', 'COMPLETED')),
    total_cost_usd NUMERIC NOT NULL DEFAULT 0,
    total_cost_cup NUMERIC, -- Usualmente null o 0 si es USA
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tabla: Ítems de la Inversión (Productos)
CREATE TABLE IF NOT EXISTS public.investment_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investment_id TEXT NOT NULL REFERENCES public.investments(id) ON DELETE CASCADE,
    base_name TEXT NOT NULL,
    model_or_specs TEXT,
    brand TEXT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    received_quantity INTEGER NOT NULL DEFAULT 0,
    
    -- Campos Financieros Variables
    cost_cup NUMERIC, -- Costo digitado si Origen = CUBA
    cost_usd NUMERIC NOT NULL, -- Compra original en USD (USA) o convertido desde CUP (CUBA)
    shipping_cost NUMERIC, -- Costos de logística (Logística/Envío)
    commission NUMERIC, -- Comisión por gestión/compra externa
    tips NUMERIC, -- Propinas o ajustes
    final_cost_usd NUMERIC NOT NULL, -- (cost_usd + shipping_cost + commission + tips)
    
    -- Campos Opcionales / Descriptivos
    details TEXT,
    dimensions TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Habilitar RLS (Row Level Security) y crear políticas base
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_items ENABLE ROW LEVEL SECURITY;

-- Nota: Ajusta estas políticas según los roles de tu sistema, 
-- aquí pongo políticas abiertas "para usuarios autenticados" como base.
CREATE POLICY "Enable read/write for authenticated users on investments" 
ON public.investments FOR ALL TO authenticated USING (true);

CREATE POLICY "Enable read/write for authenticated users on investment_items" 
ON public.investment_items FOR ALL TO authenticated USING (true);

-- (Opcional) Tabla/Vista de Nomenclador de Proveedores
-- Al ser texto libre, podríamos sacar los proveedores únicos dinámicamente:
-- CREATE OR REPLACE VIEW unique_vendors AS SELECT DISTINCT vendor FROM public.investments;
