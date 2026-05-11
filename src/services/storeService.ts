import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  serverTimestamp,
  limit,
  orderBy
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Store, OperationType } from '../types';
import { handleFirestoreError } from '../lib/firebaseUtils';

const STORES_COLLECTION = 'stores';

export const storeService = {
  async getStores(featuredOnly = false) {
    try {
      const q = featuredOnly 
        ? query(collection(db, STORES_COLLECTION), where('isFeatured', '==', true), where('status', '==', 'active'))
        : query(collection(db, STORES_COLLECTION), where('status', '==', 'active'));
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Store));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, STORES_COLLECTION);
      return [];
    }
  },

  async getStoreById(id: string): Promise<Store | null> {
    try {
      const docRef = doc(db, STORES_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Store) : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${STORES_COLLECTION}/${id}`);
      return null;
    }
  },

  async getStoreBySlug(slug: string): Promise<Store | null> {
    try {
      const q = query(collection(db, STORES_COLLECTION), where('slug', '==', slug), where('status', '==', 'active'), limit(1));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return null;
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Store;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${STORES_COLLECTION}/slug/${slug}`);
      return null;
    }
  },

  async createStore(storeData: Omit<Store, 'id' | 'createdAt' | 'updatedAt' | 'analytics' | 'isFeatured' | 'status'>) {
    try {
      const storeRef = doc(collection(db, STORES_COLLECTION));
      const newStore = {
        ...storeData,
        id: storeRef.id,
        status: 'active', // For demo simplicity, defaulting to active
        isFeatured: false,
        analytics: { views: 0, inquiries: 0 },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(storeRef, newStore);
      
      // Update user profile to link store
      await updateDoc(doc(db, 'users', storeData.ownerId), {
        storeId: storeRef.id,
        role: 'store_owner'
      });

      return newStore;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, STORES_COLLECTION);
    }
  },

  async updateStore(storeId: string, data: Partial<Store>) {
    try {
      const storeRef = doc(db, STORES_COLLECTION, storeId);
      await updateDoc(storeRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${STORES_COLLECTION}/${storeId}`);
    }
  }
};
