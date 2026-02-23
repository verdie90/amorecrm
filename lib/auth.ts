import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import type { User, UserRole } from "@/types";

// ─── Auth helpers ─────────────────────────────────────────────────────────────

export async function signIn(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function signUp(
  email: string,
  password: string,
  displayName: string,
  company: string,
  plan: string
) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const firebaseUser = credential.user;

  // Set display name on Firebase Auth profile
  await updateProfile(firebaseUser, { displayName });

  // Create user document in Firestore
  const tenantId = `tenant_${firebaseUser.uid.slice(0, 8)}`;
  const userData: Omit<User, "id"> & { createdAt: unknown; uid: string } = {
    name: displayName,
    email,
    role: "admin" as UserRole,
    tenantId,
    avatar: "",
    isOnline: true,
    createdAt: serverTimestamp() as unknown as string,
    uid: firebaseUser.uid,
  };

  // Write user + tenant docs
  await Promise.all([
    setDoc(doc(db, "users", firebaseUser.uid), userData),
    setDoc(doc(db, "tenants", tenantId), {
      id: tenantId,
      name: company,
      plan,
      ownerId: firebaseUser.uid,
      agents: 1,
      status: "active",
      createdAt: serverTimestamp(),
    }),
  ]);

  return firebaseUser;
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const credential = await signInWithPopup(auth, provider);
  const firebaseUser = credential.user;

  // Create user doc if first login
  const userRef = doc(db, "users", firebaseUser.uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    const tenantId = `tenant_${firebaseUser.uid.slice(0, 8)}`;
    await Promise.all([
      setDoc(userRef, {
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        role: "admin" as UserRole,
        tenantId,
        avatar: firebaseUser.photoURL ?? "",
        isOnline: true,
        createdAt: serverTimestamp(),
        uid: firebaseUser.uid,
      }),
      setDoc(doc(db, "tenants", tenantId), {
        id: tenantId,
        name: firebaseUser.displayName ?? "My Company",
        plan: "basic",
        ownerId: firebaseUser.uid,
        agents: 1,
        status: "active",
        createdAt: serverTimestamp(),
      }),
    ]);
  }

  return firebaseUser;
}

// ─── Fetch user profile from Firestore ────────────────────────────────────────

export async function getUserProfile(uid: string): Promise<User | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    id: uid,
    name: data.name ?? "",
    email: data.email ?? "",
    role: data.role ?? "agent",
    tenantId: data.tenantId ?? "",
    avatar: data.avatar ?? "",
    isOnline: data.isOnline ?? true,
    createdAt: data.createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
  };
}

// ─── Auth state listener ───────────────────────────────────────────────────────

export function onAuthStateChanged(
  callback: (user: FirebaseUser | null) => void
) {
  return firebaseOnAuthStateChanged(auth, callback);
}

// ─── Firebase error messages in plain English ─────────────────────────────────

export function getAuthErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    "auth/user-not-found": "No account found with this email address.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Please check your connection.",
    "auth/popup-closed-by-user": "Sign-in popup was closed before completing.",
  };
  return messages[code] ?? "An unexpected error occurred. Please try again.";
}
