import React, { useState } from 'react';
import { MessageSquare, Copy, Check, AlertCircle, X } from 'lucide-react';

export default function SMSTickerGenerator() {
  const [complaintInput, setComplaintInput] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [copiedComplaint, setCopiedComplaint] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  // 1. Complaint / Ticket Number logic (10 numeric digits)
  const rawComplaintDigits = complaintInput.replace(/\D/g, '').slice(0, 10);
  const isComplaintEntered = complaintInput.trim().length > 0;
  const isComplaintValid = rawComplaintDigits.length === 10;

  const complaintPreviewText = isComplaintValid
    ? `Dear Customer, your service request has been assigned Ticket ID: ${rawComplaintDigits}. A technician will be dispatched to your location shortly. For inquiries, please call our 905 helplines.`
    : null;

  // 2. Smart Meter Token Recharge logic (20 numeric digits)
  const rawTokenDigits = tokenInput.replace(/\D/g, '').slice(0, 20);
  const isTokenEntered = tokenInput.trim().length > 0;
  const isTokenValid = rawTokenDigits.length === 20;

  // Format 20 digits into five 4-digit groups (XXXX XXXX XXXX XXXX XXXX)
  const formatTokenGroups = (digits: string): string => {
    const parts: string[] = [];
    for (let i = 0; i < digits.length; i += 4) {
      parts.push(digits.slice(i, i + 4));
    }
    return parts.join(' ');
  };

  const formattedToken = isTokenValid ? formatTokenGroups(rawTokenDigits) : '';

  const tokenPreviewText = isTokenValid
    ? `Dear Customer, your smart meter token number is: ${formattedToken}. Please enter the token into your meter to recharge your electricity service. For inquiries, please call our 905 helplines.`
    : null;

  const handleCopyComplaint = () => {
    if (!complaintPreviewText) return;
    navigator.clipboard.writeText(complaintPreviewText);
    setCopiedComplaint(true);
    setTimeout(() => setCopiedComplaint(false), 2000);
  };

  const handleCopyToken = () => {
    if (!tokenPreviewText) return;
    navigator.clipboard.writeText(tokenPreviewText);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div id="sms-ticket-generator-view" className="w-full pb-8">
      {/* 2-Column Responsive Card Grid matching the exact reference UI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

        {/* Card 1: Complaint / Ticket Number */}
        <div className="bg-white dark:bg-zinc-950 border border-gray-150 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header with rounded icon, title & description */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                  Complaint / Ticket Number
                </h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
                  Service request & complaint ticket notification
                </p>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="border-t border-gray-200 dark:border-zinc-800 my-5" />

            {/* Input Field Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="complaint-ticket-input" 
                  className="block text-xs font-semibold text-gray-800 dark:text-zinc-200"
                >
                  Complaint / Ticket Number
                </label>
                {isComplaintEntered && (
                  <button
                    id="clear-complaint-btn"
                    type="button"
                    onClick={() => setComplaintInput('')}
                    className="text-[11px] font-medium text-gray-400 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                    title="Clear input"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              <div className="relative">
                <input
                  id="complaint-ticket-input"
                  type="text"
                  inputMode="numeric"
                  value={complaintInput}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setComplaintInput(cleaned);
                  }}
                  placeholder="Enter complaint number"
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl text-sm font-sans bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
                {isComplaintEntered && (
                  <button
                    id="clear-complaint-icon-btn"
                    type="button"
                    onClick={() => setComplaintInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-150 dark:bg-zinc-800 hover:bg-gray-250 dark:hover:bg-zinc-700 text-gray-400 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200 flex items-center justify-center transition-colors cursor-pointer"
                    title="Clear"
                    aria-label="Clear complaint number"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Status/Validation hint */}
              {!isComplaintEntered ? (
                <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-500 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Please enter a complaint/ticket number.</span>
                </div>
              ) : !isComplaintValid ? (
                <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-500 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Ticket number must be exactly 10 digits ({rawComplaintDigits.length}/10).</span>
                </div>
              ) : null}
            </div>

            {/* SMS Preview Section */}
            <div className="mt-5 space-y-2">
              <label className="block text-xs font-semibold text-gray-800 dark:text-zinc-200">
                SMS Preview
              </label>
              <div className="border border-dashed border-gray-300 dark:border-zinc-700 bg-gray-50/60 dark:bg-zinc-900/40 rounded-xl p-5 min-h-[110px] flex items-center justify-center text-center">
                {complaintPreviewText ? (
                  <p className="text-xs sm:text-sm text-gray-800 dark:text-zinc-100 font-sans leading-relaxed text-left select-all">
                    {complaintPreviewText}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 dark:text-zinc-500 italic font-sans">
                    Enter a 10-digit ticket number above to generate the customer SMS message.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Copy Button */}
          <div className="mt-6">
            <button
              id="copy-complaint-sms-btn"
              type="button"
              disabled={!isComplaintValid}
              onClick={handleCopyComplaint}
              className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                isComplaintValid
                  ? 'bg-[#078930] hover:bg-[#067227] text-white shadow-xs cursor-pointer active:scale-[0.99]'
                  : 'bg-gray-100 dark:bg-zinc-800/80 text-gray-400 dark:text-zinc-500 cursor-not-allowed'
              }`}
            >
              {copiedComplaint ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-400 dark:text-zinc-500 group-hover:text-gray-600" />
                  <span>Copy SMS</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card 2: Smart Meter Token SMS */}
        <div className="bg-white dark:bg-zinc-950 border border-gray-150 dark:border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header with blue rounded icon, title & description */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/50 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                  Smart Meter Token SMS
                </h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
                  20-digit prepaid meter recharge token
                </p>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="border-t border-gray-200 dark:border-zinc-800 my-5" />

            {/* Input Field Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label 
                  htmlFor="smart-token-input" 
                  className="block text-xs font-semibold text-gray-800 dark:text-zinc-200"
                >
                  Smart Meter Token Number
                </label>
                {isTokenEntered && (
                  <button
                    id="clear-token-btn"
                    type="button"
                    onClick={() => setTokenInput('')}
                    className="text-[11px] font-medium text-gray-400 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                    title="Clear input"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              <div className="relative">
                <input
                  id="smart-token-input"
                  type="text"
                  inputMode="numeric"
                  value={formatTokenGroups(rawTokenDigits)}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 20);
                    setTokenInput(cleaned);
                  }}
                  placeholder="Enter Token Number"
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl text-sm font-mono tracking-wide bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 text-gray-900 dark:text-white placeholder:text-gray-400 placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                />
                {isTokenEntered && (
                  <button
                    id="clear-token-icon-btn"
                    type="button"
                    onClick={() => setTokenInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-150 dark:bg-zinc-800 hover:bg-gray-250 dark:hover:bg-zinc-700 text-gray-400 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200 flex items-center justify-center transition-colors cursor-pointer"
                    title="Clear"
                    aria-label="Clear token number"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Status/Validation hint */}
              {!isTokenEntered ? (
                <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-500 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Please enter the smart meter token number.</span>
                </div>
              ) : !isTokenValid ? (
                <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-500 pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Token number must be exactly 20 digits ({rawTokenDigits.length}/20).</span>
                </div>
              ) : null}
            </div>

            {/* SMS Preview Section */}
            <div className="mt-5 space-y-2">
              <label className="block text-xs font-semibold text-gray-800 dark:text-zinc-200">
                SMS Preview
              </label>
              <div className="border border-dashed border-gray-300 dark:border-zinc-700 bg-gray-50/60 dark:bg-zinc-900/40 rounded-xl p-5 min-h-[110px] flex items-center justify-center text-center">
                {tokenPreviewText ? (
                  <p className="text-xs sm:text-sm text-gray-800 dark:text-zinc-100 font-sans leading-relaxed text-left select-all">
                    {tokenPreviewText}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 dark:text-zinc-500 italic font-sans">
                    Enter a 20-digit token number above to generate the customer recharge SMS.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Copy Button */}
          <div className="mt-6">
            <button
              id="copy-token-sms-btn"
              type="button"
              disabled={!isTokenValid}
              onClick={handleCopyToken}
              className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                isTokenValid
                  ? 'bg-[#078930] hover:bg-[#067227] text-white shadow-xs cursor-pointer active:scale-[0.99]'
                  : 'bg-gray-100 dark:bg-zinc-800/80 text-gray-400 dark:text-zinc-500 cursor-not-allowed'
              }`}
            >
              {copiedToken ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-400 dark:text-zinc-500 group-hover:text-gray-600" />
                  <span>Copy SMS</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
