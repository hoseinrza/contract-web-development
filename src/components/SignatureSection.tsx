import React, { useState } from 'react';
import { PenTool, Stamp, CheckCircle } from 'lucide-react';

interface SignatureSectionProps {
  clientName: string;
  contractorName: string;
  clientSignDate: string;
  contractorSignDate: string;
  isEditing: boolean;
  onClientDateChange: (val: string) => void;
  onContractorDateChange: (val: string) => void;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({
  clientName,
  contractorName,
  clientSignDate,
  contractorSignDate,
  isEditing,
  onClientDateChange,
  onContractorDateChange,
}) => {
  const [hasClientStamp, setHasClientStamp] = useState(false);
  const [hasContractorStamp, setHasContractorStamp] = useState(false);

  return (
    <div className="mt-14 pt-8 border-t-2 border-slate-200 avoid-break">
      <div className="flex justify-between items-start gap-8">
        {/* مهر و امضای کارفرما */}
        <div className="text-center w-5/12 flex flex-col items-center">
          <p className="font-bold text-base md:text-lg text-slate-800 mb-2">
            مهر و امضای کارفرما
          </p>
          <p className="text-xs text-slate-500 mb-4 font-medium">
            {clientName ? `(${clientName})` : '(شخص حقیقی یا حقوقی کارفرما)'}
          </p>

          {/* محوطه امضا و مهر */}
          <div className="w-full h-24 relative flex items-center justify-center border border-dashed border-transparent hover:border-slate-300 rounded-lg transition mb-2">
            {hasClientStamp ? (
              <div className="border-2 border-emerald-600/70 rounded-full w-20 h-20 flex flex-col items-center justify-center text-emerald-800 font-bold text-[10px] transform -rotate-12 bg-emerald-50/50 shadow-sm">
                <span>تأیید شد</span>
                <span className="text-[9px] font-normal">{clientSignDate}</span>
                <span className="text-[8px] text-emerald-700">مهر کارفرما</span>
              </div>
            ) : (
              <div className="text-slate-300 text-xs flex flex-col items-center gap-1 print:hidden">
                <PenTool className="w-4 h-4" />
                <span>محل امضا و اثر انگشت یا مهر</span>
              </div>
            )}
          </div>

          <div className="w-full border-t border-gray-300 pt-2">
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-500">
              <span>تاریخ:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={clientSignDate}
                  onChange={(e) => onClientDateChange(e.target.value)}
                  className="w-24 text-center border-b border-slate-300 focus:outline-none focus:border-indigo-500 py-0.5 text-slate-700"
                  placeholder="۱۴۰۳/۰۶/۲۳"
                />
              ) : (
                <span className="font-medium text-slate-700">{clientSignDate}</span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">امضا و اثر انگشت</p>
          </div>

          {/* دکمه شبیه‌ساز مهر در پیش‌نمایش */}
          <button
            type="button"
            onClick={() => setHasClientStamp(!hasClientStamp)}
            className="no-print mt-2 text-[11px] text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition"
          >
            <Stamp className="w-3 h-3" />
            {hasClientStamp ? 'حذف مهر کارفرما' : 'درج مهر آزمایشی کارفرما'}
          </button>
        </div>

        {/* مهر و امضای مجری */}
        <div className="text-center w-5/12 flex flex-col items-center">
          <p className="font-bold text-base md:text-lg text-slate-800 mb-2">
            مهر و امضای مجری
          </p>
          <p className="text-xs text-slate-500 mb-4 font-medium">
            {contractorName ? `(${contractorName})` : '(پاشا)'}
          </p>

          {/* محوطه امضا و مهر */}
          <div className="w-full h-24 relative flex items-center justify-center border border-dashed border-transparent hover:border-slate-300 rounded-lg transition mb-2">
            {hasContractorStamp ? (
              <div className="border-2 border-indigo-600/80 rounded-full w-20 h-20 flex flex-col items-center justify-center text-indigo-900 font-bold text-[10px] transform rotate-6 bg-indigo-50/50 shadow-sm">
                <span>تأیید و امضا</span>
                <span className="text-[9px] font-normal">{contractorSignDate}</span>
                <span className="text-[8px] text-indigo-700">معماری نرم‌افزار</span>
              </div>
            ) : (
              <div className="text-slate-300 text-xs flex flex-col items-center gap-1 print:hidden">
                <PenTool className="w-4 h-4" />
                <span>محل امضا و مهر مجری</span>
              </div>
            )}
          </div>

          <div className="w-full border-t border-gray-300 pt-2">
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-500">
              <span>تاریخ:</span>
              {isEditing ? (
                <input
                  type="text"
                  value={contractorSignDate}
                  onChange={(e) => onContractorDateChange(e.target.value)}
                  className="w-24 text-center border-b border-slate-300 focus:outline-none focus:border-indigo-500 py-0.5 text-slate-700"
                  placeholder="۱۴۰۳/۰۶/۲۳"
                />
              ) : (
                <span className="font-medium text-slate-700">{contractorSignDate}</span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">امضا و مهر رسمی مجری</p>
          </div>

          {/* دکمه شبیه‌ساز مهر در پیش‌نمایش */}
          <button
            type="button"
            onClick={() => setHasContractorStamp(!hasContractorStamp)}
            className="no-print mt-2 text-[11px] text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition"
          >
            <Stamp className="w-3 h-3" />
            {hasContractorStamp ? 'حذف مهر مجری' : 'درج مهر آزمایشی مجری'}
          </button>
        </div>
      </div>
    </div>
  );
};
