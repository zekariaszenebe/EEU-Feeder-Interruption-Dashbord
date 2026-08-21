import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  getDocs, 
  writeBatch,
  query, 
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from './firebase';
import { FeederInterruption, SystemNotification, InterruptionStatus, TeamLeaderNote, ContactItem, TeamLeaderUser } from '../types';
import { INITIAL_INTERRUPTIONS, INITIAL_NOTIFICATIONS, INITIAL_FEEDERS_LIST, INITIAL_CUSTOMER_CONTACTS } from '../data/mockData';
import { HubRecord, HUB_RECORDS } from '../data/hubData';

// Operation types for FirestoreErrorInfo
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
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errMsg = error instanceof Error ? error.message : String(error);
  const errCode = (error as { code?: string })?.code;
  
  const errInfo: FirestoreErrorInfo = {
    error: errMsg,
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };

  if (errCode === 'unavailable' || errMsg.includes('the client is offline') || errMsg.includes('unavailable')) {
    console.warn(`Firestore [${operationType}] for path '${path}' is operating in offline mode:`, errMsg);
  } else {
    console.error('Firestore Error: ', JSON.stringify(errInfo));
  }

  throw new Error(JSON.stringify(errInfo));
}

// Firestore collection references
const interruptionsCol = collection(db, 'interruptions');
const notificationsCol = collection(db, 'notifications');
const presetFeedersCol = collection(db, 'presetFeeders');
const hubRecordsCol = collection(db, 'hubRecords');
const teamLeaderNotesCol = collection(db, 'teamLeaderNotes');
const customerContactsCol = collection(db, 'customerContacts');
const teamLeadersCol = collection(db, 'teamLeaders');

/**
 * Seeding helper to populate firestore with default mock data if it is completely empty.
 * This guarantees the application is fully functional with live records on initial load.
 */
export async function seedInitialDataIfEmpty() {
  // Delete legacy mock interruptions (f-1 through f-9) if present so they don't persist automatically
  try {
    const mockInterIds = ['f-1', 'f-2', 'f-3', 'f-4', 'f-5', 'f-6', 'f-7', 'f-8', 'f-9'];
    for (const mockId of mockInterIds) {
      try {
        await deleteDoc(doc(db, 'interruptions', mockId));
      } catch (e) {
        // ignore
      }
    }
  } catch (error) {
    console.error('Error cleaning legacy mock interruptions:', error);
  }

  // Delete legacy mock notifications (n-2, n-3, n-4) if present
  try {
    const mockNotifIds = ['n-2', 'n-3', 'n-4'];
    for (const notifId of mockNotifIds) {
      try {
        await deleteDoc(doc(db, 'notifications', notifId));
      } catch (e) {
        // ignore
      }
    }
  } catch (error) {
    console.error('Error cleaning legacy mock notifications:', error);
  }

  try {
    const feedersSnap = await getDocs(query(presetFeedersCol, limit(1)));
    if (feedersSnap.empty) {
      console.log("Seeding initial preset feeders to Firestore...");
      const batch = writeBatch(db);
      INITIAL_FEEDERS_LIST.forEach((feederStr, idx) => {
        const docId = `feeder-${idx}`;
        const docRef = doc(db, 'presetFeeders', docId);
        batch.set(docRef, { feederStr });
      });
      await batch.commit();
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'presetFeeders');
  }

  try {
    const hubSnap = await getDocs(query(hubRecordsCol, limit(1)));
    if (hubSnap.empty) {
      console.log("Seeding initial hub records to Firestore...");
      const batch = writeBatch(db);
      HUB_RECORDS.forEach((item) => {
        const docRef = doc(db, 'hubRecords', String(item.no));
        batch.set(docRef, item);
      });
      await batch.commit();
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'hubRecords');
  }

  try {
    const contactsSnap = await getDocs(query(customerContactsCol, limit(1)));
    if (contactsSnap.empty) {
      console.log("Seeding initial customer contacts to Firestore...");
      const batch = writeBatch(db);
      INITIAL_CUSTOMER_CONTACTS.forEach((item) => {
        const docRef = doc(db, 'customerContacts', item.id);
        batch.set(docRef, item);
      });
      await batch.commit();
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'customerContacts');
  }

  try {
    const tlSnap = await getDocs(query(teamLeadersCol, limit(1)));
    if (tlSnap.empty) {
      console.log("Seeding initial default Call Center Team Leaders (Teams A, B, C, D) to Firestore...");
      const defaultTeamLeaders: TeamLeaderUser[] = [
        {
          id: 'tl-a',
          username: '@team_a',
          password: 'Tl@1234',
          name: 'Team A Leader',
          district: 'Team A',
          createdAt: new Date().toISOString()
        },
        {
          id: 'tl-b',
          username: '@team_b',
          password: 'Tl@1234',
          name: 'Team B Leader',
          district: 'Team B',
          createdAt: new Date().toISOString()
        },
        {
          id: 'tl-c',
          username: '@team_c',
          password: 'Tl@1234',
          name: 'Team C Leader',
          district: 'Team C',
          createdAt: new Date().toISOString()
        },
        {
          id: 'tl-d',
          username: '@team_d',
          password: 'Tl@1234',
          name: 'Zekarias Zenebe',
          district: 'Team D',
          createdAt: new Date().toISOString()
        }
      ];
      for (const tl of defaultTeamLeaders) {
        await setDoc(doc(db, 'teamLeaders', tl.id), tl);
      }
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'teamLeaders');
  }

  // Removing team leader notes seeding to ensure board is empty on reload
}

