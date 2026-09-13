import { ContractData } from '../types';
import { formatCurrencyToman, numberToPersianWords, toPersianDigits } from './persianNumbers';

export function generateContractPlainText(data: ContractData): string {
  const words = numberToPersianWords(data.totalAmount);

  return `بسمه تعالی
قرارداد جامع معماری و توسعه نرم‌افزار
شماره قرارداد: ${data.contractNumber} | تاریخ: ${data.contractDate} | محل انعقاد: ${data.contractCity}

این قرارداد بر اساس ماده ۱۰ قانون مدنی جمهوری اسلامی ایران، بین طرفین زیر منعقد می‌گردد:

۱. طرف اول (کارفرما):
- نام / شرکت: ${data.client.name || '.....................'}
- کد / شناسه ملی: ${data.client.nationalId || '.....................'}
- شماره تماس: ${data.client.phone || '.....................'}
${data.client.representative ? `- نماینده قانونی: ${data.client.representative}\n` : ''}${data.client.address ? `- نشانی: ${data.client.address}\n` : ''}

۲. طرف دوم (مجری / معمار UI):
- نام / شرکت: ${data.contractor.name || 'پاشا'}
- کد / شناسه ملی: ${data.contractor.nationalId || '.....................'}
- شماره تماس: ${data.contractor.phone || '.....................'}
${data.contractor.representative ? `- سمت / تخصص: ${data.contractor.representative}\n` : ''}${data.contractor.address ? `- نشانی: ${data.contractor.address}\n` : ''}

ماده ۱: موضوع قرارداد
${data.subjectDescription}
پشته فناوری: ${data.technicalStack}

ماده ۲: مبلغ قرارداد و شرایط پرداخت
مبلغ کل قرارداد برابر است با ${formatCurrencyToman(data.totalAmount)} تومان وجه رایج کشور (معادل ${words} تومان) ${data.paymentTermsText}

مراحل پرداخت:
${data.milestones
  .map(
    (m, i) =>
      `${toPersianDigits(i + 1)}. ${m.title} (${toPersianDigits(m.percentage)}٪) به مبلغ ${formatCurrencyToman(
        m.amount
      )} تومان - شرط پرداخت: ${m.condition}`
  )
  .join('\n')}

ماده ۳: مدت زمان قرارداد
از تاریخ ${data.startDate} لغایت ${data.endDate} به مدت ${data.durationMonths} ماه شمسی. ${data.timelineNotes}

ماده ۴: تعهدات طرفین
الف) تعهدات کارفرما:
${data.clientObligations.map((o) => `- ${o}`).join('\n')}

ب) تعهدات مجری:
${data.contractorObligations.map((o) => `- ${o}`).join('\n')}

ماده ۵: مالکیت معنوی، سورس‌کد و محرمانگی (NDA)
${data.ipAndNdaTerms}

ماده ۶: گارانتی و پشتیبانی
${data.warrantyTerms}

ماده ۷: حل اختلاف
${data.disputeResolution}

توضیحات تکمیلی / الحاقیه:
${data.additionalNotes || 'موردی قید نشده است.'}

مهر و امضای کارفرما                                     مهر و امضای مجری
تاریخ: ${data.clientSignDate}                                 تاریخ: ${data.contractorSignDate}
`;
}
