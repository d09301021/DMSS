import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles, FileText } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  sources?: string[];
}

export default function RAGPanel() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1', role: 'ai',
      content: '您好！我是 DocGuard AI 助手，可以幫您查詢文件內容、摘要與相關規範。請輸入您的問題。',
    },
  ]);

  const handleSend = () => {
    if (!query.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: query };
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(), role: 'ai',
      content: `根據相關文件分析，關於「${query}」的回答如下：\n\n本系統已建立之 SOP 中規範了相關流程，建議參閱以下文件以獲得完整資訊。`,
      sources: ['SOP-LAB-001 血液檢體採集標準作業程序', 'QA-POL-001 品質政策與目標'],
    };
    setMessages(prev => [...prev, userMsg, aiMsg]);
    setQuery('');
  };

  return (
    <>
      {/* Floating trigger */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center neu-flat z-50 shadow-lg"
          >
            <Bot className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-6 right-6 w-96 h-[520px] rounded-2xl bg-background/95 backdrop-blur-xl neu-flat z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-heading font-semibold">RAG 智慧問答</p>
                  <p className="text-[10px] text-muted-foreground">基於文件向量檢索</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-secondary">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
                    ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-md' : 'neu-concave rounded-bl-md'}`}>
                    <p className="whitespace-pre-line">{msg.content}</p>
                    {msg.sources && (
                      <div className="mt-2 pt-2 border-t border-border/50 space-y-1">
                        <p className="text-[10px] font-semibold opacity-70">📎 參考文件：</p>
                        {msg.sources.map((s, i) => (
                          <div key={i} className="flex items-center gap-1 text-[11px] opacity-80">
                            <FileText className="w-3 h-3" />
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex gap-2">
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="輸入文件相關問題..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-background neu-pressed text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center neu-btn"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
