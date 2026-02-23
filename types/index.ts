export type UserRole = "superadmin" | "admin" | "agent" | "viewer";
export type Theme = "light" | "dark";
export type PipelineStage = "lead" | "qualified" | "proposal" | "negotiation" | "closed_won" | "closed_lost";
export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type ContactType = "lead" | "client" | "prospect";
export type SubscriptionPlan = "basic" | "pro" | "enterprise";
export type InvoiceStatus = "pending" | "paid" | "overdue" | "cancelled";
export type Channel = "whatsapp" | "email" | "instagram" | "livechat" | "sms";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  tenantId: string;
  isOnline?: boolean;
  createdAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  plan: SubscriptionPlan;
  status: "active" | "suspended" | "trial";
  agentCount: number;
  contactCount: number;
  createdAt: string;
  expiresAt: string;
  owner: string;
  phone?: string;
  address?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  type: ContactType;
  industry?: string;
  tags: string[];
  avatar?: string;
  assignedTo?: string;
  tenantId: string;
  lastActivity?: string;
  createdAt: string;
  notes?: string;
  website?: string;
  address?: string;
}

export interface Deal {
  id: string;
  title: string;
  contactId: string;
  contactName: string;
  value: number;
  stage: PipelineStage;
  probability: number;
  expectedClose: string;
  assignedTo: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  activities: Activity[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  assignedTo?: string;
  relatedTo?: { type: "contact" | "deal"; id: string; name: string };
  tags: string[];
  tenantId: string;
  createdAt: string;
  completedAt?: string;
}

export interface Conversation {
  id: string;
  contactId: string;
  contactName: string;
  contactAvatar?: string;
  channel: Channel;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  status: "open" | "resolved" | "assigned";
  assignedTo?: string;
  tenantId: string;
  messages: Message[];
}

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  sender: "contact" | "agent" | "bot";
  senderName?: string;
  timestamp: string;
  type: "text" | "image" | "file" | "audio";
  fileUrl?: string;
  isRead: boolean;
}

export interface Activity {
  id: string;
  type: "call" | "email" | "meeting" | "note" | "task" | "deal" | "contact";
  title: string;
  description?: string;
  userId: string;
  userName: string;
  relatedId?: string;
  relatedType?: string;
  tenantId: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  tenantId: string;
  plan: SubscriptionPlan;
  status: "active" | "expired" | "cancelled" | "trial";
  billingCycle: "monthly" | "annual";
  price: number;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

export interface Invoice {
  id: string;
  tenantId: string;
  subscriptionId: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  paidAt?: string;
  paymentMethod?: string;
  items: InvoiceItem[];
  createdAt: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PlanConfig {
  id: SubscriptionPlan;
  name: string;
  price: { monthly: number; annual: number };
  features: string[];
  maxAgents: number;
  maxContacts: number;
  maxChannels: number;
  aiEnabled: boolean;
  whitelabelEnabled: boolean;
  apiEnabled: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface DashboardStats {
  totalContacts: number;
  totalDeals: number;
  totalRevenue: number;
  openTickets: number;
  resolvedToday: number;
  conversionRate: number;
  avgResponseTime: string;
  activeAgents: number;
}
