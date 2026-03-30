import { motion } from 'framer-motion';
import { BarChart3, Eye, TrendingUp, Users, Building2, FileText } from 'lucide-react';
import { mockDocuments, departments } from '@/data/mockData';

const monthlyReads = [
  { month: '1月', reads: 420 }, { month: '2月', reads: 380 }, { month: '3月', reads: 510 },
  { month: '4月', reads: 460 }, { month: '5月', reads: 590 }, { month: '6月', reads: 680 },
];

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Analytics() {
  const totalReads = mockDocuments.reduce((s, d) => s + d.readCount, 0);
  const maxReads = Math.max(...monthlyReads.map(m => m.reads));

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">閱讀統計</h1>
        <p className="text-sm text-muted-foreground mt-1">Reading Analytics · AI 洞察與部門分析</p>
      </div>

      {/* KPI */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '總閱讀次數', value: totalReads.toLocaleString(), icon: Eye, color: 'text-primary' },
          { label: '本月閱讀', value: '680', icon: TrendingUp, color: 'text-success' },
          { label: '活躍讀者', value: '42', icon: Users, color: 'text-warning' },
          { label: '平均閱讀率', value: '87%', icon: BarChart3, color: 'text-primary' },
        ].map(k => (
          <motion.div key={k.label} variants={item} initial="hidden" animate="show" className="bg-white border border-border rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className={`w-9 h-9 rounded-md bg-secondary flex items-center justify-center ${k.color} mb-4`}>
              <k.icon className="w-5 h-5" />
            </div>
            <p className="font-heading text-2xl font-bold">{k.value}</p>
            <p className="text-xs text-muted-foreground">{k.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chart */}
        <motion.div variants={item} initial="hidden" animate="show" className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <h2 className="font-heading font-semibold mb-4">月度閱讀趨勢</h2>
          <div className="flex items-end gap-3 h-48">
            {monthlyReads.map(m => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium">{m.reads}</span>
                <div
                  className="w-full rounded-t-lg bg-primary/80 transition-all"
                  style={{ height: `${(m.reads / maxReads) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Department breakdown */}
        <motion.div variants={item} initial="hidden" animate="show" className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-semibold">部門閱讀分析</h2>
          </div>
          <div className="space-y-3">
            {departments.map(dept => {
              const deptDocs = mockDocuments.filter(d => d.department.id === dept.id);
              const reads = deptDocs.reduce((s, d) => s + d.readCount, 0);
              const pct = totalReads > 0 ? Math.round((reads / totalReads) * 100) : 0;
              return (
                <div key={dept.id}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium">{dept.name}</span>
                    <span className="text-muted-foreground">{reads} 次 ({pct}%)</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-primary" />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Top documents */}
      <motion.div variants={item} initial="hidden" animate="show" className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <h2 className="font-heading font-semibold mb-4">熱門文件 Top 5</h2>
        <div className="space-y-2">
          {[...mockDocuments].sort((a, b) => b.readCount - a.readCount).slice(0, 5).map((d, i) => (
            <div key={d.id} className="flex items-center gap-4 p-3 rounded-md hover:bg-secondary/70 transition-colors border border-transparent hover:border-border/30">
              <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground">{i + 1}</span>
              <FileText className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{d.title}</p>
                <p className="text-[10px] text-muted-foreground">{d.docNumber} · {d.department.name}</p>
              </div>
              <span className="text-sm font-heading font-bold">{d.readCount}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
