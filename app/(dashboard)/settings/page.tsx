"use client";
import { useState } from "react";
import {
  Users, Shield, Globe, Palette, Bell,
  Key, Building, ChevronRight, Save, Plus, Trash2, Edit,
  Eye, EyeOff, Check
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

const menuItems = [
  { id: "profile", label: "Company Profile", icon: Building },
  { id: "team", label: "Team Members", icon: Users },
  { id: "roles", label: "Roles & Permissions", icon: Shield },
  { id: "channels", label: "Channels & API", icon: Key },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "localization", label: "Language & Timezone", icon: Globe },
];

const teamMembers = [
  { id: "u1", name: "John Santoso", email: "john@acmecorp.com", role: "admin", status: "active" },
  { id: "u2", name: "Sarah", email: "sarah@acmecorp.com", role: "agent", status: "active" },
  { id: "u3", name: "Rachel", email: "rachel@acmecorp.com", role: "agent", status: "active" },
  { id: "u4", name: "David", email: "david@acmecorp.com", role: "viewer", status: "inactive" },
];

const roles = [
  { id: "admin", name: "Admin", description: "Full access to all modules", color: "bg-red-100 text-red-700", permissions: ["All modules", "Billing", "Team management"] },
  { id: "agent", name: "Agent", description: "Access to contacts, deals, inbox, tasks", color: "bg-blue-100 text-blue-700", permissions: ["Contacts", "Deals", "Inbox", "Tasks"] },
  { id: "viewer", name: "Viewer", description: "Read-only access", color: "bg-gray-100 text-gray-700", permissions: ["View contacts", "View reports"] },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [showAddMember, setShowAddMember] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#1e3a8a");
  const [accentColor, setAccentColor] = useState("#38bdf8");

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-(--text-primary) tracking-tight">Settings</h1>
        <p className="text-sm text-(--text-muted) mt-0.5">Manage your workspace preferences and configurations</p>
      </div>

      <div className="flex gap-5">
        {/* Sidebar menu */}
        <div className="w-52 shrink-0">
          <nav className="space-y-0.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                    activeSection === item.id
                      ? "bg-[#1e3a8a] text-white"
                      : "text-(--text-secondary) hover:bg-(--bg-muted) hover:text-(--text-primary)"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={15} />
                    {item.label}
                  </div>
                  {activeSection === item.id && <ChevronRight size={12} />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content area */}
        <div className="flex-1 min-w-0">
          {/* Company Profile */}
          {activeSection === "profile" && (
            <Card padding="md">
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <Button size="sm" icon={<Save size={14} />}>Save Changes</Button>
              </CardHeader>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#1e3a8a] flex items-center justify-center text-white font-bold text-xl">
                    A
                  </div>
                  <div>
                    <Button variant="secondary" size="sm">Upload Logo</Button>
                    <p className="text-xs text-(--text-muted) mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Company Name" defaultValue="Acme Corp" />
                  <Input label="Domain" defaultValue="acme.amorecrm.com" />
                  <Input label="Phone" defaultValue="+62811000001" />
                  <Input label="Email" defaultValue="info@acmecorp.com" />
                  <Input label="Website" defaultValue="https://acmecorp.com" className="col-span-2" />
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Address</label>
                    <textarea
                      defaultValue="Jakarta, Indonesia"
                      className="w-full h-20 text-sm bg-(--bg-surface) border border-(--border-color) rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/30"
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Team Members */}
          {activeSection === "team" && (
            <Card padding="md">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <Button size="sm" icon={<Plus size={14} />} onClick={() => setShowAddMember(true)}>
                  Invite Member
                </Button>
              </CardHeader>
              <div className="space-y-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 py-3 border-b border-(--border-color) last:border-0">
                    <Avatar name={member.name} size="md" online={member.status === "active"} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-(--text-primary)">{member.name}</p>
                      <p className="text-xs text-(--text-muted)">{member.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        defaultValue={member.role}
                        className="text-xs bg-(--bg-muted) border border-(--border-color) rounded-lg px-2 py-1.5 text-(--text-secondary) focus:outline-none"
                      >
                        <option value="admin">Admin</option>
                        <option value="agent">Agent</option>
                        <option value="viewer">Viewer</option>
                      </select>
                      <Badge variant={member.status === "active" ? "success" : "muted"} size="sm" dot>
                        {member.status}
                      </Badge>
                      <Button variant="ghost" size="xs" className="text-red-400 hover:text-red-500">
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Roles & Permissions */}
          {activeSection === "roles" && (
            <div className="space-y-4">
              <Card padding="md">
                <CardHeader>
                  <CardTitle>Roles & Permissions (RBAC)</CardTitle>
                  <Button size="sm" icon={<Plus size={14} />}>New Role</Button>
                </CardHeader>
                <div className="space-y-3">
                  {roles.map((role) => (
                    <div key={role.id} className="border border-(--border-color) rounded-xl p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", role.color)}>{role.name}</span>
                          </div>
                          <p className="text-xs text-(--text-muted)">{role.description}</p>
                        </div>
                        <Button variant="ghost" size="xs" icon={<Edit size={12} />}>Edit</Button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {role.permissions.map((p) => (
                          <span key={p} className="text-[11px] bg-(--bg-muted) text-(--text-secondary) px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Check size={9} className="text-emerald-500" /> {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Channels & API */}
          {activeSection === "channels" && (
            <div className="space-y-4">
              <Card padding="md">
                <CardHeader>
                  <CardTitle>WhatsApp Cloud API</CardTitle>
                  <Badge variant="success" dot>Connected</Badge>
                </CardHeader>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-(--text-muted) mb-1.5">Phone Number ID</label>
                    <Input defaultValue="123456789012345" />
                  </div>
                  <div>
                    <label className="block text-xs text-(--text-muted) mb-1.5">Access Token</label>
                    <div className="relative">
                      <Input
                        defaultValue="EAABwzLixnjYBO..."
                        type={showApiKey ? "text" : "password"}
                        rightIcon={
                          <button onClick={() => setShowApiKey(!showApiKey)}>
                            {showApiKey ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        }
                      />
                    </div>
                  </div>
                  <Button size="sm" icon={<Save size={14} />}>Save Configuration</Button>
                </div>
              </Card>

              <Card padding="md">
                <CardHeader>
                  <CardTitle>AI Configuration</CardTitle>
                  <Badge variant="success" dot>Active</Badge>
                </CardHeader>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-(--text-muted) mb-1.5">OpenAI API Key</label>
                    <Input defaultValue="sk-..." type="password" />
                  </div>
                  <div>
                    <label className="block text-xs text-(--text-muted) mb-1.5">AI Persona / Tone</label>
                    <textarea
                      defaultValue="You are a helpful and professional CRM assistant for Acme Corp. Always be polite, concise, and helpful."
                      className="w-full h-20 text-sm bg-(--bg-surface) border border-(--border-color) rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/30"
                    />
                  </div>
                  <Button size="sm" icon={<Save size={14} />}>Save AI Settings</Button>
                </div>
              </Card>
            </div>
          )}

          {/* Appearance */}
          {activeSection === "appearance" && (
            <Card padding="md">
              <CardHeader>
                <CardTitle>White-label & Appearance</CardTitle>
                <Button size="sm" icon={<Save size={14} />}>Save Changes</Button>
              </CardHeader>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-3">Brand Colors</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-(--text-muted) mb-2">Primary Color</p>
                      <div className="flex items-center gap-2">
                        <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-(--border-color)" />
                        <Input defaultValue={primaryColor} className="flex-1" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-(--text-muted) mb-2">Accent Color</p>
                      <div className="flex items-center gap-2">
                        <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-(--border-color)" />
                        <Input defaultValue={accentColor} className="flex-1" />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-3">Custom CSS</label>
                  <textarea
                    className="w-full h-32 font-mono text-xs bg-(--bg-muted) border border-(--border-color) rounded-xl px-3 py-2.5 resize-none focus:outline-none"
                    placeholder="/* Add custom CSS here */"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Localization */}
          {activeSection === "localization" && (
            <Card padding="md">
              <CardHeader>
                <CardTitle>Language & Timezone</CardTitle>
                <Button size="sm" icon={<Save size={14} />}>Save</Button>
              </CardHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Language</label>
                  <select className="w-full h-9 text-sm bg-(--bg-surface) border border-(--border-color) rounded-lg px-3 focus:outline-none">
                    <option value="en">English</option>
                    <option value="id">Bahasa Indonesia</option>
                    <option value="es">Español</option>
                    <option value="pt">Português</option>
                    <option value="ar">العربية</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Timezone</label>
                  <select className="w-full h-9 text-sm bg-(--bg-surface) border border-(--border-color) rounded-lg px-3 focus:outline-none">
                    <option value="Asia/Jakarta">Asia/Jakarta (UTC+7)</option>
                    <option value="Asia/Singapore">Asia/Singapore (UTC+8)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                    <option value="Europe/London">Europe/London (UTC+0)</option>
                    <option value="America/New_York">America/New_York (UTC-5)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Date Format</label>
                  <select className="w-full h-9 text-sm bg-(--bg-surface) border border-(--border-color) rounded-lg px-3 focus:outline-none">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Currency</label>
                  <select className="w-full h-9 text-sm bg-(--bg-surface) border border-(--border-color) rounded-lg px-3 focus:outline-none">
                    <option value="IDR">IDR - Indonesian Rupiah</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="SGD">SGD - Singapore Dollar</option>
                  </select>
                </div>
              </div>
            </Card>
          )}

          {/* Notifications */}
          {activeSection === "notifications" && (
            <Card padding="md">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <Button size="sm" icon={<Save size={14} />}>Save</Button>
              </CardHeader>
              <div className="space-y-4">
                {[
                  { label: "New message in Inbox", description: "Notify when a new conversation arrives", email: true, push: true },
                  { label: "Deal status change", description: "Notify when a deal moves to a new stage", email: true, push: false },
                  { label: "Task due soon", description: "Notify 24h before task due date", email: true, push: true },
                  { label: "Subscription expiry", description: "Notify 7 days before plan expires", email: true, push: true },
                  { label: "New team member", description: "Notify when a member joins", email: false, push: false },
                ].map((notif) => (
                  <div key={notif.label} className="flex items-center justify-between py-3 border-b border-(--border-color) last:border-0">
                    <div>
                      <p className="text-sm font-medium text-(--text-primary)">{notif.label}</p>
                      <p className="text-xs text-(--text-muted)">{notif.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1.5 text-xs text-(--text-secondary) cursor-pointer">
                        <input type="checkbox" defaultChecked={notif.email} className="rounded" />
                        Email
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-(--text-secondary) cursor-pointer">
                        <input type="checkbox" defaultChecked={notif.push} className="rounded" />
                        Push
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Invite Modal */}
      <Modal
        open={showAddMember}
        onClose={() => setShowAddMember(false)}
        title="Invite Team Member"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowAddMember(false)}>Cancel</Button>
            <Button onClick={() => setShowAddMember(false)}>Send Invite</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Email Address" placeholder="colleague@company.com" type="email" />
          <div>
            <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Role</label>
            <select className="w-full h-9 text-sm bg-(--bg-surface) border border-(--border-color) rounded-lg px-3 focus:outline-none">
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
