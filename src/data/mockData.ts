export type DocStatus = 'draft' | 'in-review' | 'approved' | 'published' | 'obsolete';
export type UserRole = 'staff' | 'author' | 'reviewer' | 'approver' | 'admin';

export interface Department {
  id: string;
  name: string;
  nameEn: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: Department;
  avatar?: string;
}

export interface DocItem {
  id: string;
  docNumber: string;
  title: string;
  status: DocStatus;
  version: string;
  category: string;
  department: Department;
  author: string;
  reviewer: string;
  approver: string;
  effectiveDate: string;
  expiryDate?: string;
  summary: string;
  keywords: string[];
  isFavorite: boolean;
  readCount: number;
  lastModified: string;
  attachments: number;
}

export interface Activity {
  id: string;
  action: string;
  user: string;
  document: string;
  time: string;
  type: 'create' | 'review' | 'approve' | 'publish' | 'read' | 'comment';
}

export const departments: Department[] = [
  { id: 'lab', name: '檢驗科', nameEn: 'Laboratory' },
  { id: 'qa', name: '品質管理部', nameEn: 'Quality Assurance' },
  { id: 'admin-dept', name: '行政部', nameEn: 'Administration' },
  { id: 'clinical', name: '臨床部', nameEn: 'Clinical' },
  { id: 'it', name: '資訊部', nameEn: 'IT' },
];

export const currentUser: User = {
  id: 'u1',
  name: '王小明',
  email: 'wang@hospital.org',
  role: 'admin',
  department: departments[1],
};

export const mockDocuments: DocItem[] = [
  {
    id: 'd1', docNumber: 'SOP-LAB-001', title: '血液檢體採集標準作業程序',
    status: 'published', version: '3.2', category: 'SOP',
    department: departments[0], author: '李醫師', reviewer: '陳主任', approver: '張院長',
    effectiveDate: '2024-01-15', expiryDate: '2025-01-15',
    summary: '本文件規範血液檢體採集之標準流程，包含病患確認、採集步驟、檢體保存及運送規範。',
    keywords: ['血液', '檢體', '採集', 'SOP'], isFavorite: true, readCount: 245, lastModified: '2024-01-10', attachments: 3,
  },
  {
    id: 'd2', docNumber: 'SOP-LAB-002', title: '尿液分析標準作業程序',
    status: 'published', version: '2.1', category: 'SOP',
    department: departments[0], author: '林技師', reviewer: '陳主任', approver: '張院長',
    effectiveDate: '2024-03-01',
    summary: '規範尿液分析之標準流程，涵蓋試紙法、沉渣鏡檢及自動化分析。',
    keywords: ['尿液', '分析', '鏡檢'], isFavorite: false, readCount: 189, lastModified: '2024-02-28', attachments: 2,
  },
  {
    id: 'd3', docNumber: 'QA-POL-001', title: '品質政策與目標',
    status: 'published', version: '5.0', category: '政策',
    department: departments[1], author: '品管組', reviewer: '品管主任', approver: '院長',
    effectiveDate: '2024-01-01', expiryDate: '2025-12-31',
    summary: '定義醫院品質政策及年度品質目標，涵蓋 ISO 15189 與 ISO 9001 要求。',
    keywords: ['品質', '政策', 'ISO'], isFavorite: true, readCount: 412, lastModified: '2024-01-01', attachments: 1,
  },
  {
    id: 'd4', docNumber: 'SOP-QA-003', title: '內部稽核管理程序',
    status: 'in-review', version: '2.3', category: 'SOP',
    department: departments[1], author: '品管組', reviewer: '陳主任', approver: '張院長',
    effectiveDate: '2024-06-01',
    summary: '規範內部稽核之規劃、執行、報告與追蹤改善流程。',
    keywords: ['稽核', '內部', '品管'], isFavorite: false, readCount: 98, lastModified: '2024-05-20', attachments: 4,
  },
  {
    id: 'd5', docNumber: 'ADM-REG-001', title: '文件管制管理辦法',
    status: 'approved', version: '4.0', category: '管理辦法',
    department: departments[2], author: '行政組', reviewer: '行政主任', approver: '院長',
    effectiveDate: '2024-04-01',
    summary: '規範全院文件之制定、審閱、核准、發行、修訂及廢止流程。',
    keywords: ['文件', '管制', '管理'], isFavorite: false, readCount: 321, lastModified: '2024-03-28', attachments: 2,
  },
  {
    id: 'd6', docNumber: 'SOP-CLI-005', title: '病患安全通報程序',
    status: 'draft', version: '1.0', category: 'SOP',
    department: departments[3], author: '護理部', reviewer: '護理長', approver: '醫務主任',
    effectiveDate: '',
    summary: '草案階段 — 規範病患安全事件之通報、分級與改善追蹤流程。',
    keywords: ['病安', '通報', '安全'], isFavorite: false, readCount: 12, lastModified: '2024-06-01', attachments: 0,
  },
  {
    id: 'd7', docNumber: 'IT-SEC-002', title: '資訊安全管理規範',
    status: 'published', version: '2.0', category: '管理辦法',
    department: departments[4], author: 'IT組', reviewer: 'IT主管', approver: '院長',
    effectiveDate: '2024-02-01',
    summary: '規範資訊系統存取權限、密碼策略、資料備份與災難復原程序。',
    keywords: ['資安', '密碼', '備份'], isFavorite: true, readCount: 167, lastModified: '2024-01-30', attachments: 5,
  },
  {
    id: 'd8', docNumber: 'SOP-LAB-010', title: '實驗室安全衛生管理',
    status: 'obsolete', version: '1.5', category: 'SOP',
    department: departments[0], author: '安全官', reviewer: '陳主任', approver: '院長',
    effectiveDate: '2022-01-01', expiryDate: '2023-12-31',
    summary: '已廢止 — 原實驗室安全衛生規範，已由新版取代。',
    keywords: ['安全', '衛生', '廢止'], isFavorite: false, readCount: 534, lastModified: '2023-12-31', attachments: 1,
  },
];

export const recentActivities: Activity[] = [
  { id: 'a1', action: '發行文件', user: '張院長', document: 'SOP-LAB-001 v3.2', time: '2 小時前', type: 'publish' },
  { id: 'a2', action: '提交審閱', user: '品管組', document: 'SOP-QA-003 v2.3', time: '4 小時前', type: 'review' },
  { id: 'a3', action: '核准文件', user: '院長', document: 'ADM-REG-001 v4.0', time: '昨天', type: 'approve' },
  { id: 'a4', action: '建立草稿', user: '護理部', document: 'SOP-CLI-005 v1.0', time: '昨天', type: 'create' },
  { id: 'a5', action: '閱讀文件', user: '王小明', document: 'QA-POL-001 v5.0', time: '2 天前', type: 'read' },
  { id: 'a6', action: '新增留言', user: '陳主任', document: 'SOP-QA-003 v2.3', time: '3 天前', type: 'comment' },
];

export const statusColors: Record<DocStatus, string> = {
  draft: 'status-draft',
  'in-review': 'status-in-review',
  approved: 'status-approved',
  published: 'status-published',
  obsolete: 'status-obsolete',
};

export const statusLabels: Record<DocStatus, string> = {
  draft: '草稿',
  'in-review': '審閱中',
  approved: '已核准',
  published: '已發行',
  obsolete: '已廢止',
};

export const roleLabels: Record<UserRole, string> = {
  staff: '一般人員',
  author: '文件作者',
  reviewer: '審閱者',
  approver: '核准者',
  admin: '系統管理員',
};
