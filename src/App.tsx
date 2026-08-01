import React, { useState, useEffect } from 'react';
import { 
  Zap, Bell, Menu, X, ShieldAlert, CheckCircle2, AlertTriangle, 
  Settings, RefreshCw, Layers, LayoutGrid, Clock, LogOut, Sun, Moon 
} from 'lucide-react';

// Types and mock data
import { FeederInterruption, InterruptionType, InterruptionStatus, SystemNotification, TeamLeaderNote, ContactItem } from './types';
import { INITIAL_INTERRUPTIONS, INITIAL_NOTIFICATIONS, INITIAL_DISTRICTS, INITIAL_FEEDERS_LIST } from './data/mockData';

// Firestore Services
import { 
  seedInitialDataIfEmpty,
  subscribeToInterruptions,
  subscribeToNotifications,
  subscribeToFeedersList,
  addInterruptionDoc,
  updateInterruptionDoc,
  deleteInterruptionDoc,
  markAllNotificationsAsReadDoc,
  markOneNotificationAsReadDoc,
  clearAllNotificationsDoc,
  addPresetFeederDoc,
  deletePresetFeederDoc,
  subscribeToHubRecords,
  updateHubRecordDoc,
  subscribeToTeamLeaderNotes,
  addTeamLeaderNoteDoc,
  updateTeamLeaderNoteDoc,
  deleteTeamLeaderNoteDoc,
  clearTeamLeaderNotes,
  subscribeToCustomerContacts,
  addCustomerContactDoc,
  updateCustomerContactDoc,
  deleteCustomerContactDoc
} from './lib/firestoreService';
import { HubRecord } from './data/hubData';

// Subcomponents
import Sidebar from './components/Sidebar';
import StatsGrid from './components/StatsGrid';
import AgentView from './components/AgentView';
import AdminPanel from './components/AdminPanel';
import NotificationCenter from './components/NotificationCenter';
import ResolutionArchive from './components/ResolutionArchive';
import BillCalculator from './components/BillCalculator';
import SmartMeterCalculator from './components/SmartMeterCalculator';
import { FeederHub } from './components/FeederHub';
import CustomerContacts from './components/CustomerContacts';
import EEULogo from './components/EEULogo';
import WebLoginScreen from './components/WebLoginScreen';