/**
 * Subscribes to interruptions updates in real-time.
 */
export function subscribeToInterruptions(onUpdate: (items: FeederInterruption[]) => void) {
  return onSnapshot(interruptionsCol, (snapshot) => {
    const list: FeederInterruption[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      list.push({
        id: data.id,
        feederName: data.feederName,
        district: data.district,
        type: data.type,
        status: data.status,
        startTime: data.startTime,
        estimatedRestorationTime: data.estimatedRestorationTime,
        affectedArea: data.affectedArea,
        remark: data.remark,
        lastUpdated: data.lastUpdated
      } as FeederInterruption);
    });
    
    const sorted = [...list].sort((a, b) => {
      if (a.status === InterruptionStatus.ACTIVE && b.status !== InterruptionStatus.ACTIVE) return -1;
      if (a.status !== InterruptionStatus.ACTIVE && b.status === InterruptionStatus.ACTIVE) return 1;
      return b.lastUpdated.localeCompare(a.lastUpdated);
    });
    
    onUpdate(sorted);
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, 'interruptions');
  });
}

/**
 * Subscribes to system notifications updates in real-time.
 */
export function subscribeToNotifications(onUpdate: (items: SystemNotification[]) => void) {
  return onSnapshot(notificationsCol, (snapshot) => {
    const list: SystemNotification[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      list.push({
        id: data.id,
        feederId: data.feederId,
        type: data.type,
        title: data.title,
        message: data.message,
        timestamp: data.timestamp,
        read: data.read
      } as SystemNotification);
    });
    
    const sorted = [...list].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    onUpdate(sorted);
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, 'notifications');
  });
}

/**
 * Subscribes to preset feeders list in real-time.
 */
export function subscribeToFeedersList(onUpdate: (items: string[]) => void) {
  return onSnapshot(presetFeedersCol, (snapshot) => {
    const list: string[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.feederStr) {
        list.push(data.feederStr);
      }
    });
    
    list.sort();
    onUpdate(list);
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, 'presetFeeders');
  });
}

/**
 * Creates a new interruption and a companion notification.
 */
export async function addInterruptionDoc(entry: Omit<FeederInterruption, 'id' | 'lastUpdated'>) {
  const suffix = Math.random().toString(36).substring(2, 9);
  const newId = `f-${Date.now()}-${suffix}`;
  const timestampStr = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const record: FeederInterruption = {
    ...entry,
    id: newId,
    lastUpdated: timestampStr
  };

  try {
    // 1. Create interruption document
    await setDoc(doc(db, 'interruptions', newId), record);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `interruptions/${newId}`);
  }

  const notiId = `n-${Date.now()}-${suffix}`;
  const newNoti: SystemNotification = {
    id: notiId,
    feederId: newId,
    type: 'new',
    title: `New Feeder Added`,
    message: `${entry.feederName} (${entry.district}) logged under ${entry.status}. Affected areas: ${entry.affectedArea}`,
    timestamp: timestampStr,
    read: false
  };

  try {
    // 2. Create notification document
    await setDoc(doc(db, 'notifications', notiId), newNoti);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `notifications/${notiId}`);
  }

  return record;
}

