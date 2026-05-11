import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../App';
import { storeService } from '../../services/storeService';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  Store as StoreIcon, 
  LogOut, 
  ChevronRight, 
  Bell, 
  Search,
  ExternalLink,
  ChevronLeft,
  Menu,
  X,
  BookOpen,
  Info
} from 'lucide-react';
import { Button } from '../ui/button';
import { ThemeToggle } from '../ThemeToggle';
import { authService } from '../../services/authService';
import { Store } from '../../types';

export default function DashboardLayout() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    if (profile?.storeId) {
      storeService.getStoreById(profile.storeId).then(setStore);
    }
  }, [profile]);

  if (!profile?.storeId) {
    navigate('/onboarding');
    return null;
  }

  const handleLogout = async () => {
    await authService.logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Products', icon: Package, path: '/dashboard/products' },
    { label: 'User Guide', icon: BookOpen, path: '/dashboard/guide' },
    { label: 'About', icon: Info, path: '/dashboard/about' },
    { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-background flex text-foreground">
      {/* Sidebar - Desktop */}
      <aside className={`hidden md:flex flex-col bg-ink text-cream transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} h-screen sticky top-0 border-r border-white/5 shadow-2xl z-40`}>
        <div className="p-6 flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-serif font-black tracking-tighter text-white">
              SANKALP METALUX<span className="text-gold">.</span>
            </h1>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1 hover:bg-white/10 rounded transition-colors">
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                  isActive ? 'bg-gold text-white shadow-lg' : 'text-cream/50 hover:bg-white/5 hover:text-cream'
                }`
              }
            >
              <item.icon size={20} className={collapsed ? '' : 'flex-shrink-0'} />
              {!collapsed && <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto space-y-4">
          <div className={`p-4 rounded-xl bg-white/5 border border-white/10 ${collapsed ? 'px-2' : ''}`}>
            {!collapsed && <p className="text-[8px] uppercase tracking-widest text-cream/40 mb-2 font-bold">Store Mode</p>}
            <button 
              onClick={() => navigate(`/s/${store?.slug}`)} 
              disabled={!store}
              className="flex items-center gap-2 text-gold hover:text-white transition-colors overflow-hidden whitespace-nowrap disabled:opacity-50"
            >
              <StoreIcon size={18} />
              {!collapsed && <span className="text-[10px] font-bold tracking-widest uppercase">View Boutique</span>}
            </button>
          </div>
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 text-cream/40 hover:text-rose transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut size={20} />
            {!collapsed && <span className="text-xs font-bold uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border h-16 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 hover:bg-accent rounded" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={20} className="text-foreground" />
            </button>
            <div className="hidden lg:flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              <span>Sankalp MetaLux</span>
              <ChevronRight size={12} />
              <span className="text-foreground">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input 
                placeholder="Search resources..." 
                className="bg-accent/50 border border-border rounded-full pl-10 pr-4 py-2 text-[10px] font-medium focus:ring-1 focus:ring-gold outline-none w-48 lg:w-64 transition-all"
              />
            </div>
            
            <ThemeToggle />
            
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell size={20} />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose rounded-full border-2 border-background" />
            </button>

            <div className="flex items-center gap-3 pl-2 md:pl-6 border-l border-border">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold text-foreground uppercase tracking-tighter leading-tight">{user?.displayName}</p>
                <p className="text-[9px] font-bold text-gold uppercase tracking-[0.2em]">{profile?.role}</p>
              </div>
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border-2 border-gold/20 flex-shrink-0">
                <img src={user?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + user?.email} alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-6 lg:p-10">
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="bg-ink w-64 h-full flex flex-col p-6 space-y-8 animate-in slide-in-from-left duration-300">
             <div className="flex justify-between items-center">
                <h1 className="text-xl font-serif font-black tracking-tighter text-white">SANKALP METALUX.</h1>
                <button onClick={() => setMobileMenuOpen(false)}><X className="text-white" /></button>
             </div>
             <nav className="space-y-4">
                {navItems.map(item => (
                   <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-cream/60 p-2 uppercase text-[10px] font-bold tracking-widest hover:text-gold">
                      <item.icon size={18} /> {item.label}
                   </Link>
                ))}
             </nav>
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </div>
  );
}