export default function App() {
  // 1. Theme State (strictly light mode)
  const isDarkMode = false;
  const toggleTheme = () => {
    // Theme toggling disabled to preserve strictly light mode
  };

  // 2. Data State
  const [interruptions, setInterruptions] = useState<FeederInterruption[]>(() => {
    const saved = localStorage.getItem('eeu-interruptions');
    let loaded: FeederInterruption[] = [];
    if (saved) {
      try {
        loaded = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load interruptions from localStorage', e);
      }
    }
    // Deep deduplication safeguard and filter out legacy mock IDs
    const seen = new Set<string>();
    const legacyMockIds = new Set(['f-1', 'f-2', 'f-3', 'f-4', 'f-5', 'f-6', 'f-7', 'f-8', 'f-9']);
    return loaded.filter((item) => {
      if (!item || !item.id || seen.has(item.id) || legacyMockIds.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    const saved = localStorage.getItem('eeu-notifications');
    let loaded: SystemNotification[] = [];
    if (saved) {
      try {
        loaded = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load notifications from localStorage', e);
      }
    }
    // Deep deduplication safeguard and filtering of Emergency Diagnostics Launched & legacy mocks
    const seen = new Set<string>();
    const legacyNotifIds = new Set(['n-2', 'n-3', 'n-4']);
    return loaded.filter((item) => {
      if (!item || !item.id || seen.has(item.id) || legacyNotifIds.has(item.id)) {
        return false;
      }
      if (item.title === 'Emergency Diagnostics Launched') {
        return false;
      }
      seen.add(item.id);
      return true;
    });
  });

  const [feedersList, setFeedersList] = useState<string[]>(() => {
    const saved = localStorage.getItem('eeu-feeders-list');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to load feeders list from localStorage', e);
      }
    }
    return INITIAL_FEEDERS_LIST;
  });

  const [hubRecords, setHubRecords] = useState<HubRecord[]>([]);
  const [teamLeaderNotes, setTeamLeaderNotes] = useState<TeamLeaderNote[]>([]);
  const [customerContacts, setCustomerContacts] = useState<ContactItem[]>([]);

  // 3. User Authentication & Tab routing
  const [isWebLoggedIn, setIsWebLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('eeu-web-logged') === 'true';
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('eeu-admin-logged') === 'true';
  });

  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState<boolean>(() => {
    return localStorage.getItem('eeu-sidebar-minimized') === 'true';
  });

  const toggleSidebarMinimize = () => {
    setIsSidebarMinimized(prev => {
      const next = !prev;
      localStorage.setItem('eeu-sidebar-minimized', String(next));
      return next;
    });
  };

  // Seed initial data if needed and subscribe to Firestore updates in real-time
  useEffect(() => {
    let unsubInterruptions = () => {};
    let unsubNotifications = () => {};
    let unsubFeeders = () => {};
    let unsubHubRecords = () => {};
    let unsubNotes = () => {};
    let unsubCustomerContacts = () => {};

    seedInitialDataIfEmpty().then(async () => {
      // Clear notes on reload/mount so the board starts empty as requested
      await clearTeamLeaderNotes();

      unsubInterruptions = subscribeToInterruptions((items) => {
        setInterruptions(items);
        localStorage.setItem('eeu-interruptions', JSON.stringify(items));
      });
      unsubNotifications = subscribeToNotifications((items) => {
        const filtered = items.filter(item => item && item.title !== 'Emergency Diagnostics Launched');
        setNotifications(filtered);
        localStorage.setItem('eeu-notifications', JSON.stringify(filtered));
      });
      unsubFeeders = subscribeToFeedersList((items) => {
        setFeedersList(items);
        localStorage.setItem('eeu-feeders-list', JSON.stringify(items));
      });
      unsubHubRecords = subscribeToHubRecords((items) => {
        setHubRecords(items);
      });
      unsubNotes = subscribeToTeamLeaderNotes((items) => {
        setTeamLeaderNotes(items);
      });
      unsubCustomerContacts = subscribeToCustomerContacts((items) => {
        setCustomerContacts(items);
      });
    });

    return () => {
      unsubInterruptions();
      unsubNotifications();
      unsubFeeders();
      unsubHubRecords();
      unsubNotes();
      unsubCustomerContacts();
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('eeu-theme');
  }, []);

  // Automated cleanup of restored reports: keep only the 20 most recent and delete the rest
  useEffect(() => {
    const restored = interruptions.filter(item => item.status === InterruptionStatus.RESTORED);
    if (restored.length > 20) {
      const sortedRestored = [...restored].sort((a, b) => {
        // Try comparing based on timestamp in ID if it looks like f-TIMESTAMP-suffix
        const matchA = a.id.match(/^f-(\d+)-/);
        const matchB = b.id.match(/^f-(\d+)-/);
        if (matchA && matchB) {
          return Number(matchB[1]) - Number(matchA[1]); // Descending (newest first)
        }
        return b.lastUpdated.localeCompare(a.lastUpdated);
      });
      
      const toDelete = sortedRestored.slice(20);
      toDelete.forEach(async (item) => {
        try {
          await deleteInterruptionDoc(item.id);
          console.log(`Automatically pruned excess restored report: ${item.id}`);
        } catch (err) {
          console.error(`Failed to prune excess report: ${item.id}`, err);
        }
      });
    }
  }, [interruptions]);

  // Highlight toast notification for active feedback
  const [liveToast, setLiveToast] = useState<{ title: string; desc: string; type: 'info' | 'success' | 'warn' } | null>(null);

  const triggerToast = (title: string, desc: string, type: 'info' | 'success' | 'warn' = 'info') => {
    setLiveToast({ title, desc, type });
    setTimeout(() => {
      setLiveToast(null);
    }, 4500);
  };

  // Administrative functions
  const handleLoginAdmin = (pin: string): boolean => {
    if (pin === '1234') {
      setIsAdmin(true);
      localStorage.setItem('eeu-admin-logged', 'true');
      triggerToast('Admin Authorized', 'Successfully entered administrative grid controls', 'success');
      return true;
    }
    return false;
  };

  const handleLogoutAdmin = () => {
    setIsAdmin(false);
    localStorage.setItem('eeu-admin-logged', 'false');
    if (currentTab === 'admin') {
      setCurrentTab('dashboard');
    }
    triggerToast('Logged Out', 'Successfully locked write privileges', 'info');
  };

  const handleLogoutWeb = () => {
    setIsWebLoggedIn(false);
    localStorage.setItem('eeu-web-logged', 'false');
    setIsAdmin(false);
    localStorage.setItem('eeu-admin-logged', 'false');
    setCurrentTab('dashboard');
    triggerToast('Signed Out', 'Operator console session closed successfully', 'info');
  };

  // Create interruption
  const handleAddInterruption = async (entry: Omit<FeederInterruption, 'id' | 'lastUpdated'>) => {
    try {
      await addInterruptionDoc(entry);
      triggerToast('New Outage Added', `${entry.feederName} has been synchronized across agent terminals`, 'warn');
    } catch (e) {
      console.error(e);
      triggerToast('Failed to Add Outage', 'Error occurred while saving to database', 'warn');
    }
  };

  // Update interruption
  const handleUpdateInterruption = async (id: string, entry: Partial<FeederInterruption>) => {
    try {
      const existing = interruptions.find(item => item.id === id);
      if (!existing) return;
      await updateInterruptionDoc(id, entry, existing);
      if (entry.status && entry.status !== existing.status) {
        const titleText = entry.status === InterruptionStatus.RESTORED ? 'Feeder Line Cleared' : 'Operational Status Changed';
        const messageText = entry.status === InterruptionStatus.RESTORED 
          ? `${existing.feederName} restored to active grid status and re-energized successfully.`
          : `${existing.feederName} reassessed as ${entry.status}.`;
        triggerToast(titleText, messageText, entry.status === InterruptionStatus.RESTORED ? 'success' : 'info');
      } else {
        triggerToast('Record Updated', `Successfully updated grid data for ${existing.feederName}`, 'success');
      }
    } catch (e) {
      console.error(e);
      triggerToast('Update Failed', 'Error occurred while updating record', 'warn');
    }
  };

  // Delete interruption
  const handleDeleteInterruption = async (id: string) => {
    try {
      const target = interruptions.find(i => i.id === id);
      await deleteInterruptionDoc(id);
      if (target) {
        triggerToast('Record Removed', `${target.feederName} interruption cleared from dispatch lists.`, 'info');
      }
    } catch (e) {
      console.error(e);
      triggerToast('Deletion Failed', 'Error occurred while deleting record', 'warn');
    }
  };

  // Notifications operational state
  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsReadDoc();
      triggerToast('All Read', 'Cleared unread notification counter badge', 'success');
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkOneAsRead = async (id: string) => {
    try {
      await markOneNotificationAsReadDoc(id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearAllNotifications = async () => {
    try {
      await clearAllNotificationsDoc();
      triggerToast('Logs Cleared', 'Empty notification feed registry', 'info');
    } catch (e) {
      console.error(e);
    }
  };

  // Syncing feeders list updates to Firestore
  const handleUpdateFeedersList = async (newList: string[]) => {
    try {
      const added = newList.filter(x => !feedersList.includes(x));
      const removed = feedersList.filter(x => !newList.includes(x));

      for (const item of removed) {
        await deletePresetFeederDoc(item);
      }
      for (const item of added) {
        await addPresetFeederDoc(item);
      }
    } catch (e) {
      console.error(e);
      triggerToast('Sync Error', 'Error updating preset feeder lists', 'warn');
    }
  };

  // Simulated Dynamic Incident Generator
  const handleTriggerMockIncident = () => {
    // Pick random substation details
    const substations = [
      'Mexanisa Central - Feeder 04', 
      'Piazza Heritage - Feeder 02', 
      'Ayat Substation - Feeder 11', 
      'Bole Bulbula - Feeder 09', 
      'Saris Industrial - Feeder 07', 
      'Sululta Overheadline - Feeder 03'
    ];
    
    const chosenFeeder = substations[Math.floor(Math.random() * substations.length)];
    
    // Pick random district
    const chosenDistrict = INITIAL_DISTRICTS[Math.floor(Math.random() * INITIAL_DISTRICTS.length)];
    
    // Pick random type
    const incidentTypes = [
      { t: InterruptionType.EARTH_FAULT, r: 'Ground phase breakdown detected. Substation tripped protectively.' },
      { t: InterruptionType.SHORT_CIRCUIT, r: 'Tree line friction under heavy gusts. Insulators damaged.' },
      { t: InterruptionType.OPERATIONAL_INTERRUPTION, r: 'Replacing burnt overhead cables and tightening drop link lines.' }
    ];
    const pickedTypeObj = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
    
    // Areas
    const areas = [
      'Merkato Market, Raguel Church, and adjacent stalls',
      'Ayat Zone 3, Ayat Hospital vicinity, and local apartments',
      'Piazza Churchill Road, Taitu Hotel Street, and surrounding banks',
      'Saris Abo area, Cadisco vicinity, and surrounding industrial campuses',
      'Sululta town center, military camp area, and local residential grids'
    ];
    const chosenArea = areas[Math.floor(Math.random() * areas.length)];

    const now = new Date();
    const future = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours

    const formatTime = (d: Date) => d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    handleAddInterruption({
      feederName: chosenFeeder,
      district: chosenDistrict,
      type: pickedTypeObj.t,
      status: InterruptionStatus.ACTIVE,
      startTime: formatTime(now),
      estimatedRestorationTime: formatTime(future),
      affectedArea: chosenArea,
      remark: pickedTypeObj.r
    });
  };

  // Aggregate stats
  const activeUnreadCount = notifications.filter(n => !n.read).length;

  if (!isWebLoggedIn) {
    return (
      <WebLoginScreen
        onLoginSuccess={(isUserAdmin) => {
          setIsWebLoggedIn(true);
          localStorage.setItem('eeu-web-logged', 'true');
          setIsAdmin(isUserAdmin);
          localStorage.setItem('eeu-admin-logged', isUserAdmin ? 'true' : 'false');
          triggerToast('Welcome Back', isUserAdmin ? 'Logged in as Admin' : 'Logged in as Call Center Agent', 'success');
        }}
      />
    );
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen mesh-bg text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200">
        
        {/* TOP MOBILE HEADER */}
        <header className="lg:hidden p-4 border-b border-gray-200/30 dark:border-gray-900/30 flex items-center justify-between glass-card rounded-none z-20 sticky top-0">
          <div className="flex items-center gap-2">
            <EEULogo size={32} />
            <div>
              <span className="font-display font-medium text-[9px] leading-none text-[#F48B20] block">የኢትዮጵያ ኤሌክትሪክ አገልግሎት</span>
              <h1 className="font-display font-bold text-[10px] tracking-tight text-[#5FA354] dark:text-[#5FA354] mt-0.5">Ethiopian Electric Utility</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification Indicator badge */}
            <button
              id="mobile-tab-noti-toggle"
              onClick={() => setCurrentTab('notifications')}
              className="p-2 text-gray-400 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg relative"
            >
              <Bell className="w-4.5 h-4.5" />
              {activeUnreadCount > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-ping" />
              )}
            </button>

            {/* Mobile Hamburger menu */}
            <button
              id="mobile-menu-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/60 rounded-lg hover:shadow-md hover:shadow-black/10 dark:hover:shadow-black/40 transition-all duration-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* MOBILE MENU NAV DROPDOWN */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-900 p-4 space-y-2 text-left animate-in slide-in-from-top-4 duration-200 z-40 fixed top-16 left-0 right-0 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="text-[9px] font-bold text-gray-400 tracking-wider uppercase px-2 mb-1">Grid Portals</div>
            
            <button
              id="mob-nav-dashboard"
              onClick={() => { setCurrentTab('dashboard'); setMobileMenuOpen(false); }}
              className={`w-full p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${currentTab === 'dashboard' ? 'bg-eeu-green text-white' : 'text-gray-600 dark:text-gray-400'}`}
            >
              Call Center Grid Board
            </button>

            {isAdmin && (
              <button
                id="mob-nav-admin"
                onClick={() => { setCurrentTab('admin'); setMobileMenuOpen(false); }}
                className={`w-full p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${currentTab === 'admin' ? 'bg-eeu-green text-white' : 'text-gray-600 dark:text-gray-400'}`}
              >
                Feeder Admin Panel
              </button>
            )}

            <button
              id="mob-nav-notifications"
              onClick={() => { setCurrentTab('notifications'); setMobileMenuOpen(false); }}
              className={`w-full p-2.5 rounded-lg text-xs font-semibold flex items-center justify-between ${currentTab === 'notifications' ? 'bg-eeu-green text-white' : 'text-gray-600 dark:text-gray-400'}`}
            >
              <span>Incident Feeds</span>
              {activeUnreadCount > 0 && (
                <span className="py-0.5 px-2 text-[10px] bg-red-500 rounded-full text-white font-bold">{activeUnreadCount}</span>
              )}
            </button>

            <button
              id="mob-nav-history"
              onClick={() => { setCurrentTab('history'); setMobileMenuOpen(false); }}
              className={`w-full p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${currentTab === 'history' ? 'bg-eeu-green text-white' : 'text-gray-600 dark:text-gray-400'}`}
            >
              Resolution Archive
            </button>

            <button
              id="mob-nav-calculator"
              onClick={() => { setCurrentTab('calculator'); setMobileMenuOpen(false); }}
              className={`w-full p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${currentTab === 'calculator' ? 'bg-eeu-green text-white' : 'text-gray-600 dark:text-gray-400'}`}
            >
              Bill Calculator
            </button>

            <button
              id="mob-nav-smartmeter"
              onClick={() => { setCurrentTab('smartmeter'); setMobileMenuOpen(false); }}
              className={`w-full p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${currentTab === 'smartmeter' ? 'bg-eeu-green text-white' : 'text-gray-600 dark:text-gray-400'}`}
            >
              Smart Meter Calculator
            </button>

            <button
              id="mob-nav-hub"
              onClick={() => { setCurrentTab('hub'); setMobileMenuOpen(false); }}
              className={`w-full p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${currentTab === 'hub' ? 'bg-eeu-green text-white' : 'text-gray-600 dark:text-gray-400'}`}
            >
              CSC ADDRESS Directory
            </button>

            <button
              id="mob-nav-contacts"
              onClick={() => { setCurrentTab('contacts'); setMobileMenuOpen(false); }}
              className={`w-full p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 ${currentTab === 'contacts' ? 'bg-eeu-green text-white' : 'text-gray-600 dark:text-gray-400'}`}
            >
              Other Region Phone NO
            </button>



            <button
              id="mob-web-logout-btn"
              onClick={() => { handleLogoutWeb(); setMobileMenuOpen(false); }}
              className="w-full mt-2 py-2 text-center text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>SIGN OUT PORTAL</span>
            </button>

            <div className="text-[10px] text-gray-400 dark:text-gray-500 text-center select-none pt-2.5 font-sans border-t border-gray-100 dark:border-gray-900/40">
              Developed by <span className="text-eeu-green font-semibold">Zekarias Zenebe</span>
            </div>
          </div>
        )}

        {/* MAIN STRUCTURAL LAYOUT COMPONENT */}
        <div className="flex-1 flex min-h-0 relative">
          
          {/* DESKTOP SIDEBAR PANEL */}
          <Sidebar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            isAdmin={isAdmin}
            onLogoutAdmin={handleLogoutAdmin}
            onLogoutWeb={handleLogoutWeb}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            notificationCount={activeUnreadCount}
            isMinimized={isSidebarMinimized}
            onToggleMinimize={toggleSidebarMinimize}
          />

          {/* RIGHT SIDE MAIN CONTAINER */}
          <main className={`flex-1 ${isSidebarMinimized ? 'lg:pl-24' : 'lg:pl-72'} p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto transition-all duration-300`}>
            
            {/* TOP HEADER STATUS ROW (DESKTOP) */}
            <div className="max-lg:hidden flex items-center justify-between gap-4 pt-5 lg:pt-8 pb-4 border-b border-gray-200/40 dark:border-gray-800/40">
              <div className="text-left">
                <span className="text-xs text-[#5FA354] dark:text-[#5FA354] font-bold uppercase tracking-wider font-sans flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5FA354] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5FA354]"></span>
                  </span>
                  የኢትዮጵያ ኤሌክትሪክ አገልግሎት <span className="text-gray-300 dark:text-gray-700">|</span> Ethiopian Electric Utility
                </span>
                <h1 className="text-[25px] font-display font-black tracking-tight text-gray-950 dark:text-white mt-1">
                  Feeder Interruption For Call Center
                </h1>
              </div>

              {/* Status and Active Indicators */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 p-2 px-3 glass-card rounded-2xl text-xs select-none shadow-none">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">Channel Status: <strong className="text-eeu-green dark:text-emerald-450 font-semibold">Online</strong></span>
                </div>

                <div className="flex items-center gap-2 p-2 px-3 glass-card rounded-2xl text-xs shadow-none">
                  <span className="text-gray-500 dark:text-gray-400">Current User:</span>
                  <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                    <span>{isAdmin ? 'Admin' : 'Call Center Agent'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* LIVE DATA STATISTICS ROW */}
            {currentTab !== 'hub' && currentTab !== 'admin' && currentTab !== 'notifications' && currentTab !== 'history' && currentTab !== 'contacts' && currentTab !== 'calculator' && currentTab !== 'smartmeter' && <StatsGrid interruptions={interruptions} />}

            {/* DETAILED VIEWS CONTAINER */}
            <div id="active-tab-container" className="pt-2 animate-in fade-in-40 duration-200">
              {currentTab === 'dashboard' && (
                <AgentView 
                  interruptions={interruptions} 
                  onTriggerMockIncident={handleTriggerMockIncident} 
                  isAdmin={isAdmin}
                  teamLeaderNotes={teamLeaderNotes}
                />
              )}

              {currentTab === 'admin' && isAdmin && (
                <AdminPanel
                  isAdmin={isAdmin}
                  onLoginAdmin={handleLoginAdmin}
                  onLogoutAdmin={handleLogoutAdmin}
                  onSwitchToAgentMode={() => setCurrentTab('dashboard')}
                  interruptions={interruptions}
                  onAddInterruption={handleAddInterruption}
                  onUpdateInterruption={handleUpdateInterruption}
                  onDeleteInterruption={handleDeleteInterruption}
                  feedersList={feedersList}
                  onUpdateFeedersList={handleUpdateFeedersList}
                />
              )}

              {currentTab === 'notifications' && (
                <NotificationCenter
                  notifications={notifications}
                  onMarkAllAsRead={handleMarkAllAsRead}
                  onMarkOneAsRead={handleMarkOneAsRead}
                  onClearAllNotifications={handleClearAllNotifications}
                  interruptions={interruptions}
                />
              )}

              {currentTab === 'history' && (
                <ResolutionArchive interruptions={interruptions} />
              )}

              {currentTab === 'calculator' && (
                <BillCalculator />
              )}

              {currentTab === 'smartmeter' && (
                <SmartMeterCalculator />
              )}

              {currentTab === 'hub' && (
                <FeederHub 
                  isAdmin={isAdmin} 
                  hubRecords={hubRecords} 
                  onUpdateRecord={updateHubRecordDoc} 
                />
              )}

              {currentTab === 'contacts' && (
                <CustomerContacts 
                  isAdmin={isAdmin}
                  contacts={customerContacts}
                  onAddContact={addCustomerContactDoc}
                  onUpdateContact={updateCustomerContactDoc}
                  onDeleteContact={deleteCustomerContactDoc}
                />
              )}
            </div>
          </main>
        </div>

        {/* FIXED FLOATING LIVE TOAST/NOTIFICATION POPUP */}
        {liveToast && (
          <div className="fixed bottom-6 right-6 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl flex items-start gap-3.5 z-55 max-w-sm animate-in slide-in-from-bottom-5 duration-200">
            <div className={`p-2 rounded-xl text-white shrink-0 ${
              liveToast.type === 'success' 
                ? 'bg-eeu-green' 
                : liveToast.type === 'warn' 
                ? 'bg-red-500' 
                : 'bg-blue-600'
            }`}>
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            
            <div className="flex-1 text-left">
              <h4 className="font-bold text-xs text-gray-900 dark:text-white leading-normal">
                {liveToast.title}
              </h4>
              <p className="text-[11px] text-gray-500 dark:text-gray-300 mt-1 leading-normal">
                {liveToast.desc}
              </p>
            </div>
            
            <button
              id="toast-close-btn"
              onClick={() => setLiveToast(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* BOTTOM ACCENT BAR Representing Ethiopian Electric Utility */}
        <footer id="branding-footer" className={`py-3 px-6 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900/60 text-center flex items-center justify-end text-[10px] text-gray-400 dark:text-gray-500 font-mono select-none transition-all duration-300 ${isSidebarMinimized ? 'lg:pl-24' : 'lg:pl-72'}`}>
          <div className="flex items-center gap-2 justify-end ml-auto">
            <EEULogo size={18} />
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-semibold text-[#F48B20]">የኢትዮጵያ ኤሌክትሪክ አገልግሎት</span>
              <span className="text-gray-300 dark:text-gray-800">|</span>
              <span className="font-sans font-bold text-[#5FA354]">Ethiopian Electric Utility (EEU)</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
