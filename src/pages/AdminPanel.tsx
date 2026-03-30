import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, FolderTree, Shield, Database, Building2, Users, Plus } from 'lucide-react';
import { departments, roleLabels } from '@/data/mockData';

const tabs = [
  { id: 'categories', label: '文件分類', icon: FolderTree },
  { id: 'departments', label: '部門管理', icon: Building2 },
  { id: 'permissions', label: '權限管理', icon: Shield },
  { id: 'rag', label: 'RAG Index', icon: Database },
];

const mockCategories = ['SOP', '政策', '管理辦法', '表單', '記錄', '指引'];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('categories');

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="w-6 h-6 text-primary" />
        <div>
          <h1 className="font-heading text-2xl font-bold">系統管理</h1>
          <p className="text-sm text-muted-foreground">Admin Panel · 文件分類、權限與 RAG 管理</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all border
              ${activeTab === t.id ? 'bg-primary/10 text-primary border-primary/20 shadow-sm ring-4 ring-primary/5' : 'bg-white border-border text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
            <t.icon className="w-4 h-4" />{t.label}
          </button>
        ))}
      </div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {activeTab === 'categories' && (
          <div className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-semibold">文件分類管理</h2>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs shadow-md hover:bg-primary/90 transition-all active:scale-[0.98]">
                <Plus className="w-3 h-3" /> 新增
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockCategories.map(c => (
                <div key={c} className="p-4 rounded-md border border-border bg-[#FBFBFA] flex items-center justify-between hover:border-primary/30 transition-colors group">
                  <div className="flex items-center gap-2">
                    <FolderTree className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{c}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">12 份</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-semibold">部門設定</h2>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs shadow-md hover:bg-primary/90 transition-all active:scale-[0.98]">
                <Plus className="w-3 h-3" /> 新增部門
              </button>
            </div>
            <div className="space-y-3">
              {departments.map(d => (
                <div key={d.id} className="p-4 rounded-md border border-border bg-[#FBFBFA] flex items-center justify-between hover:border-primary/30 transition-colors group">
                  <div>
                    <p className="text-sm font-medium">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.nameEn}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">8 位成員</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h2 className="font-heading font-semibold mb-4">角色權限總覽</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground">
                    <th className="pb-3">角色</th>
                    <th className="pb-3">閱讀</th><th className="pb-3">建立</th>
                    <th className="pb-3">審閱</th><th className="pb-3">核准</th>
                    <th className="pb-3">管理</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { role: 'staff', perms: [true, false, false, false, false] },
                    { role: 'author', perms: [true, true, false, false, false] },
                    { role: 'reviewer', perms: [true, false, true, false, false] },
                    { role: 'approver', perms: [true, false, true, true, false] },
                    { role: 'admin', perms: [true, true, true, true, true] },
                  ].map(r => (
                    <tr key={r.role} className="border-t border-border">
                      <td className="py-3 font-medium">{roleLabels[r.role as keyof typeof roleLabels]}</td>
                      {r.perms.map((p, i) => (
                        <td key={i} className="py-3">
                          <div className={`w-7 h-7 rounded-md flex items-center justify-center text-[10px] border transition-colors
                            ${p ? 'bg-success/10 text-success border-success/20' : 'bg-secondary/50 border-border text-muted-foreground/30'}`}>
                            {p ? '✓' : '—'}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'rag' && (
          <div className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-6">
            <h2 className="font-heading font-semibold">RAG 向量索引管理</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: '已索引文件', value: '124', icon: Database },
                { label: '向量數量', value: '15,840', icon: Database },
                { label: '最近更新', value: '2 小時前', icon: Database },
              ].map(k => (
                <div key={k.label} className="p-4 rounded-md border border-border bg-[#FBFBFA] text-center">
                  <p className="font-heading text-xl font-bold">{k.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{k.label}</p>
                </div>
              ))}
            </div>
            <button className="w-full py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium shadow-md hover:bg-primary/90 transition-all active:scale-[0.98]">
              重新建立索引
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
