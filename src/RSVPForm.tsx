import React, { useState, useEffect } from "react";

export default function RSVPForm() {
  const endpoint = "https://script.google.com/macros/s/AKfycbysY94L_O9wEXg6GQOumqJz0kukeEmUFGL8TgE0LkbRSORiuHPmQoonfyTPhy_1wKxU3Q/exec";

  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [name, setName] = useState<string>("");

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Auto-detect name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('guest');
    if (guestName) {
      setName(guestName);
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!endpoint) {
      setErrorMessage("RSVP saving is not configured yet.");
      return;
    }

    const payload = {
      name: name.trim(),
      attendance,
      submittedAt: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });
      setSuccessMessage("RSVP saved. Thank you!");
    } catch {
      setErrorMessage("Could not submit RSVP. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={submit} className="space-y-4 px-2">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAttendance("yes")}
            className={`py-3 rounded-xl text-[12px] uppercase tracking-widest font-bold border transition-colors ${attendance === "yes" ? "bg-[#c084fc] text-white border-[#c084fc]" : "bg-white text-zinc-400 border-zinc-200"
              }`}
          >
            Yes, I will attend
          </button>
          <button
            type="button"
            onClick={() => setAttendance("no")}
            className={`py-3 rounded-xl text-[12px] uppercase tracking-widest font-bold border transition-colors ${attendance === "no" ? "bg-zinc-700 text-white border-zinc-700" : "bg-white text-zinc-400 border-zinc-200"
              }`}
          >
            No, I cannot
          </button>
        </div>

        <div>
          <input
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="Guest Name"
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-[#7e22ce] font-serif outline-none focus:border-[#c084fc] focus:ring-1 focus:ring-[#c084fc]"
          />
        </div>

        {errorMessage && <p className="text-[12px] text-red-600 font-semibold">{errorMessage}</p>}
        {successMessage && <p className="text-[12px] text-[#a855f7] font-bold">{successMessage}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#7e22ce] text-white py-3.5 rounded-xl text-[12px] uppercase tracking-widest font-bold disabled:opacity-60 shadow-md transition-colors hover:bg-black mt-2"
        >
          {submitting ? "Submitting..." : "Submit RSVP"}
        </button>

        <div className="mt-4 text-center space-y-2 border-t border-[#a855f7]/20 pt-4">
          <p className="text-[12px] sm:text-sm uppercase tracking-widest text-[#7e22ce] font-bold">
            Kindly Confirm Your Presence By 5th January 2027
          </p>
          <div className="text-[11px] sm:text-xs text-zinc-500 font-medium">
            <p>Chameera: 071-0537559</p>
            <p>Dameesha: 076-2844343</p>
          </div>
        </div>
      </form>
    </div>
  );
}
