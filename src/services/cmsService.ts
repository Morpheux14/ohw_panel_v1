import { db, storage } from '../firebase/config';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject, 
  listAll 
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Page, Section, Component, Media } from '../types/cms';

// Pages
export const createPage = async (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>, userId: string) => {
  const pageData = {
    ...page,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: userId,
    updatedBy: userId
  };
  
  const docRef = await addDoc(collection(db, 'pages'), pageData);
  return { id: docRef.id, ...pageData, createdAt: new Date(), updatedAt: new Date() };
};

export const updatePage = async (id: string, page: Partial<Page>, userId: string) => {
  const pageRef = doc(db, 'pages', id);
  const updateData = {
    ...page,
    updatedAt: serverTimestamp(),
    updatedBy: userId
  };
  
  await updateDoc(pageRef, updateData);
  return { id, ...updateData, updatedAt: new Date() };
};

export const publishPage = async (id: string, userId: string) => {
  const pageRef = doc(db, 'pages', id);
  await updateDoc(pageRef, {
    status: 'published',
    publishedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    updatedBy: userId
  });
};

export const getPage = async (id: string) => {
  const pageRef = doc(db, 'pages', id);
  const pageSnap = await getDoc(pageRef);
  
  if (pageSnap.exists()) {
    const data = pageSnap.data();
    // Convert Firestore timestamps to JS Date objects
    const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date();
    const updatedAt = data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date();
    const publishedAt = data.publishedAt instanceof Timestamp ? data.publishedAt.toDate() : null;
    
    return { 
      id: pageSnap.id, 
      ...data, 
      createdAt, 
      updatedAt,
      publishedAt
    } as Page;
  }
  
  return null;
};

export const getPageBySlug = async (slug: string) => {
  const pagesRef = collection(db, 'pages');
  const q = query(pagesRef, where('slug', '==', slug), where('status', '==', 'published'));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const pageDoc = querySnapshot.docs[0];
    const data = pageDoc.data();
    
    // Convert Firestore timestamps to JS Date objects
    const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date();
    const updatedAt = data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date();
    const publishedAt = data.publishedAt instanceof Timestamp ? data.publishedAt.toDate() : null;
    
    return { 
      id: pageDoc.id, 
      ...data, 
      createdAt, 
      updatedAt,
      publishedAt
    } as Page;
  }
  
  return null;
};

export const getPages = async () => {
  const pagesRef = collection(db, 'pages');
  const q = query(pagesRef, orderBy('updatedAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    
    // Convert Firestore timestamps to JS Date objects
    const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date();
    const updatedAt = data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date();
    const publishedAt = data.publishedAt instanceof Timestamp ? data.publishedAt.toDate() : null;
    
    return { 
      id: doc.id, 
      ...data, 
      createdAt, 
      updatedAt,
      publishedAt
    };
  }) as Page[];
};

export const deletePage = async (id: string) => {
  const pageRef = doc(db, 'pages', id);
  await deleteDoc(pageRef);
};

// Media
export const uploadMedia = async (file: File, folder: string = 'general', userId: string): Promise<Media> => {
  const fileId = uuidv4();
  const fileExtension = file.name.split('.').pop();
  const fileName = `${fileId}.${fileExtension}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;
  
  const storageRef = ref(storage, filePath);
  await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(storageRef);
  
  // Create thumbnail for images
  let thumbnailUrl = downloadUrl;
  let dimensions = null;
  
  // For images, we'll handle dimensions differently to avoid URL construction issues
  if (file.type.startsWith('image/')) {
    // We'll set dimensions later in a safer way
    thumbnailUrl = downloadUrl;
  }
  
  const mediaData: Omit<Media, 'id'> = {
    name: file.name,
    type: file.type.startsWith('image/') 
      ? 'image' 
      : file.type.startsWith('video/') 
        ? 'video' 
        : 'document',
    url: downloadUrl,
    thumbnailUrl,
    size: file.size,
    status: 'published',
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: userId,
    updatedBy: userId,
    folder,
    tags: []
  };
  
  // We'll skip getting image dimensions for now to avoid URL construction issues
  // This can be implemented later with a safer approach
  
  const docRef = await addDoc(collection(db, 'media'), mediaData);
  return { id: docRef.id, ...mediaData };
};

export const getMedia = async (id: string) => {
  const mediaRef = doc(db, 'media', id);
  const mediaSnap = await getDoc(mediaRef);
  
  if (mediaSnap.exists()) {
    const data = mediaSnap.data();
    
    // Convert Firestore timestamps to JS Date objects
    const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date();
    const updatedAt = data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date();
    
    return { 
      id: mediaSnap.id, 
      ...data, 
      createdAt, 
      updatedAt 
    } as Media;
  }
  
  return null;
};

export const getAllMedia = async (type?: 'image' | 'video' | 'document', folder?: string) => {
  try {
    let q = query(collection(db, 'media'), orderBy('createdAt', 'desc'));
    
    if (type) {
      q = query(q, where('type', '==', type));
    }
    
    if (folder) {
      q = query(q, where('folder', '==', folder));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      
      // Convert Firestore timestamps to JS Date objects
      const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date();
      const updatedAt = data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : new Date();
      
      return { 
        id: doc.id, 
        ...data, 
        createdAt, 
        updatedAt 
      };
    }) as Media[];
  } catch (error) {
    console.error("Error getting media:", error);
    return []; // Return empty array instead of throwing
  }
};

export const deleteMedia = async (id: string) => {
  // First get the media to get the storage path
  const media = await getMedia(id);
  
  if (media) {
    try {
      // Delete from storage
      const storageRef = ref(storage, media.url);
      await deleteObject(storageRef);
      
      // Delete from Firestore
      const mediaRef = doc(db, 'media', id);
      await deleteDoc(mediaRef);
    } catch (error) {
      console.error("Error deleting media:", error);
      throw error;
    }
  }
};

export const updateMediaMetadata = async (id: string, metadata: Partial<Media>, userId: string) => {
  const mediaRef = doc(db, 'media', id);
  const updateData = {
    ...metadata,
    updatedAt: serverTimestamp(),
    updatedBy: userId
  };
  
  await updateDoc(mediaRef, updateData);
  return { id, ...updateData, updatedAt: new Date() };
};
