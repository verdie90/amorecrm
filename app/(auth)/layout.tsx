import {
  HeartHandshake, Users, Zap, Globe, Shield, BarChart3,
} from "lucide-react";

const features = [
  { icon: Users, label: "Multi-tenant CRM", desc: "Manage multiple businesses" },
  { icon: Zap, label: "AI-powered automation", desc: "Smart workflows & triggers" },
  { icon: Globe, label: "Omnichannel inbox", desc: "All channels, one place" },
  { icon: Shield, label: "Enterprise security", desc: "SOC 2 compliant" },
  { icon: BarChart3, label: "Advanced analytics", desc: "Data-driven insights" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-(--bg-base)">
      {/* Left branding panel */}
      <div
        className="hidden lg:flex lg:w-5/12 bg-linear-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#0ea5e9] flex-col justify-between p-10 xl:p-12 relative overflow-hidden animate-gradient"
        style={{ backgroundSize: "200% 200%" }}
      >
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-white rounded-full blur-3xl opacity-10" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#38bdf8] rounded-full blur-3xl opacity-10" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white rounded-full blur-3xl opacity-5" />
        </div>

        {/* Top section */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
              <HeartHandshake size={22} className="text-white" />
            </div>
            <span className="font-display font-bold text-white text-xl tracking-tight">Amore CRM</span>
          </div>

          {/* Headlines */}
          <h1 className="font-display text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
            Build stronger<br />customer relationships
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-xs xl:max-w-sm">
            The all-in-one CRM platform for modern businesses. Manage contacts, deals, conversations and more.
          </p>

          {/* Feature grid */}
          <div className="mt-10 grid gap-3">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/15 transition-colors">
                    <Icon size={16} className="text-[#38bdf8]" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white">{f.label}</span>
                    <p className="text-xs text-white/50">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom — trust badge */}
        <div className="relative z-10">
          <div className="bg-white/10 rounded-2xl px-5 py-4 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {["A", "S", "C", "B"].map((n, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-white/25 border-2 border-white/40 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {n}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">500+ companies</p>
                <p className="text-white/60 text-xs">trust Amore CRM worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right content panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-linear-to-br from-[#1e3a8a] to-[#1d4ed8] rounded-xl flex items-center justify-center shadow-lg shadow-[#1e3a8a]/20">
              <HeartHandshake size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-(--text-primary) text-lg tracking-tight">Amore CRM</span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
