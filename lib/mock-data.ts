import type {
  Contact, Deal, Task, Conversation, Activity, Tenant,
  PlanConfig, Invoice, DashboardStats
} from "@/types";

export const mockContacts: Contact[] = [
  { id: "c1", name: "Ahmad Fauzi", email: "ahmad@ptmaju.com", phone: "+62811234567", company: "PT Maju Jaya", type: "client", industry: "Manufacturing", tags: ["VIP", "Enterprise"], assignedTo: "user_1", tenantId: "tenant_1", lastActivity: new Date(Date.now() - 7200000).toISOString(), createdAt: "2024-06-15", notes: "Key account. Prefers WhatsApp." },
  { id: "c2", name: "Budi Santoso", email: "budi@sinarterang.co.id", phone: "+62822345678", company: "Sinar Terang", type: "lead", industry: "Retail", tags: ["Hot Lead"], assignedTo: "user_1", tenantId: "tenant_1", lastActivity: new Date(Date.now() - 3600000).toISOString(), createdAt: "2024-07-20" },
  { id: "c3", name: "Citra Dewi", email: "citra@innovatech.id", phone: "+62833456789", company: "InnovaTech", type: "prospect", industry: "Technology", tags: ["Tech", "SME"], assignedTo: "user_2", tenantId: "tenant_1", lastActivity: new Date(Date.now() - 86400000).toISOString(), createdAt: "2024-08-01" },
  { id: "c4", name: "Dani Kusuma", email: "dani@globalindo.com", phone: "+62844567890", company: "Global Indo", type: "lead", industry: "Logistics", tags: [], assignedTo: "user_1", tenantId: "tenant_1", lastActivity: new Date(Date.now() - 172800000).toISOString(), createdAt: "2024-09-05" },
  { id: "c5", name: "Eka Putri", email: "eka@mediabaru.id", phone: "+62855678901", company: "Media Baru", type: "client", industry: "Media", tags: ["Premium"], assignedTo: "user_3", tenantId: "tenant_1", lastActivity: new Date(Date.now() - 43200000).toISOString(), createdAt: "2024-05-10" },
  { id: "c6", name: "Fahmi Rahman", email: "fahmi@konsultan.co.id", phone: "+62866789012", company: "Konsultan Prima", type: "prospect", industry: "Consulting", tags: ["Follow-up"], assignedTo: "user_2", tenantId: "tenant_1", lastActivity: new Date(Date.now() - 259200000).toISOString(), createdAt: "2024-10-01" },
];

export const mockDeals: Deal[] = [
  { id: "d1", title: "ERP Integration - PT Maju Jaya", contactId: "c1", contactName: "Ahmad Fauzi", value: 150000000, stage: "proposal", probability: 70, expectedClose: "2025-03-31", assignedTo: "user_1", tenantId: "tenant_1", createdAt: "2024-12-01", updatedAt: new Date().toISOString(), notes: "Full ERP integration project", activities: [] },
  { id: "d2", title: "Retail POS System - Sinar Terang", contactId: "c2", contactName: "Budi Santoso", value: 50000000, stage: "negotiation", probability: 85, expectedClose: "2025-02-28", assignedTo: "user_1", tenantId: "tenant_1", createdAt: "2024-12-15", updatedAt: new Date().toISOString(), activities: [] },
  { id: "d3", title: "Cloud Migration - InnovaTech", contactId: "c3", contactName: "Citra Dewi", value: 75000000, stage: "qualified", probability: 40, expectedClose: "2025-04-30", assignedTo: "user_2", tenantId: "tenant_1", createdAt: "2025-01-05", updatedAt: new Date().toISOString(), activities: [] },
  { id: "d4", title: "Logistics App - Global Indo", contactId: "c4", contactName: "Dani Kusuma", value: 200000000, stage: "lead", probability: 20, expectedClose: "2025-06-30", assignedTo: "user_1", tenantId: "tenant_1", createdAt: "2025-01-20", updatedAt: new Date().toISOString(), activities: [] },
  { id: "d5", title: "Content Platform - Media Baru", contactId: "c5", contactName: "Eka Putri", value: 30000000, stage: "closed_won", probability: 100, expectedClose: "2025-01-15", assignedTo: "user_3", tenantId: "tenant_1", createdAt: "2024-11-01", updatedAt: new Date().toISOString(), activities: [] },
  { id: "d6", title: "Consulting Suite - Konsultan Prima", contactId: "c6", contactName: "Fahmi Rahman", value: 45000000, stage: "closed_lost", probability: 0, expectedClose: "2025-01-31", assignedTo: "user_2", tenantId: "tenant_1", createdAt: "2024-12-10", updatedAt: new Date().toISOString(), activities: [] },
];

