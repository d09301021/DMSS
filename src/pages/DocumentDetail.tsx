import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Download, Sparkles, Clock, User, CheckCircle2, Paperclip, Eye, Building2, Calendar, Tag } from 'lucide-react';
import { mockDocuments, statusLabels } from '@/data/mockData';
import StatusBadge from '@/components/shared/StatusBadge';

const lifecycleSteps = ['草稿', '審閱中', '已核准', '已發行'];
const statusIndex: Record<string, number> = { draft: 0, 'in-review': 1, approved: 2, published: 3, obsolete: 3 };

export default function DocumentDetail() {
  const { id } = useParams();
  const doc = mockDocuments.find(d => d.id === id) ?? mockDocuments[0];
  const step = statusIndex[doc.status] ?? 0;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-5xl">
      {/* Back */}
      <Link to="/bookshelf" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> 返回書架
      </Link>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-border rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-muted-foreground">{doc.docNumber}</span>
              <StatusBadge status={doc.status} />
            </div>
            <h1 className="font-heading text-xl font-bold">{doc.title}</h1>
            <p className="text-sm text-muted-foreground mt-1.5 font-medium">版本 {doc.version} · {doc.department.name}</p>
          </div>
          <button className="px-4 py-2 rounded-md bg-white border border-border shadow-sm text-sm font-medium flex items-center gap-2 hover:bg-secondary transition-all active:scale-[0.98]">
            <Download className="w-4 h-4" /> 下載
          </button>
        </div>

        {/* Lifecycle */}
        <div className="mt-6">
          <p className="text-xs font-medium text-muted-foreground mb-3">文件生命週期</p>
          <div className="flex items-center gap-3">
            {lifecycleSteps.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors
                  ${i <= step ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary border-border text-muted-foreground/60'}`}>
                  {i + 1}
                </div>
                <span className={`text-xs ${i <= step ? 'font-semibold text-foreground' : 'text-muted-foreground font-medium'}`}>{s}</span>
                {i < lifecycleSteps.length - 1 && <div className={`w-10 h-[1px] ${i < step ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-6">
          {/* AI Summary */}
          <div className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-heading font-semibold">AI 摘要</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{doc.summary}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {doc.keywords.map(k => (
                <span key={k} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-primary/10 text-primary">
                  <Tag className="w-2.5 h-2.5" />{k}
                </span>
              ))}
            </div>
          </div>

          {/* Preview placeholder */}
          <div className="rounded-xl border border-border bg-[#FBFBFA] p-12 flex flex-col items-center justify-center min-h-[400px] shadow-inner">
            <FileText className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <p className="text-sm font-medium text-muted-foreground">文件預覽區域</p>
            <p className="text-xs text-muted-foreground/60 mt-1">支援 PDF / Word 檔案預覽</p>
          </div>

          {/* Activity Log */}
          <div className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h2 className="text-sm font-heading font-semibold mb-3">活動紀錄</h2>
            <div className="space-y-1">
              {[
                { text: `${doc.author} 建立草稿`, time: '2024-01-05' },
                { text: `${doc.reviewer} 完成審閱`, time: '2024-01-08' },
                { text: `${doc.approver} 核准文件`, time: '2024-01-10' },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-4 p-2.5 rounded-md hover:bg-secondary/70 transition-colors text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="flex-1">{a.text}</span>
                  <span className="text-muted-foreground">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sidebar Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
          <div className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] space-y-5">
            <h2 className="text-sm font-heading font-semibold">文件資訊</h2>
            {[
              { icon: User, label: '制定者', value: doc.author },
              { icon: CheckCircle2, label: '審閱者', value: doc.reviewer },
              { icon: CheckCircle2, label: '核准者', value: doc.approver },
              { icon: Building2, label: '部門', value: doc.department.name },
              { icon: Calendar, label: '有效日期', value: doc.effectiveDate || '尚未設定' },
              { icon: Calendar, label: '到期日', value: doc.expiryDate || '無' },
              { icon: Eye, label: '閱讀次數', value: doc.readCount.toString() },
              { icon: Paperclip, label: '附件數', value: doc.attachments.toString() },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-muted-foreground/70" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">{label}</p>
                  <p className="text-xs font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Related Docs */}
          <div className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h2 className="text-sm font-heading font-semibold mb-4 text-primary">關聯文件</h2>
            {mockDocuments.filter(d => d.id !== doc.id).slice(0, 3).map(d => (
              <Link key={d.id} to={`/document/${d.id}`}
                className="block p-2.5 rounded-md hover:bg-secondary/80 transition-all mb-1 border border-transparent hover:border-border">
                <p className="text-[10px] font-mono text-muted-foreground">{d.docNumber}</p>
                <p className="text-xs font-medium truncate">{d.title}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
