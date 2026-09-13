import React, { useState } from 'react';
import {
  Printer,
  FileCheck,
  Edit3,
  Eye,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  FileText,
} from 'lucide-react';

interface ContractHeaderProps {
  isEditing: boolean;
  onToggleEditMode: () => void;
  onPrint: () => void;
  onLoadSample: () => void;
  onReset: () => void;
  onCopyText: () => void;
  isSaved: boolean;
}

export const ContractHeader: React.FC<ContractHeaderProps> = ({
  isEditing,
  onToggleEditMode,
  onPrint,
  onLoadSample,
  onReset,
  onCopyText,
  isSaved,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyText();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <header className="no-print bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-xs mb-6">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* نشان و عنوان */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-extrabold text-slate-900 leading-tight">
              سامانه تنظیم قرارداد معماری و توسعه نرم‌افزار
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span>نسخه استاندارد مهندسی و UI/UX</span>
              {isSaved && (
                <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  ذخیره خودکار
                </span>
              )}
            </div>
          </div>
        </div>

        {/* دکمه‌های عملیاتی */}
        <div className="flex flex-wrap items-center gap-2">
          {/* تغییر حالت ویرایش / پیش‌نمایش */}
          <button
            type="button"
            onClick={onToggleEditMode}
            className={`px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold flex items-center gap-1.5 transition ${
              isEditing
                ? 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
                : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
            }`}
            title="تغییر حالت بین ویرایش محتوا و پیش‌نمایش نهایی"
          >
            {isEditing ? (
              <>
                <Eye className="w-4 h-4 text-amber-600" />
                <span>مشاهده پیش‌نمایش</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 text-slate-600" />
                <span>حالت ویرایش</span>
              </>
            )}
          </button>

          {/* بارگذاری نمونه آماده */}
          <button
            type="button"
            onClick={onLoadSample}
            className="px-3 py-2 rounded-lg text-xs md:text-sm text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 transition font-medium"
            title="تکمیل خودکار فرم با اطلاعات تستی برای مشاهده سریع"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">داده نمونه</span>
          </button>

          {/* کپی متن */}
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-2 rounded-lg text-xs md:text-sm text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 transition font-medium"
            title="کپی کردن کل متن قرارداد در حافظه کلیپ‌بورد"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">کپی شد!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">کپی متن</span>
              </>
            )}
          </button>

          {/* بازنشانی */}
          <button
            type="button"
            onClick={onReset}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 border border-transparent transition"
            title="بازنشانی اطلاعات به حالت پیش‌فرض"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* دکمه اصلی چاپ / خروجی PDF */}
          <button
            type="button"
            onClick={onPrint}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium text-xs md:text-sm shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
            title="چاپ یا ذخیره به عنوان فایل PDF"
          >
            <Printer className="w-4 h-4" />
            <span>چاپ / خروجی PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};
