import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, StarOff, Filter, Paperclip, Eye, Building2 } from 'lucide-react';
import { mockDocuments, departments, type DocStatus } from '@/data/mockData';
import StatusBadge from '@/components/shared/StatusBadge';

const categories = ['全部', 'SOP', '政策', '管理辦法'];
const statusFilters: { label: string; value: DocStatus | 'all' }[] = [
  { label: '全部', value: 'all' },
  { label: '草稿', value: 'draft' },
  { label: '審閱中', value: 'in-review' },
  { label: '已核准', value: 'approved' },
  { label: '已發行', value: 'published' },
  { label: '已廢止', value: 'obsolete' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Bookshelf() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('全部');
  const [selectedStatus, setSelectedStatus] = useState<DocStatus | 'all'>('all');
  const [selectedDept, setSelectedDept] = useState('all');
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(mockDocuments.filter(d => d.isFavorite).map(d => d.id))
  );

  const filtered = useMemo(() => {
    return mockDocuments.filter(d => {
      if (search && !d.title.includes(search) && !d.docNumber.toLowerCase().includes(search.toLowerCase()) && !d.keywords.some(k => k.includes(search))) return false;
      if (selectedCat !== '全部' && d.category !== selectedCat) return false;
      if (selectedStatus !== 'all' && d.status !== selectedStatus) return false;
      if (selectedDept !== 'all' && d.department.id !== selectedDept) return false;
      return true;
    });
  }, [search, selectedCat, selectedStatus, selectedDept]);

  const toggleFav = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">文件書架</h1>
          <p className="text-sm text-muted-foreground mt-1">Bookshelf · 共 {filtered.length} 份文件</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="搜尋文件名稱、編號、關鍵字..."
            className="w-full pl-10 pr-4 py-2 rounded-md bg-white border border-border text-sm outline-none placeholder:text-muted-foreground/50 shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
          />
        </div>
        <div className="flex items-center gap-1 px-3 rounded-md bg-white border border-border shadow-sm">
          <Building2 className="w-4 h-4 text-muted-foreground" />
          <select
            value={selectedDept} onChange={e => setSelectedDept(e.target.value)}
            className="bg-transparent text-sm py-2 outline-none cursor-pointer"
          >
            <option value="all">全部部門</option>
            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(c => (
          <button key={c} onClick={() => setSelectedCat(c)}
            className={`px-3 py-1.2 rounded-md text-xs font-medium transition-colors ${selectedCat === c ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-white border border-border text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
            {c}
          </button>
        ))}
        <div className="w-px bg-border h-6 self-center mx-1" />
        {statusFilters.map(s => (
          <button key={s.value} onClick={() => setSelectedStatus(s.value)}
            className={`px-3 py-1.2 rounded-md text-xs font-medium transition-colors ${selectedStatus === s.value ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-white border border-border text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Document Grid */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(doc => (
          <motion.div key={doc.id} variants={item}>
            <Link to={`/document/${doc.id}`}>
              <div className="bg-white border border-border rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-muted-foreground">{doc.docNumber}</span>
                  <div className="flex items-center gap-1">
                    <StatusBadge status={doc.status} />
                    <button
                      onClick={e => { e.preventDefault(); toggleFav(doc.id); }}
                      className="p-1 rounded-md hover:bg-secondary transition-colors"
                    >
                      {favorites.has(doc.id)
                        ? <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                        : <StarOff className="w-3.5 h-3.5 text-muted-foreground" />
                      }
                    </button>
                  </div>
                </div>
                <h3 className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">{doc.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{doc.summary}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {doc.keywords.slice(0, 3).map(k => (
                    <span key={k} className="px-2 py-0.5 rounded-full text-[10px] bg-secondary text-secondary-foreground">{k}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <span className="text-[10px] text-muted-foreground">{doc.department.name}</span>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{doc.readCount}</span>
                    <span className="flex items-center gap-0.5"><Paperclip className="w-3 h-3" />{doc.attachments}</span>
                    <span>v{doc.version}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