/**
 * Updates an interruption and conditionally adds a progress notification.
 */
export async function updateInterruptionDoc(id: string, entry: Partial<FeederInterruption>, existingRecord: FeederInterruption) {
  const timestampStr = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const merged = { ...existingRecord, ...entry, lastUpdated: timestampStr };
  
  try {
    // 1. Update the document
    await setDoc(doc(db, 'interruptions', id), merged);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `interruptions/${id}`);
  }

  // 2. Add companion notification if the status has transitioned
  if (entry.status && entry.status !== existingRecord.status) {
    const typeVal: 'resolve' | 'update' = entry.status === InterruptionStatus.RESTORED ? 'resolve' : 'update';
    const titleText = entry.status === InterruptionStatus.RESTORED ? 'Feeder Line Restored' : 'Operational Status Changed';
    const messageText = entry.status === InterruptionStatus.RESTORED 
      ? `${existingRecord.feederName} restored to active grid status and re-energized successfully.`
      : `${existingRecord.feederName} reassessed as ${entry.status}. Details: ${entry.remark || merged.remark}`;

    const notiId = `n-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const changeNoti: SystemNotification = {
      id: notiId,
      feederId: id,
      type: typeVal,
      title: titleText,
      message: messageText,
      timestamp: timestampStr,
      read: false
    };

    try {
      await setDoc(doc(db, 'notifications', notiId), changeNoti);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `notifications/${notiId}`);
    }
  }
}

/**
 * Deletes an interruption.
 */
export async function deleteInterruptionDoc(id: string) {
  try {
    await deleteDoc(doc(db, 'interruptions', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `interruptions/${id}`);
  }
}

/**
 * Marks all notifications as read.
 */
export async function markAllNotificationsAsReadDoc() {
  let snapshot;
  try {
    snapshot = await getDocs(notificationsCol);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'notifications');
  }

  try {
    const batch = writeBatch(db);
    snapshot.forEach((doc) => {
      if (!doc.data().read) {
        batch.update(doc.ref, { read: true });
      }
    });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'notifications');
  }
}

/**
 * Marks a single notification as read.
 */
export async function markOneNotificationAsReadDoc(id: string) {
  try {
    await updateDoc(doc(db, 'notifications', id), { read: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `notifications/${id}`);
  }
}

/**
 * Clears all system notifications.
 */
export async function clearAllNotificationsDoc() {
  let snapshot;
  try {
    snapshot = await getDocs(notificationsCol);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'notifications');
  }

  try {
    const batch = writeBatch(db);
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, 'notifications');
  }
}

/**
 * Adds a new preset feeder line.
 */
export async function addPresetFeederDoc(feederStr: string) {
  const cleanId = 'feeder-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
  try {
    await setDoc(doc(db, 'presetFeeders', cleanId), { feederStr });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `presetFeeders/${cleanId}`);
  }
}

/**
 * Deletes a preset feeder line.
 */
export async function deletePresetFeederDoc(feederStr: string) {
  let snapshot;
  try {
    const q = query(presetFeedersCol);
    snapshot = await getDocs(q);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'presetFeeders');
  }

  try {
    const batch = writeBatch(db);
    let deletedCount = 0;
    snapshot.forEach((doc) => {
      if (doc.data().feederStr === feederStr) {
        batch.delete(doc.ref);
        deletedCount++;
      }
    });
    if (deletedCount > 0) {
      await batch.commit();
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, 'presetFeeders');
  }
}

/**
 * Updates a preset feeder line.
 */
export async function updatePresetFeederDoc(oldFeederStr: string, newFeederStr: string) {
  let snapshot;
  try {
    const q = query(presetFeedersCol);
    snapshot = await getDocs(q);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'presetFeeders');
  }

  try {
    const batch = writeBatch(db);
    let updatedCount = 0;
    snapshot.forEach((doc) => {
      if (doc.data().feederStr === oldFeederStr) {
        batch.update(doc.ref, { feederStr: newFeederStr });
        updatedCount++;
      }
    });
    if (updatedCount > 0) {
      await batch.commit();
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, 'presetFeeders');
  }
}

/**
 * Subscribes to HubRecords (CSC Address directory) updates in real-time.
 */
export function subscribeToHubRecords(onUpdate: (items: HubRecord[]) => void) {
  return onSnapshot(hubRecordsCol, (snapshot) => {
    const list: HubRecord[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      list.push({
        no: data.no,
        address: data.address,
        region: data.region,
        csc: data.csc,
        dummyBp: data.dummyBp,
        rsg: data.rsg,
        dispatcherName: data.dispatcherName,
        dispatcherId: data.dispatcherId,
        customerServiceTlId: data.customerServiceTlId,
        officeLocation: data.officeLocation
      } as HubRecord);
    });

    list.sort((a, b) => a.no - b.no);
    onUpdate(list);
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, 'hubRecords');
  });
}

/**
 * Updates a HubRecord (CSC Address) in Firestore.
 */
export async function updateHubRecordDoc(item: HubRecord) {
  const docId = String(item.no);
  try {
    await setDoc(doc(db, 'hubRecords', docId), item);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `hubRecords/${docId}`);
  }
}

/**
 * Subscribes to TeamLeaderNotes in real-time.
 */
export function subscribeToTeamLeaderNotes(onUpdate: (items: TeamLeaderNote[]) => void) {
  return onSnapshot(teamLeaderNotesCol, (snapshot) => {
    const list: TeamLeaderNote[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      list.push({
        id: data.id,
        content: data.content,
        author: data.author,
        timestamp: data.timestamp,
        isUrgent: data.isUrgent
      } as TeamLeaderNote);
    });

    // Sort by urgent first, then we can preserve a good order (or reverse order of ID / timestamp)
    list.sort((a, b) => {
      if (a.isUrgent && !b.isUrgent) return -1;
      if (!a.isUrgent && b.isUrgent) return 1;
      const tA = a.timestamp || '';
      const tB = b.timestamp || '';
      return tB.localeCompare(tA);
    });

    onUpdate(list);
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, 'teamLeaderNotes');
  });
}

/**
 * Adds a new TeamLeaderNote.
 */
export async function addTeamLeaderNoteDoc(content: string, author: string, isUrgent: boolean) {
  const cleanId = 'note-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
  const timestampStr = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const record: TeamLeaderNote = {
    id: cleanId,
    content,
    author: author || "Team Leader",
    timestamp: timestampStr,
    isUrgent
  };

  try {
    await setDoc(doc(db, 'teamLeaderNotes', cleanId), record);
    return record;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `teamLeaderNotes/${cleanId}`);
  }
}

/**
 * Updates an existing TeamLeaderNote.
 */
export async function updateTeamLeaderNoteDoc(id: string, content: string, isUrgent: boolean) {
  try {
    const timestampStr = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    await updateDoc(doc(db, 'teamLeaderNotes', id), { 
      content, 
      isUrgent,
      timestamp: timestampStr 
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `teamLeaderNotes/${id}`);
  }
}

/**
 * Deletes a TeamLeaderNote.
 */
export async function deleteTeamLeaderNoteDoc(id: string) {
  try {
    await deleteDoc(doc(db, 'teamLeaderNotes', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `teamLeaderNotes/${id}`);
  }
}

/**
 * Clears all TeamLeaderNotes from Firestore to keep the board empty on reload.
 */
export async function clearTeamLeaderNotes() {
  try {
    const snap = await getDocs(teamLeaderNotesCol);
    const batch = writeBatch(db);
    snap.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, 'teamLeaderNotes');
  }
}

/**
 * Subscribes to CustomerContacts in real-time.
 */
export function subscribeToCustomerContacts(onUpdate: (items: ContactItem[]) => void) {
  return onSnapshot(customerContactsCol, (snapshot) => {
    const list: ContactItem[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      list.push({
        id: data.id,
        name: data.name,
        phone: data.phone,
        category: data.category as any,
        locationInfo: data.locationInfo,
        hotlineShortCode: data.hotlineShortCode
      } as ContactItem);
    });

    // Keep initial relative order, or simple alphabet order by category then name
    list.sort((a, b) => {
      const catOrder = { 'head_regional': 0, 'sheger_city': 1, 'regional_hotline': 2 };
      const aOrder = catOrder[a.category] ?? 3;
      const bOrder = catOrder[b.category] ?? 3;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.name.localeCompare(b.name);
    });

    onUpdate(list);
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, 'customerContacts');
  });
}

/**
 * Adds a new Customer Contact.
 */
export async function addCustomerContactDoc(item: Omit<ContactItem, 'id'>) {
  const newId = `cc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const record: ContactItem = {
    ...item,
    id: newId
  };
  try {
    await setDoc(doc(db, 'customerContacts', newId), record);
    return record;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `customerContacts/${newId}`);
  }
}

