import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, FilePlus, CheckSquare, Settings,
  BarChart3, LogOut, ChevronLeft, ChevronRight, Bot, User
} from 'lucide-react';
import { departments, roleLabels } from '@/data/mockData';
import { supabase } from '@/lib/supabase';

const navItems = [
  { path: '/dashboard', label: '儀表板', labelEn: 'Dashboard', icon: LayoutDashboard },
  { path: '/bookshelf', label: '文件書架', labelEn: 'Bookshelf', icon: BookOpen },
  { path: '/editor', label: '文件編輯', labelEn: 'Editor', icon: FilePlus },
  { path: '/review', label: '審閱工作區', labelEn: 'Review', icon: CheckSquare },
  { path: '/analytics', label: '閱讀統計', labelEn: 'Analytics', icon: BarChart3 },
  { path: '/admin', label: '系統管理', labelEn: 'Admin', icon: Settings },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!error && data) {
      setProfile(data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const displayName = profile?.full_name || session?.user?.email || '未登入';
  const displayDept = departments.find(d => d.id === profile?.department_id)?.name || '預設部門';

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen sticky top-0 flex flex-col bg-sidebar border-r border-sidebar-border z-30 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
            <h1 className="font-heading font-bold text-sm tracking-tight">DocGuard</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">ISO System</p>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link key={path} to={path}>
              <motion.div
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-3 py-1.5 rounded-md transition-colors text-sm
                  ${active 
                    ? 'bg-sidebar-accent text-sidebar-foreground font-medium shadow-sm' 
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'}`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-primary' : ''}`} />
                {!collapsed && <span>{label}</span>}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 pb-3 space-y-2">
        <div className={`flex items-center gap-3 px-2 py-2 rounded-md transition-colors hover:bg-sidebar-accent/50 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-primary" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-medium truncate">{displayName}</p>
              <p className="text-[10px] text-muted-foreground truncate font-normal">
                {displayDept} · {roleLabels['staff']}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {!collapsed && (
            <button 
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-md bg-white border border-border shadow-sm text-xs font-medium text-muted-foreground hover:bg-secondary transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>登出</span>
            </button>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-white border border-border shadow-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
