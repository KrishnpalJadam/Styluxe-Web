"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, CheckCircle2, Clock3, MapPin, Scissors, User, X } from "lucide-react";
import { bookPublicAppointment, getMiniWebPayload, type MiniWebPayload } from "../lib/api";

type BookAppointmentModalProps = {
  open: boolean;
  onClose: () => void;
  defaultBranchId?: string | number;
  defaultBranchName?: string;
};

const TIME_SLOTS = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  "19:00", "19:30", "20:00"
];

function formatSlotLabel(slot: string) {
  const [hStr, mStr] = slot.split(":");
  let h = Number(hStr);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${mStr} ${ampm}`;
}

export default function BookAppointmentModal({
  open,
  onClose,
  defaultBranchId,
  defaultBranchName
}: BookAppointmentModalProps) {
  const [payload, setPayload] = useState<MiniWebPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<any>(null);

  const [branchId, setBranchId] = useState("");
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [staffId, setStaffId] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [timeSlot, setTimeSlot] = useState("11:00");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open) return;
    setError("");
    setConfirmed(null);
    setLoading(true);
    getMiniWebPayload()
      .then((data) => {
        setPayload(data);
        const branches = data?.branches || [];
        if (branches.length > 0) {
          const matched = branches.find(
            (b: any) =>
              (defaultBranchId && String(b.id) === String(defaultBranchId)) ||
              (defaultBranchName &&
                String(b.name).toLowerCase().includes(String(defaultBranchName).toLowerCase()))
          );
          setBranchId(matched ? matched.id : branches[0].id);
        }
      })
      .finally(() => setLoading(false));
  }, [open, defaultBranchId, defaultBranchName]);

  const branches = payload?.branches || [];
  const branchServices = useMemo(() => {
    const all = payload?.services || [];
    if (!branchId) return all;
    return all.filter((s: any) => !s.branchId || s.branchId === branchId);
  }, [payload, branchId]);

  const branchStaff = useMemo(() => {
    const all = payload?.staff || [];
    if (!branchId) return all;
    return all.filter((s) => !s.branchId || s.branchId === branchId);
  }, [payload, branchId]);

  const selectedServices = useMemo(
    () => branchServices.filter((s: any) => selectedServiceIds.includes(s.id)),
    [branchServices, selectedServiceIds]
  );

  const totalDuration = useMemo(
    () => selectedServices.reduce((sum: number, s: any) => sum + Number(s.durationMinutes || 30), 0) || 30,
    [selectedServices]
  );

  const totalPrice = useMemo(
    () => selectedServices.reduce((sum: number, s: any) => sum + Number(s.price || 0), 0),
    [selectedServices]
  );

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!branchId) {
      setError("Please select a salon branch.");
      return;
    }
    if (selectedServices.length === 0) {
      setError("Please select at least one service.");
      return;
    }
    if (!customerName.trim() || customerName.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    const cleanDigits = customerPhone.replace(/\D/g, "");
    if (cleanDigits.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const startDate = new Date(`${date}T${timeSlot}:00`);
    if (Number.isNaN(startDate.getTime())) {
      setError("Please select a valid date and time.");
      return;
    }

    let cursorMs = startDate.getTime();
    const items = selectedServices.map((service: any) => {
      const dur = Number(service.durationMinutes || 30);
      const itemStart = new Date(cursorMs);
      cursorMs += dur * 60 * 1000;
      const itemEnd = new Date(cursorMs);
      return {
        serviceId: service.id,
        staffUserIds: staffId ? [staffId] : [],
        startAt: itemStart.toISOString(),
        endAt: itemEnd.toISOString()
      };
    });

    const endDate = new Date(cursorMs);

    setSubmitting(true);
    try {
      const result = await bookPublicAppointment({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        branchId,
        primaryStaffUserId: staffId || undefined,
        title: selectedServices.map((s: any) => s.name).join(", ").slice(0, 120),
        startAt: startDate.toISOString(),
        endAt: endDate.toISOString(),
        notes: notes.trim() || undefined,
        items
      });
      setConfirmed({
        id: result.id,
        branchName: branches.find((b: any) => b.id === branchId)?.name || defaultBranchName || "Styluxe Salon",
        date,
        timeSlot,
        services: selectedServices.map((s: any) => s.name)
      });
    } catch (err: any) {
      setError(err?.message || "Could not complete booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #d6cfc2",
    fontSize: 14,
    background: "#ffffff",
    color: "#1a2e22",
    boxSizing: "border-box",
    outline: "none"
  };

  const labelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 700,
    color: "#0d3b26",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: "0.04em"
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(13, 29, 21, 0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 620,
          maxHeight: "90vh",
          background: "#faf7f2",
          borderRadius: 18,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.28)",
          border: "1px solid #e5dfd3"
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#0d3b26",
            color: "#faf7f2",
            padding: "18px 22px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#d6c7b2", fontWeight: 600 }}>
              Styluxe Salons · Online Desk
            </div>
            <h3 style={{ margin: "3px 0 0", fontSize: 20, fontWeight: 700 }}>Book Your Appointment</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking dialog"
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "#faf7f2",
              border: "none",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 22, overflowY: "auto", flex: 1 }}>
          {loading ? (
            <div style={{ padding: 36, textAlign: "center", color: "#4a5d52", fontSize: 14 }}>
              Loading live salon branches &amp; services...
            </div>
          ) : confirmed ? (
            <div style={{ textAlign: "center", padding: "18px 10px" }}>
              <CheckCircle2 size={54} color="#15803d" style={{ margin: "0 auto 12px" }} />
              <h4 style={{ margin: "0 0 6px", fontSize: 20, color: "#0d3b26" }}>Appointment Requested!</h4>
              <p style={{ margin: "0 0 18px", fontSize: 14, color: "#475569" }}>
                Your booking has been sent directly to the <strong>{confirmed.branchName}</strong> desk.
              </p>
              <div style={{ background: "#ffffff", border: "1px solid #e5dfd3", borderRadius: 12, padding: 16, textAlign: "left", fontSize: 13, marginBottom: 20 }}>
                <div style={{ marginBottom: 6 }}><strong>Branch:</strong> {confirmed.branchName}</div>
                <div style={{ marginBottom: 6 }}><strong>Date &amp; Time:</strong> {confirmed.date} at {formatSlotLabel(confirmed.timeSlot)}</div>
                <div><strong>Services:</strong> {confirmed.services.join(", ")}</div>
              </div>
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: "#0d3b26",
                  color: "#fff",
                  border: "none",
                  borderRadius: 999,
                  padding: "11px 28px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Done
              </button>
            </div>
          ) : branches.length === 0 ? (
            <div style={{ padding: 24, textAlign: "center", color: "#475569", fontSize: 14 }}>
              Live online booking is not connected to a salon slug yet. Please configure <code>NEXT_PUBLIC_SALON_SLUG</code> or contact the studio directly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {error && (
                <div style={{ padding: "10px 14px", borderRadius: 10, background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: 13, fontWeight: 600 }}>
                  {error}
                </div>
              )}

              {/* Branch selector */}
              <div>
                <label style={labelStyle}><MapPin size={13} /> Select Salon Branch *</label>
                <select
                  style={inputStyle}
                  value={branchId}
                  onChange={(e) => {
                    setBranchId(e.target.value);
                    setSelectedServiceIds([]);
                    setStaffId("");
                  }}
                >
                  {branches.map((b: any) => (
                    <option key={b.id} value={b.id}>
                      {b.name}{b.address ? ` — ${b.address}` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Services */}
              <div>
                <label style={labelStyle}><Scissors size={13} /> Select Services * ({selectedServices.length} chosen)</label>
                <div style={{ maxHeight: 170, overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8, padding: 2 }}>
                  {branchServices.map((s: any) => {
                    const active = selectedServiceIds.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggleService(s.id)}
                        style={{
                          textAlign: "left",
                          padding: "9px 12px",
                          borderRadius: 10,
                          border: active ? "1.5px solid #0d3b26" : "1px solid #d6cfc2",
                          background: active ? "#e9f3ec" : "#ffffff",
                          cursor: "pointer"
                        }}
                      >
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#0d3b26" }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: "#52665a", marginTop: 2 }}>
                          ₹{Number(s.price || 0).toFixed(0)} · {s.durationMinutes || 30} min
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stylist + Date + Time */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
                <div>
                  <label style={labelStyle}><User size={13} /> Stylist (Optional)</label>
                  <select style={inputStyle} value={staffId} onChange={(e) => setStaffId(e.target.value)}>
                    <option value="">Any Available Stylist</option>
                    {branchStaff.map((st) => (
                      <option key={st.id} value={st.id}>{st.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}><CalendarCheck size={13} /> Date *</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().slice(0, 10)}
                    style={inputStyle}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}><Clock3 size={13} /> Time *</label>
                  <select style={inputStyle} value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{formatSlotLabel(slot)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Customer Info */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input type="text" required placeholder="Your name" style={inputStyle} value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Mobile Number *</label>
                  <input type="tel" required placeholder="+91 9876543210" style={inputStyle} value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Email (Optional)</label>
                  <input type="email" placeholder="you@example.com" style={inputStyle} value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Notes (Optional)</label>
                  <input type="text" placeholder="Any preference or request" style={inputStyle} value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
              </div>

              {/* Footer summary & CTA */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, paddingTop: 12, borderTop: "1px solid #e5dfd3", flexWrap: "wrap" }}>
                <div style={{ fontSize: 13, color: "#334155" }}>
                  <strong>Est. Total: ₹{totalPrice.toFixed(0)}</strong> · {totalDuration} min
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: "#0d3b26",
                    color: "#faf7f2",
                    border: "none",
                    borderRadius: 999,
                    padding: "11px 24px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.7 : 1
                  }}
                >
                  {submitting ? "Confirming..." : "Confirm Appointment"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