/**
 * Updates an existing Customer Contact.
 */
export async function updateCustomerContactDoc(item: ContactItem) {
  try {
    await setDoc(doc(db, 'customerContacts', item.id), item);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `customerContacts/${item.id}`);
  }
}

/**
 * Deletes a Customer Contact.
 */
export async function deleteCustomerContactDoc(id: string) {
  try {
    await deleteDoc(doc(db, 'customerContacts', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `customerContacts/${id}`);
  }
}

/**
 * Subscribes to Team Leaders in real-time.
 */
export function subscribeToTeamLeaders(onUpdate: (items: TeamLeaderUser[]) => void) {
  return onSnapshot(teamLeadersCol, (snapshot) => {
    const list: TeamLeaderUser[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      list.push({
        id: data.id || doc.id,
        username: data.username,
        password: data.password,
        name: data.name,
        district: data.district,
        mustChangePassword: data.mustChangePassword,
        createdAt: data.createdAt || new Date().toISOString()
      } as TeamLeaderUser);
    });

    list.sort((a, b) => a.name.localeCompare(b.name));
    onUpdate(list);
  }, (err) => {
    handleFirestoreError(err, OperationType.GET, 'teamLeaders');
  });
}

/**
 * Adds a new Team Leader.
 */
export async function addTeamLeaderDoc(item: Omit<TeamLeaderUser, 'id' | 'createdAt'>) {
  const newId = `tl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const cleanUsername = item.username.trim();

  const record: Record<string, any> = {
    id: newId,
    username: cleanUsername,
    password: item.password.trim(),
    name: item.name.trim(),
    createdAt: new Date().toISOString()
  };
  if (item.district) record.district = item.district;
  if (typeof item.mustChangePassword === 'boolean') record.mustChangePassword = item.mustChangePassword;

  try {
    await setDoc(doc(db, 'teamLeaders', newId), record);
    return record as TeamLeaderUser;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `teamLeaders/${newId}`);
  }
}

/**
 * Updates an existing Team Leader's username, password, name, or district.
 */
export async function updateTeamLeaderDoc(item: TeamLeaderUser) {
  const cleanUsername = item.username.trim();
  const record: Record<string, any> = {
    id: item.id,
    username: cleanUsername,
    password: item.password.trim(),
    name: item.name.trim(),
    createdAt: item.createdAt || new Date().toISOString()
  };
  if (item.district) record.district = item.district;
  if (typeof item.mustChangePassword === 'boolean') record.mustChangePassword = item.mustChangePassword;

  try {
    await setDoc(doc(db, 'teamLeaders', item.id), record);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `teamLeaders/${item.id}`);
  }
}

/**
 * Deletes a Team Leader account.
 */
export async function deleteTeamLeaderDoc(id: string) {
  try {
    await deleteDoc(doc(db, 'teamLeaders', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `teamLeaders/${id}`);
  }
}

export interface FeedbackRecord {
  id: string;
  rating: number;
  category: string;
  feedbackText: string;
  submittedBy: string;
  targetEmail: string;
  timestamp: string;
}

/**
 * Stores feedback in Firestore
 */
export async function addFeedbackDoc(feedback: {
  rating: number;
  category: string;
  feedbackText: string;
  submittedBy: string;
  targetEmail: string;
}): Promise<FeedbackRecord> {
  const newId = `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const record: FeedbackRecord = {
    id: newId,
    rating: feedback.rating,
    category: feedback.category,
    feedbackText: feedback.feedbackText.trim(),
    submittedBy: feedback.submittedBy.trim(),
    targetEmail: feedback.targetEmail.trim(),
    timestamp: new Date().toISOString()
  };

  try {
    await setDoc(doc(db, 'feedbacks', newId), record);
    return record;
  } catch (error) {
    console.warn('Firestore feedback storage error:', error);
    return record;
  }
}


