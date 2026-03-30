import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Mail, Lock, ChevronRight, UserPlus, LogIn } from 'lucide-react';
import { departments } from '@/data/mockData';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dept, setDept] = useState(departments[0].id);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Check if session exists and redirect
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate('/dashboard');
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              department_id: dept,
            },
          },
        });
        if (error) throw error;
        toast.success('註冊成功！請登入');
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success('歡迎回來！');
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message || '發生錯誤');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-sm"
      >
        {/* Logo card */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="w-16 h-16 rounded-xl bg-primary/10 mx-auto flex items-center justify-center border border-primary/20 mb-5"
          >
            <Bot className="w-8 h-8 text-primary" />
          </motion.div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">DocGuard</h1>
          <p className="text-sm text-muted-foreground mt-1.5 font-medium">ISO 文件管制系統</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.1)] p-8 space-y-5">
          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-1.5"
            >
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">姓名</label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input
                  type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                  placeholder="請輸入真實姓名"
                  className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white border border-border text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                  required
                />
              </div>
            </motion.div>
          )}

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">電子郵件</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white border border-border text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">密碼</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-md bg-white border border-border text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">所屬部門</label>
            <select
              value={dept} onChange={e => setDept(e.target.value)}
              className="w-full px-3 py-2.5 rounded-md bg-white border border-border text-sm outline-none appearance-none cursor-pointer hover:bg-secondary/30 transition-colors"
            >
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.nameEn})</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
          >
            {loading ? '處理中...' : isSignUp ? '註冊帳號' : '登入系統'} 
            {!loading && (isSignUp ? <UserPlus className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)}
          </button>

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-center text-xs text-primary font-medium hover:text-primary/80 transition-colors"
            >
              {isSignUp ? '已有帳號？直接登入' : '還沒有帳號？立即註冊'}
            </button>
            <p className="text-center text-[10px] text-muted-foreground border-t border-border/50 pt-3">
              忘記密碼？請聯繫系統管理員
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
