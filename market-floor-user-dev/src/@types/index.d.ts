declare module "@heroicons/react/outline";
declare module "styled-components";

interface IProductPrice {
  price: number;
  displayPrice: string;
  salePrice?: number;
  displaySalePrice?: string;
}

interface IUser {
  id: number;
  username: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  savePoints: number;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface IProduct {
  id: string;
  upc: string;
  name: string;
  price: IProductPrice;
  isOnSale?: boolean;
  fullDescription?: string;
  shortDescription?: string;
  nutritionInformations?: string;
  images?: string[];
  thumbnail?: string;
  category?: IProductCategory;
  properties?: { [key: string]: string | number | boolean };
}

interface IStoreProduct {
  product: IProduct;
  price: IProductPrice;
  inventory: number;
}

interface IStore {
  id: number;
  name: string;
  storeCode: number;
  supportPickup: boolean;
  supportDelivery: boolean;
  openTime: number;
  closeTime: number;
  lat: string;
  lng: string;
}

interface IProductCategory {
  id: string | number;
  name: string;
  properties: IProductCategoryProperty[];
}

interface IProductCategoryProperty {
  displayName: string;
  name: string;
  type: string;
  options?: string[];
}

interface IOrderDetail {
  id: number;
  quantity: number;
  price: string;
  createdAt: string;
  updatedAt: string;
}

interface IOrderAddress {
  address: string;
  province: string;
  district?: string;
  ward?: string;
  shippingFee: number;
}

interface IOrder {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  orderAddress: IOrderAddress | null;
  totalAmount: number;
  orderDetails: IOrderDetail[];
  user: IUser;
}

interface ICreateOrderUserInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
}

interface ICreateOrderAddress {
  address: string;
  province: string;
  district?: string;
  ward?: string;
  shippingFee: number;
}

interface ICreateOrder {
  orderAddress: CreateOrderAddress;
  orderUserInfo: CreateOrderUserInfo;
  isApplyUserSavePoints?: boolean;
  storeId: number;
}

declare interface String {
  truncate: (num: number) => string;
  prettyMoney: () => string;
  prettyDate: () => string;
  prettyDateTime: () => string;
}

declare interface Array<T> {
  has: (item: T) => boolean;
}
