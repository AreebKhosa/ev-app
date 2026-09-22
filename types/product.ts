export interface ProductColor {
  id?: string;
  name: string;
  hex: string;
  image?: string;
}

export interface BatteryVariant {
  id?: string;
  name: string;
  range: string;
  extraPrice: number;
}

export interface SpecificationItem {
  label: string;
  value: string;
  icon?: string;
}

export interface WarrantyAndShipping {
  warranty?: string;
  trialPeriod?: string;
  shipping?: string;
  dispatchTime?: string;
}

export interface ProductSpecs {
  speed: string;
  range: string;
  power: string;
}

export interface ProductSpecDetail {
  label: string;
  value: string;
  icon?: string;
}

export interface ProductAngle {
  id: string;
  name: string;
  colorName: string;
  image: string;
  secondaryImage?: string;
  colorHex: string;
}

export interface ProductItem {
  id: string;
  name: string;
  modelCode?: string;
  category: string;
  categoryLabel?: string;
  badge?: string;
  price: number;
  originalPrice?: number;
  stock?: number;
  image: string;
  gallery?: string[];
  description?: string;
  specs: ProductSpecs;
  colors: ProductColor[];
}

export interface Product {
  id: string;
  name: string;
  modelCode?: string;
  category: string;
  categoryLabel?: string;
  badge?: string;
  price: number;
  originalPrice?: number;
  stock?: number;
  speed?: string;
  speedKm?: number;
  range?: string;
  rangeKm?: number;
  power?: string;
  motorPower?: string;
  shortDescription?: string;
  shortDesc?: string;
  description?: string;
  image: string;
  gallery?: string[];
  videoUrl?: string;
  colors?: ProductColor[];
  batteryVariants?: BatteryVariant[];
  features?: string[];
  specifications?: SpecificationItem[];
  whatsInTheBox?: string[];
  warrantyAndShipping?: WarrantyAndShipping;
  specs?: ProductSpecs | ProductSpecDetail[];
  angles?: ProductAngle[];
  rating?: number;
  reviewsCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

