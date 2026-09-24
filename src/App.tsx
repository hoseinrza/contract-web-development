import React, { useState, useEffect } from 'react';
import { ContractData } from './types';
import { initialContractData, sampleFilledContract } from './utils/defaultContract';
import { generateContractPlainText } from './utils/contractTextExport';
import { ContractHeader } from './components/ContractHeader';
import { ContractDocument } from './components/ContractDocument';
import { Info, Printer, Shield, CheckCircle } from 'lucide-react';

const STORAGE_KEY = 'fa_software_contract_data_v1';

export default function App() {
  const [data, setData] = useState<ContractData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return initialContractData;
  });

  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  // Auto-save to localStorage with notification
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setIsSaved(true);
      const timer = setTimeout(() => setIsSaved(false), 3000);
      return () => clearTimeout(timer);
    } catch {
      // ignore
    }
  }, [data]);

  const handleUpdate = <K extends keyof ContractData>(
    field: K,
    value: ContractData[K]
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLoadSample = () => {
    setData(sampleFilledContract);
  };

  const handleReset = () => {
    if (window.confirm('آیا مایلید تمام فیلدهای قرارداد به حالت اولیه بازگردانی شوند؟')) {
      setData(initialContractData);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleCopyText = async () => {
    const text = generateContractPlainText(data);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for clipboard
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-16 print:bg-white print:p-0 print:pb-0 font-['B_Nazanin',Tahoma,sans-serif]">
      {/* هدر کنترل‌های برنامه (در زمان پرینت مخفی می‌شود) */}
      <ContractHeader
        isEditing={isEditing}
        onToggleEditMode={() => setIsEditing(!isEditing)}
        onPrint={handlePrint}
        onLoadSample={handleLoadSample}
        onReset={handleReset}
        onCopyText={handleCopyText}
        isSaved={isSaved}
      />

      <main className="px-3 md:px-6 print:px-0">
        {/* راهنمای سریع بالای سند (فقط در حالت وب) */}
        <div className="no-print max-w-4xl mx-auto mb-4 bg-indigo-50/80 border border-indigo-200/70 p-3 rounded-xl flex items-center justify-between text-xs text-indigo-900 gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              {isEditing
                ? 'شما در حالت ویرایش مستقیم قرار دارید؛ روی هر فیلد، مبلغ یا متن کلیک کرده و مستقیماً تغییر دهید.'
                : 'در حالت پیش‌نمایش قرار دارید. برای چاپ یا ذخیره PDF دکمه چاپ را بزنید.'}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-indigo-700 font-medium">
            <Shield className="w-3.5 h-3.5 text-indigo-600" />
            <span>مطابق ماده ۱۰ قانون مدنی و استانداردهای نصر</span>
          </div>
        </div>

        {/* بدنه سند قرارداد (A4 Sheet Presentation) */}
        <ContractDocument
          data={data}
          isEditing={isEditing}
          onUpdate={handleUpdate}
          onPrint={handlePrint}
        />

        {/* راهنمای چاپ استاندارد برای مرورگر */}
        <footer className="no-print max-w-4xl mx-auto mt-8 text-center text-xs text-slate-500 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600">
            <span className="flex items-center gap-1">
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <strong>نکته خروجی PDF:</strong> در پنجره چاپ مرورگر، گزینه{' '}
              <span className="text-slate-800 font-medium dir-ltr inline-block">"Headers and Footers"</span> را غیرفعال کنید.
            </span>
            <span>•</span>
            <span>اندازه صفحه: <strong>A4</strong></span>
            <span>•</span>
            <span>حاشیه‌ها (Margins): <strong>Default یا Minimum</strong></span>
          </div>
          <p className="text-slate-400 text-[11px]">
            طراحی شده بر اساس ساختار استاندارد معماری رابط کاربری (UI/UX) و مهندسی نرم‌افزار
          </p>
        </footer>
      </main>
    </div>
  );
}
