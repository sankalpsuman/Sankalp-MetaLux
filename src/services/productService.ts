import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  serverTimestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, OperationType } from '../types';
import { handleFirestoreError } from '../lib/firebaseUtils';

const PRODUCTS_COLLECTION = 'products';

export const productService = {
  async getProductsByStore(storeId: string) {
    try {
      const q = query(
        collection(db, PRODUCTS_COLLECTION), 
        where('storeId', '==', storeId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, `${PRODUCTS_COLLECTION}?storeId=${storeId}`);
      return [];
    }
  },

  async getAllFeaturedProducts(limitCount = 10) {
    try {
      const q = query(
        collection(db, PRODUCTS_COLLECTION), 
        where('isFeatured', '==', true),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, `${PRODUCTS_COLLECTION}?featured=true`);
      return [];
    }
  },

  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const productRef = doc(collection(db, PRODUCTS_COLLECTION));
      const newProduct = {
        ...productData,
        id: productRef.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(productRef, newProduct);
      return newProduct;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, PRODUCTS_COLLECTION);
    }
  },

  async updateProduct(productId: string, data: Partial<Product>) {
    try {
      const productRef = doc(db, PRODUCTS_COLLECTION, productId);
      await updateDoc(productRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${PRODUCTS_COLLECTION}/${productId}`);
    }
  },

  async deleteProduct(productId: string) {
    try {
      await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${PRODUCTS_COLLECTION}/${productId}`);
    }
  }
};