export const mockTasks: Task[] = [
  { id: "t1", title: "Follow up with Ahmad Fauzi re: ERP proposal", status: "todo", priority: "high", dueDate: new Date(Date.now() + 86400000).toISOString(), assignedTo: "user_1", relatedTo: { type: "deal", id: "d1", name: "ERP Integration" }, tags: ["sales"], tenantId: "tenant_1", createdAt: new Date().toISOString() },
  { id: "t2", title: "Demo preparation for InnovaTech", status: "in_progress", priority: "urgent", dueDate: new Date(Date.now() + 43200000).toISOString(), assignedTo: "user_2", relatedTo: { type: "deal", id: "d3", name: "Cloud Migration" }, tags: ["demo", "prep"], tenantId: "tenant_1", createdAt: new Date().toISOString() },
  { id: "t3", title: "Send contract to Sinar Terang", status: "done", priority: "high", dueDate: new Date(Date.now() - 86400000).toISOString(), assignedTo: "user_1", relatedTo: { type: "deal", id: "d2", name: "Retail POS System" }, tags: ["legal"], tenantId: "tenant_1", createdAt: new Date().toISOString(), completedAt: new Date().toISOString() },
  { id: "t4", title: "Update client database Q1 2025", status: "todo", priority: "medium", dueDate: new Date(Date.now() + 604800000).toISOString(), assignedTo: "user_1", tags: ["admin"], tenantId: "tenant_1", createdAt: new Date().toISOString() },
  { id: "t5", title: "Prepare monthly performance report", status: "todo", priority: "low", dueDate: new Date(Date.now() + 1209600000).toISOString(), assignedTo: "user_1", tags: ["report"], tenantId: "tenant_1", createdAt: new Date().toISOString() },
];

export const mockConversations: Conversation[] = [
  { id: "cv1", contactId: "c1", contactName: "Ahmad Fauzi", channel: "whatsapp", lastMessage: "Terima kasih, proposal sudah kami terima.", lastMessageAt: new Date(Date.now() - 1800000).toISOString(), unreadCount: 2, status: "open", assignedTo: "user_1", tenantId: "tenant_1", messages: [{ id: "m1", conversationId: "cv1", content: "Halo, ada yang bisa saya bantu?", sender: "agent", timestamp: new Date(Date.now() - 3600000).toISOString(), type: "text", isRead: true }, { id: "m2", conversationId: "cv1", content: "Terima kasih, proposal sudah kami terima.", sender: "contact", timestamp: new Date(Date.now() - 1800000).toISOString(), type: "text", isRead: false }] },
  { id: "cv2", contactId: "c2", contactName: "Budi Santoso", channel: "email", lastMessage: "Kapan bisa meeting minggu ini?", lastMessageAt: new Date(Date.now() - 7200000).toISOString(), unreadCount: 1, status: "open", assignedTo: "user_1", tenantId: "tenant_1", messages: [] },
  { id: "cv3", contactId: "c3", contactName: "Citra Dewi", channel: "livechat", lastMessage: "Demo-nya sangat membantu!", lastMessageAt: new Date(Date.now() - 10800000).toISOString(), unreadCount: 0, status: "resolved", assignedTo: "user_2", tenantId: "tenant_1", messages: [] },
  { id: "cv4", contactId: "c5", contactName: "Eka Putri", channel: "instagram", lastMessage: "Harga paket enterprise berapa ya?", lastMessageAt: new Date(Date.now() - 14400000).toISOString(), unreadCount: 3, status: "open", assignedTo: "user_3", tenantId: "tenant_1", messages: [] },
];

export const mockActivities: Activity[] = [
  { id: "a1", type: "deal", title: "Deal closed: Content Platform", description: "Media Baru deal worth Rp 30.000.000 closed", userId: "user_3", userName: "Rachel", relatedId: "d5", relatedType: "deal", tenantId: "tenant_1", createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: "a2", type: "contact", title: "New contact: Fahmi Rahman", description: "Added from web form", userId: "user_1", userName: "John Santoso", relatedId: "c6", relatedType: "contact", tenantId: "tenant_1", createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: "a3", type: "call", title: "Call with Ahmad Fauzi", description: "30-min call about ERP requirements", userId: "user_1", userName: "John Santoso", relatedId: "c1", relatedType: "contact", tenantId: "tenant_1", createdAt: new Date(Date.now() - 10800000).toISOString() },
  { id: "a4", type: "email", title: "Proposal sent to Sinar Terang", description: "POS System proposal PDF attached", userId: "user_1", userName: "John Santoso", relatedId: "d2", relatedType: "deal", tenantId: "tenant_1", createdAt: new Date(Date.now() - 18000000).toISOString() },
  { id: "a5", type: "meeting", title: "Meeting: InnovaTech discovery call", description: "Explored cloud infra needs", userId: "user_2", userName: "Sarah", relatedId: "c3", relatedType: "contact", tenantId: "tenant_1", createdAt: new Date(Date.now() - 86400000).toISOString() },
];

