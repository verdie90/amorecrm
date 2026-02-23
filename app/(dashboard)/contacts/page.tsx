"use client";
import { useState } from "react";
import {
  Users, Plus, Search, Filter, MoreHorizontal, Mail, Phone,
  Building2, Edit, MessageSquare
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { EmptyState } from "@/components/ui/misc";
import { mockContacts } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { Contact } from "@/types";

const typeVariant: Record<string, "success" | "warning" | "info"> = {
  client: "success",
  lead: "warning",
  prospect: "info",
};

const filterTabs = ["All", "Leads", "Clients", "Prospects"];

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  // viewMode state reserved for future grid view toggle

  const filtered = mockContacts.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.company || "").toLowerCase().includes(search.toLowerCase());
    const matchTab =
      activeTab === "All" ||
      (activeTab === "Leads" && c.type === "lead") ||
      (activeTab === "Clients" && c.type === "client") ||
      (activeTab === "Prospects" && c.type === "prospect");
    return matchSearch && matchTab;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-(--text-primary)">Contacts</h1>
          <p className="text-sm text-(--text-muted) mt-0.5">{mockContacts.length.toLocaleString()} total records</p>
        </div>
        <Button icon={<Plus size={15} />} onClick={() => setShowAddModal(true)}>
          Add Contact
        </Button>
      </div>

      {/* Tabs + Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex items-center gap-1 bg-(--bg-muted) rounded-xl p-1">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === tab
                  ? "bg-(--bg-surface) text-(--text-primary) shadow-sm"
                  : "text-(--text-muted) hover:text-(--text-primary)"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex-1 flex items-center gap-2 ml-auto">
          <Input
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={14} />}
            className="max-w-xs"
          />
          <Button variant="secondary" size="md" icon={<Filter size={14} />}>
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Users size={24} />}
          title="No contacts found"
          description="Try adjusting your search or add a new contact."
          action={<Button icon={<Plus size={14} />} onClick={() => setShowAddModal(true)}>Add Contact</Button>}
        />
      ) : (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-(--bg-muted) text-xs text-(--text-muted) border-b border-(--border-color)">
                  <th className="text-left px-4 py-3 font-medium">Contact</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Company</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Type</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Industry</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Last Activity</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Tags</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border-color)">
                {filtered.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-(--bg-muted) transition-colors cursor-pointer"
                    onClick={() => setSelectedContact(contact)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={contact.name} size="sm" />
                        <div>
                          <p className="font-semibold text-(--text-primary) text-xs">{contact.name}</p>
                          <p className="text-[11px] text-(--text-muted)">{contact.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="flex items-center gap-1.5 text-xs text-(--text-secondary)">
                        <Building2 size={12} />
                        {contact.company || "—"}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <Badge variant={typeVariant[contact.type] || "muted"} size="sm">
                        {contact.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-xs text-(--text-secondary)">{contact.industry || "—"}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-xs text-(--text-muted)">
                        {contact.lastActivity ? formatDate(contact.lastActivity, "relative") : "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-1 flex-wrap">
                        {contact.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="muted" size="sm">{tag}</Badge>
                        ))}
                        {contact.tags.length > 2 && (
                          <span className="text-xs text-(--text-muted)">+{contact.tags.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="xs" className="opacity-0 group-hover:opacity-100">
                          <Mail size={13} />
                        </Button>
                        <Button variant="ghost" size="xs">
                          <MoreHorizontal size={13} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Contact Detail Modal */}
      {selectedContact && (
        <Modal
          open={!!selectedContact}
          onClose={() => setSelectedContact(null)}
          title={selectedContact.name}
          description={selectedContact.company}
          size="lg"
        >
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar name={selectedContact.name} size="xl" />
              <div>
                <h2 className="font-display font-bold text-lg text-(--text-primary)">{selectedContact.name}</h2>
                <p className="text-sm text-(--text-muted)">{selectedContact.company} · {selectedContact.industry}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={typeVariant[selectedContact.type] || "muted"}>{selectedContact.type}</Badge>
                  {selectedContact.tags.map((tag) => (
                    <Badge key={tag} variant="muted">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-(--bg-muted) rounded-xl p-4">
              <div>
                <p className="text-xs text-(--text-muted) mb-1">Email</p>
                <p className="text-sm font-medium text-(--text-primary) flex items-center gap-1.5">
                  <Mail size={13} className="text-[#1e3a8a]" /> {selectedContact.email}
                </p>
              </div>
              <div>
                <p className="text-xs text-(--text-muted) mb-1">Phone</p>
                <p className="text-sm font-medium text-(--text-primary) flex items-center gap-1.5">
                  <Phone size={13} className="text-[#1e3a8a]" /> {selectedContact.phone || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-(--text-muted) mb-1">Industry</p>
                <p className="text-sm font-medium text-(--text-primary)">{selectedContact.industry || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-(--text-muted) mb-1">Created</p>
                <p className="text-sm font-medium text-(--text-primary)">{formatDate(selectedContact.createdAt)}</p>
              </div>
            </div>

            {selectedContact.notes && (
              <div>
                <p className="text-xs font-semibold text-(--text-muted) uppercase mb-2">Notes</p>
                <p className="text-sm text-(--text-secondary) bg-(--bg-muted) rounded-xl p-3">{selectedContact.notes}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button icon={<Mail size={14} />} variant="secondary" size="sm">Send Email</Button>
              <Button icon={<MessageSquare size={14} />} variant="secondary" size="sm">Message</Button>
              <Button icon={<Edit size={14} />} size="sm">Edit</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Contact Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Contact"
        description="Fill out the details to create a new contact."
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={() => setShowAddModal(false)}>Create Contact</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="First Name" placeholder="Ahmad" />
            <Input label="Last Name" placeholder="Fauzi" />
          </div>
          <Input label="Email" placeholder="ahmad@company.com" type="email" />
          <Input label="Phone" placeholder="+62811234567" />
          <Input label="Company" placeholder="PT Maju Jaya" leftIcon={<Building2 size={14} />} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Industry" placeholder="Manufacturing" />
            <div>
              <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Type</label>
              <select className="w-full h-9 text-sm bg-(--bg-surface) text-(--text-primary) border border-(--border-color) rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/30">
                <option value="lead">Lead</option>
                <option value="prospect">Prospect</option>
                <option value="client">Client</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
