export type UserRole = 'super_admin' | 'store_owner' | 'customer';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  storeId?: string;
  createdAt: string;
}

export interface Store {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  category?: string;
  theme: 'minimal' | 'classic' | 'dark' | 'gold';
  contact: {
    whatsapp?: string;
    instagram?: string;
    email?: string;
  };
  status: 'pending' | 'active' | 'suspended';
  isFeatured: boolean;
  analytics: {
    views: number;
    inquiries: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  images: string[];
  category?: string;
  tags?: string[];
  inStock: boolean;
  isFeatured: boolean;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  storeId: string;
  productId?: string;
  customerName: string;
  customerEmail: string;
  message: string;
  status: 'new' | 'replied' | 'closed';
  createdAt: string;
}