export const mockTenants: Tenant[] = [
  { id: "tenant_1", name: "Acme Corp", domain: "acme.amorecrm.com", plan: "pro", status: "active", agentCount: 12, contactCount: 1540, createdAt: "2024-01-15", expiresAt: "2025-01-15", owner: "John Santoso", phone: "+62811000001", address: "Jakarta, Indonesia" },
  { id: "tenant_2", name: "Bright Solutions", domain: "bright.amorecrm.com", plan: "enterprise", status: "active", agentCount: 45, contactCount: 8200, createdAt: "2023-09-01", expiresAt: "2025-09-01", owner: "Maria Chen", phone: "+62811000002", address: "Surabaya, Indonesia" },
  { id: "tenant_3", name: "Startup XYZ", domain: "startupxyz.amorecrm.com", plan: "basic", status: "trial", agentCount: 3, contactCount: 120, createdAt: "2025-01-20", expiresAt: "2025-02-20", owner: "Dani Prasetyo", phone: "+62811000003", address: "Bandung, Indonesia" },
  { id: "tenant_4", name: "Global Trade", domain: "globaltrade.amorecrm.com", plan: "pro", status: "suspended", agentCount: 8, contactCount: 650, createdAt: "2024-03-10", expiresAt: "2025-03-10", owner: "Kevin Wijaya", phone: "+62811000004", address: "Medan, Indonesia" },
  { id: "tenant_5", name: "Tech Horizon", domain: "techhorizon.amorecrm.com", plan: "enterprise", status: "active", agentCount: 28, contactCount: 4100, createdAt: "2024-06-01", expiresAt: "2025-06-01", owner: "Lina Susanti", phone: "+62811000005", address: "Bali, Indonesia" },
];

export const planConfigs: PlanConfig[] = [
  {
    id: "basic",
    name: "Basic",
    price: { monthly: 299000, annual: 2990000 },
    features: ["Up to 3 agents", "1,000 contacts", "1 channel", "Basic reports", "Email support"],
    maxAgents: 3,
    maxContacts: 1000,
    maxChannels: 1,
    aiEnabled: false,
    whitelabelEnabled: false,
    apiEnabled: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: 799000, annual: 7990000 },
    features: ["Up to 15 agents", "10,000 contacts", "3 channels", "Advanced reports", "AI Assistant", "Priority support", "Workflow automation"],
    maxAgents: 15,
    maxContacts: 10000,
    maxChannels: 3,
    aiEnabled: true,
    whitelabelEnabled: false,
    apiEnabled: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { monthly: 1999000, annual: 19990000 },
    features: ["Unlimited agents", "Unlimited contacts", "All channels", "Full analytics", "Advanced AI + RAG", "White-labeling", "Dedicated support", "Custom integrations", "SLA guarantee"],
    maxAgents: 999,
    maxContacts: 999999,
    maxChannels: 999,
    aiEnabled: true,
    whitelabelEnabled: true,
    apiEnabled: true,
  },
];

export const mockDashboardStats: DashboardStats = {
  totalContacts: 1540,
  totalDeals: 28,
  totalRevenue: 550000000,
  openTickets: 14,
  resolvedToday: 8,
  conversionRate: 32.4,
  avgResponseTime: "4m 32s",
  activeAgents: 9,
};

export const mockInvoices: Invoice[] = [
  { id: "inv_001", tenantId: "tenant_1", subscriptionId: "sub_1", amount: 799000, status: "paid", dueDate: "2025-01-15", paidAt: "2025-01-14", paymentMethod: "Virtual Account BCA", items: [{ description: "Pro Plan - Monthly", quantity: 1, unitPrice: 799000, total: 799000 }], createdAt: "2025-01-01" },
  { id: "inv_002", tenantId: "tenant_1", subscriptionId: "sub_1", amount: 799000, status: "pending", dueDate: "2025-02-15", items: [{ description: "Pro Plan - Monthly", quantity: 1, unitPrice: 799000, total: 799000 }], createdAt: "2025-02-01" },
];

export const revenueChartData = [
  { month: "Aug", revenue: 420000000, deals: 18 },
  { month: "Sep", revenue: 380000000, deals: 15 },
  { month: "Oct", revenue: 510000000, deals: 22 },
  { month: "Nov", revenue: 490000000, deals: 20 },
  { month: "Dec", revenue: 630000000, deals: 27 },
  { month: "Jan", revenue: 550000000, deals: 24 },
];

export const channelBreakdown = [
  { name: "WhatsApp", value: 45, color: "#25D366" },
  { name: "Email", value: 25, color: "#4285F4" },
  { name: "Live Chat", value: 18, color: "#38BDF8" },
  { name: "Instagram", value: 12, color: "#E1306C" },
];
