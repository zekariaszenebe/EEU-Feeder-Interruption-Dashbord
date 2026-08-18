import React, { useState } from 'react';
import { MessageCircle, Send, X, Star, CheckCircle, Mail, Copy, Check } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
  userName?: string;
}

export default function FeedbackModal({ isOpen, onClose, userRole = 'Call Agent', userName }: FeedbackModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [category, setCategory] = useState<string>('General Experience');
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const targetEmail = 'zekariaszenebe21@gmail.com';
  const emailSubject = 'Website Feedback';

  const categories = [
    'General Experience',
    'Feature Suggestion',
    'Bug / Issue Report',
    'Data Accuracy',
    'User Interface / Usability',
    'Other'
  ];

  const handleSendEmail = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const starDisplay = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    const bodyContent = [
      `Website Experience Feedback`,
      `=============================`,
      `Rating: ${rating}/5 (${starDisplay})`,
      `Category: ${category}`,
      `Submitted By: ${userName || userRole || 'Call Center User'}`,
      `Date & Time: ${new Date().toLocaleString('en-US')}`,
      ``,
      `User Feedback & Comments:`,
      `-----------------------------`,
      feedbackText.trim() ? feedbackText.trim() : '(No additional text provided)',
      ``,
      `-----------------------------`,
      `Sent from Ethiopian Electric Utility (EEU) Feeder Interruption Call Center Portal`
    ].join('\n');

    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(bodyContent)}`;
    
    // Open default email client
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const handleCopyText = () => {
    const starDisplay = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    const bodyContent = [
      `Subject: ${emailSubject}`,
      `To: ${targetEmail}`,
      ``,
      `Website Experience Feedback`,
      `=============================`,
      `Rating: ${rating}/5 (${starDisplay})`,
      `Category: ${category}`,
      `Submitted By: ${userName || userRole || 'Call Center User'}`,
      `Date & Time: ${new Date().toLocaleString('en-US')}`,
      ``,
      `User Feedback & Comments:`,
      `-----------------------------`,
      feedbackText.trim() ? feedbackText.trim() : '(No additional text provided)'
    ].join('\n');

    navigator.clipboard.writeText(bodyContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFeedbackText('');
    setRating(5);
    setCategory('General Experience');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-eeu-green/10 via-transparent to-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-eeu-green/15 text-eeu-green flex items-center justify-center font-bold">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-gray-900 dark:text-white">
                Share Website Feedback
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Send your experience directly to <span className="font-semibold text-eeu-green">{targetEmail}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Email Client Triggered!</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                Your email app should now open with subject <b>&ldquo;Website Feedback&rdquo;</b> addressing <b>{targetEmail}</b>.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleCopyText}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Message Text'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-eeu-green text-white text-xs font-bold hover:bg-eeu-green/90 transition-all shadow-md shadow-eeu-green/20"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSendEmail} className="p-6 space-y-4.5">
            {/* Rating Stars */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                How is your overall experience?
              </label>
              <div className="flex items-center gap-2 pt-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-hidden"
                    title={`${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300 dark:text-gray-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 ml-2">
                  {rating === 5 ? 'Excellent 🌟' : rating === 4 ? 'Very Good 👍' : rating === 3 ? 'Good / Average 👌' : rating === 2 ? 'Fair ⚡' : 'Needs Improvement ⚠️'}
                </span>
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                Feedback Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-hidden focus:ring-2 focus:ring-eeu-green font-medium"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Your Thoughts & Suggestions
                </label>
                <span className="text-[11px] text-gray-400">
                  Subject: <b className="text-gray-600 dark:text-gray-300">Website Feedback</b>
                </span>
              </div>
              <textarea
                rows={4}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Share your experience, suggest a feature, or describe any issue encountered..."
                className="w-full p-3 text-xs rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-eeu-green resize-none font-sans"
              />
            </div>

            {/* Destination Info Pill */}
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200/70 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5 truncate">
                <Mail className="w-3.5 h-3.5 text-eeu-green shrink-0" />
                <span className="truncate">Destination: <b>{targetEmail}</b></span>
              </div>
              <button
                type="button"
                onClick={handleCopyText}
                className="text-[11px] text-eeu-green hover:underline font-semibold flex items-center gap-1 shrink-0"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-bold text-white bg-eeu-green hover:bg-eeu-green/90 rounded-xl transition-all shadow-md shadow-eeu-green/20 flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Email Feedback</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
