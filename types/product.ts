export interface ProductColor {
  id?: string;
  name: string;
  hex: string;
  image?: string;
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
  category: "urban" | "off-road" | "performance";
  categoryLabel: string;
  badge?: string;
  price: number;
  originalPrice?: number;
  image: string;
  specs: ProductSpecs;
  colors: ProductColor[];
}

export interface Product {
  id: string;
  name: string;
  modelCode?: string;
  category: "urban" | "off-road" | "performance";
  categoryLabel: string;
  badge?: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewsCount?: number;
  shortDesc?: string;
  image: string;
  motorPower?: string;
  rangeKm?: number;
  speedKm?: number;
  specs?: ProductSpecs | ProductSpecDetail[];
  colors: (ProductColor | { id: string; name: string; hex: string })[];
  features?: string[];
  angles?: ProductAngle[];
}
