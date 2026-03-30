import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle2, AlertTriangle, Eye, TrendingUp, Activity } from 'lucide-react';
import { mockDocuments, recentActivities, currentUser, statusLabels } from '@/data/mockData';
import StatusBadge from '@/components/shared/StatusBadge';

const kpiData = [
  { label: '文件總數', value: '156', icon: FileText, color: 'text-primary' },
  { label: '待審閱', value: '8', icon: Clock, color: 'text-warning' },
  { label: '已發行', value: '124', icon: CheckCircle2, color: 'text-success' },
  { label: '即將到期', value: '5', icon: AlertTriangle, color: 'text-destructive' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Dashboard() {
  const published = mockDocuments.filter(d => d.status === 'published');

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold">歡迎回來，{currentUser.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">{currentUser.department.name} · {new Date().toLocaleDateString('zh-TW')}</p>
      </div>

      {/* KPI Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map(k => (
          <motion.div key={k.label} variants={item} className="bg-white border border-border rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-md flex items-center justify-center bg-secondary ${k.color}`}>
                <k.icon className="w-5 h-5" />
              </div>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <p className="font-heading text-2xl font-bold">{k.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{k.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Timeline */}
        <motion.div variants={item} initial="hidden" animate="show" className="lg:col-span-2 bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-semibold">最近活動</h2>
          </div>
          <div className="space-y-1">
            {recentActivities.map((a, i) => (
              <div key={a.id} className="flex items-start gap-4 p-3 rounded-md hover:bg-secondary/80 transition-colors">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium">{a.user}</span>
                    <span className="text-muted-foreground"> {a.action} </span>
                    <span className="font-medium">{a.document}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recently Published */}
        <motion.div variants={item} initial="hidden" animate="show" className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-semibold">最新發行</h2>
          </div>
          <div className="space-y-2">
            {published.slice(0, 4).map(doc => (
              <div key={doc.id} className="p-3 rounded-md bg-secondary/50 border border-border/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-muted-foreground">{doc.docNumber}</span>
                  <StatusBadge status={doc.status} />
                </div>
                <p className="text-sm font-medium truncate">{doc.title}</p>
                <p className="text-xs text-muted-foreground mt-1">v{doc.version} · {doc.department.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Document Status Overview */}
      <motion.div variants={item} initial="hidden" animate="show" className="bg-white border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        <h2 className="font-heading font-semibold mb-4">文件狀態分佈</h2>
        <div className="flex gap-4 flex-wrap">
          {(['draft', 'in-review', 'approved', 'published', 'obsolete'] as const).map(status => {
            const count = mockDocuments.filter(d => d.status === status).length;
            return (
              <div key={status} className="flex items-center gap-3 px-4 py-2 rounded-md bg-secondary/50 border border-border/50">
                <StatusBadge status={status} />
                <span className="font-heading font-bold text-lg">{count}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
