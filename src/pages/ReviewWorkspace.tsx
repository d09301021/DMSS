import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, MessageSquare, Sparkles, FileText } from 'lucide-react';
import { mockDocuments } from '@/data/mockData';
import StatusBadge from '@/components/shared/StatusBadge';

export default function ReviewWorkspace() {
  const reviewDocs = mockDocuments.filter(d => d.status === 'in-review');
  const [comment, setComment] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(reviewDocs[0]?.id ?? '');
  const doc = mockDocuments.find(d => d.id === selectedDoc);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">審閱工作區</h1>
        <p className="text-sm text-muted-foreground mt-1">Review Workspace · {reviewDocs.length} 份待審閱</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="space-y-3">
          <h2 className="text-sm font-heading font-semibold">待審閱文件</h2>
          {reviewDocs.length === 0 && (
            <div className="rounded-xl border border-border bg-secondary/30 p-10 text-center">
              <CheckCircle2 className="w-8 h-8 mx-auto text-success mb-3 opacity-50" />
              <p className="text-sm font-medium text-muted-foreground">目前沒有待審閱文件</p>
            </div>
          )}
          {reviewDocs.map(d => (
            <button key={d.id} onClick={() => setSelectedDoc(d.id)}
              className={`w-full text-left p-4 rounded-md border transition-all ${selectedDoc === d.id ? 'border-primary bg-primary/5 shadow-sm ring-4 ring-primary/5' : 'border-border bg-white hover:bg-secondary/50'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-muted-foreground">{d.docNumber}</span>
                <StatusBadge status={d.status} />
              </div>
              <p className="text-sm font-medium">{d.title}</p>
              <p className="text-xs text-muted-foreground mt-1">v{d.version} · {d.author}</p>
            </button>
          ))}
        </div>

        {/* Detail */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-2 space-y-6">
          {doc ? (
            <>
              <div className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <h2 className="font-heading font-semibold mb-2">{doc.title}</h2>
                <p className="text-sm text-muted-foreground">{doc.summary}</p>
              </div>

              {/* Preview */}
              <div className="rounded-xl border border-border bg-[#FBFBFA] p-12 flex flex-col items-center justify-center min-h-[250px] shadow-inner">
                <FileText className="w-10 h-10 text-muted-foreground/30 mb-3" />
                <p className="text-sm font-medium text-muted-foreground">文件預覽區域</p>
              </div>

              {/* AI Assist */}
              <div className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-heading font-semibold">RAG 輔助理解</h3>
                </div>
                <p className="text-xs text-muted-foreground">AI 分析此文件與現行版本之差異，並提供修訂重點摘要。</p>
              </div>

              {/* Comment */}
              <div className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-heading font-semibold">審閱留言</h3>
                </div>
                <textarea value={comment} onChange={e => setComment(e.target.value)}
                  placeholder="輸入審閱意見或修改建議..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-md bg-white border border-border text-sm outline-none resize-none placeholder:text-muted-foreground/50 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all" />
                <div className="flex gap-4 mt-4">
                  <button className="flex-1 py-2 rounded-md bg-success text-success-foreground text-sm font-medium flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-all active:scale-[0.98]">
                    <CheckCircle2 className="w-4 h-4" /> 同意
                  </button>
                  <button className="flex-1 py-2 rounded-md bg-destructive text-destructive-foreground text-sm font-medium flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-all active:scale-[0.98]">
                    <XCircle className="w-4 h-4" /> 退回
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-border bg-secondary/30 p-16 text-center">
              <p className="text-sm font-medium text-muted-foreground">請從左側選擇一份文件進行審閱</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
