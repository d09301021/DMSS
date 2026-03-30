import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Save, Send, Plus, X, Building2 } from 'lucide-react';
import { departments } from '@/data/mockData';

export default function DocumentEditor() {
  const [title, setTitle] = useState('');
  const [docNumber, setDocNumber] = useState('');
  const [category, setCategory] = useState('SOP');
  const [selectedDepts, setSelectedDepts] = useState<string[]>([departments[0].id]);
  const [reviewers, setReviewers] = useState('');

  const toggleDept = (id: string) => {
    setSelectedDepts(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">文件編輯器</h1>
        <p className="text-sm text-muted-foreground mt-1">Document Editor · 建立或編輯文件草稿</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-border rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">文件編號</label>
            <input value={docNumber} onChange={e => setDocNumber(e.target.value)} placeholder="SOP-LAB-XXX"
              className="w-full px-4 py-2 rounded-md bg-white border border-border text-sm outline-none placeholder:text-muted-foreground/50 shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">分類</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white border border-border text-sm outline-none appearance-none cursor-pointer shadow-sm">
              <option>SOP</option><option>政策</option><option>管理辦法</option><option>表單</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">文件標題</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="輸入文件標題..."
            className="w-full px-4 py-2.5 rounded-md bg-white border border-border text-sm outline-none placeholder:text-muted-foreground/50 shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all" />
        </div>

        {/* Visible departments */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
            <Building2 className="w-3 h-3" /> 可見部門
          </label>
          <div className="flex flex-wrap gap-2">
            {departments.map(d => (
              <button key={d.id} onClick={() => toggleDept(d.id)}
                className={`px-3 py-1.2 rounded-md text-xs font-medium transition-colors
                  ${selectedDepts.includes(d.id) ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' : 'bg-white border border-border text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
                {d.name}
              </button>
            ))}
          </div>
        </div>

        {/* File upload */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">上傳檔案</label>
          <div className="rounded-xl border-2 border-dashed border-border bg-[#FBFBFA] p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors group">
            <Upload className="w-8 h-8 text-muted-foreground/50 group-hover:text-primary transition-colors mb-3" />
            <p className="text-sm font-medium text-foreground">拖曳或點擊上傳 PDF / Word 檔案</p>
            <p className="text-xs text-muted-foreground mt-1">支援 .pdf, .docx, .doc 格式</p>
          </div>
        </div>

        {/* Reviewer */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">指派審閱者</label>
          <input value={reviewers} onChange={e => setReviewers(e.target.value)} placeholder="輸入審閱者名稱..."
            className="w-full px-4 py-2.5 rounded-md bg-white border border-border text-sm outline-none placeholder:text-muted-foreground/50 shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all" />
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button className="flex-1 py-2.5 rounded-md bg-white border border-border shadow-sm text-sm font-medium flex items-center justify-center gap-2 hover:bg-secondary transition-colors transition-all active:scale-[0.98]">
            <Save className="w-4 h-4 text-muted-foreground" /> 儲存草稿
          </button>
          <button className="flex-1 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 shadow-md hover:bg-primary/90 transition-all active:scale-[0.98]">
            <Send className="w-4 h-4 text-white" /> 送出審閱
          </button>
        </div>
      </motion.div>
    </div>
  );
}
