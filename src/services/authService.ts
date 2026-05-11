import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserProfile, UserRole, OperationType } from '../types';
import { handleFirestoreError } from '../lib/firebaseUtils';

const googleProvider = new GoogleAuthProvider();

export const authService = {
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user profile exists
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create initial profile as customer (onboarding will upgrade if they want a store)
        const profile: UserProfile = {
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'customer',
          createdAt: new Date().toISOString(),
        };
        
        await setDoc(doc(db, 'users', user.uid), {
          ...profile,
          createdAt: serverTimestamp()
        });
        
        return { user, profile };
      }
      
      return { user, profile: userDoc.data() as UserProfile };
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/login`);
    }
  },

  async logout() {
    await signOut(auth);
  },

  subscribeToAuth(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  },

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `users/${uid}`);
      return null;
    }
  }
};
