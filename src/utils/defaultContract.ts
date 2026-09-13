import { ContractData } from '../types';

export const initialContractData: ContractData = {
  contractNumber: '۱۴۰۳/ن-۱۰۸',
  contractDate: '۱۴۰۳/۰۶/۲۳',
  contractCity: 'تهران',
  copiesCount: 2,

  client: {
    name: '',
    nationalId: '',
    phone: '',
    email: '',
    address: '',
    representative: '',
  },

  contractor: {
    name: 'پاشا',
    nationalId: '',
    phone: '',
    email: '',
    address: '',
    representative: 'معمار ارشد نرم‌افزار و رابط کاربری',
  },

  subjectTitle: 'ماده ۱: موضوع قرارداد',
  subjectDescription:
    'توسعه، معماری رابط کاربری (UI/UX) و پیاده‌سازی نرم‌افزار/وب‌سایت طبق پیوست فنی شماره ۱. ساختار دقیق دریافت داده‌ها (API Contract) پیش از توسعه باید مشخص گردد.',
  technicalAnnexReference: 'پیوست فنی شماره ۱ (شامل جزئیات متدولوژی، فریم‌ورک و قرارداد داده‌ها)',
  apiContractNote: 'تعهد دوطرفه بر استاندارد OpenAPI/Swagger جهت اتصال فرانت‌اند به بک‌اند پیش از شروع کدنویسی.',

  totalAmount: 150000000, // 150,000,000 Tomans
  paymentTermsText: 'که در ۳ مرحله طبق فازبندی تحویل واریز می‌گردد.',
  milestones: [
    {
      id: 'm-1',
      title: 'پیش‌پرداخت و شروع معماری اولیه',
      percentage: 30,
      amount: 45000000,
      condition: 'همزمان با امضای قرارداد و دریافت نیازمندی‌های اولیه و دیزاین سیستم',
      dueDate: 'مرحله اول',
    },
    {
      id: 'm-2',
      title: 'تحویل معماری UI و نسخه تعاملی (Alpha)',
      percentage: 40,
      amount: 60000000,
      condition: 'پیاده‌سازی کامپوننت‌ها، معماری روتینگ، هماهنگی با قرارداد API و ارائه دمو',
      dueDate: 'مرحله دوم',
    },
    {
      id: 'm-3',
      title: 'تحویل نهایی، تست و استقرار نهایی',
      percentage: 30,
      amount: 45000000,
      condition: 'تأیید تست نهایی، تحویل ریپازیتوری سورس‌کد و مستندات فنی معماری',
      dueDate: 'مرحله سوم',
    },
  ],

  startDate: '۱۴۰۳/۰۷/۰۱',
  durationMonths: 2,
  endDate: '۱۴۰۳/۰۹/۰۱',
  timelineNotes: 'مدت زمان بازبینی و اعلام نظر کارفرما در پایان هر فاز حداکثر ۵ روز کاری می‌باشد.',

  technicalStack: 'React / Next.js, TypeScript, Tailwind CSS, Component-Driven Design, OpenAPI/Swagger',
  technicalDeliverables: [
    {
      id: 'd-1',
      title: 'معماری و ساختار استاندارد سورس‌کد',
      description: 'طراحی ماژولار مبتنی بر Clean Architecture و رویکرد Feature-based',
      isIncluded: true,
    },
    {
      id: 'd-2',
      title: 'سیستم طراحی و کامپوننت‌های پایدار (Design System)',
      description: 'یکپارچه‌سازی متغیرهای بصری (Tokens)، تایپوگرافی و المان‌های تعاملی',
      isIncluded: true,
    },
    {
      id: 'd-3',
      title: 'قرارداد تبادل داده (API Contract & Client Layer)',
      description: 'تایپ‌های قوی TypeScript برای DTOها و لایه مدیریت State و Cache',
      isIncluded: true,
    },
    {
      id: 'd-4',
      title: 'ریسپانسیو و سازگاری کامل چندسکویی',
      description: 'نمایش صحیح در دسکتاپ، تبلت و موبایل با بهترین عملکرد کاربری',
      isIncluded: true,
    },
    {
      id: 'd-5',
      title: 'مستندات معماری و داکیومنت فنی سورس‌کد',
      description: 'راهنمای نصب، بیلد، پیکربندی متغیرهای محیطی و راهنمای ساختار پروژه',
      isIncluded: true,
    },
  ],

  clientObligations: [
    'تأمین به موقع محتوا، متون، تصاویر و مستندات فنی مورد نیاز پروژه',
    'ارائه به موقع و مستند مشخصات API (API Contract) و مستندات سرویس‌های بک‌اند',
    'بررسی و اعلام تأییدیه یا نظرات اصلاحی هر فاز ظرف حداکثر ۵ روز کاری از تاریخ تحویل',
    'پرداخت به موقع اقساط مالی مطابق ماده ۲ بلافاصله پس از تأیید فاز مربوطه',
  ],

  contractorObligations: [
    'رعایت استانداردهای جهانی مهندسی نرم‌افزار، معماری تمیز و امنیت کد',
    'پیاده‌سازی رابط کاربری مطابق با هویت بصری و پیوست فنی تأیید شده',
    'تحویل سورس‌کد روی مخزن گیت (Git) به همراه مستندات شفاف راهنمای توسعه',
    'پشتیبانی و رفع اشکالات و باگ‌های احتمالی سورس‌کد به مدت مشخص شده در قرارداد',
  ],

  ipAndNdaTerms:
    'کلیه حقوق مادی و معنوی سورس‌کد و معماری پیاده‌سازی شده پس از تسویه حساب کامل مالی متعلق به کارفرما خواهد بود. همچنین طرفین متعهد می‌شوند کلیه اطلاعات تجاری، فنی و داده‌های محرمانه یکدیگر را نزد شخص ثالث افشا ننمایند.',

  warrantyPeriod: '۳ ماه',
  warrantyTerms:
    'مجری متعهد می‌گردد به مدت ۳ ماه پس از تحویل نهایی، کلیه باگ‌ها و خطاهای فنی ناشی از کدنویسی مرتبط با موضوع قرارداد را بدون هزینه اضافی برطرف نماید. (تغییر نیازمندی‌های پایه شامل این بند نمی‌باشد)',

  disputeResolution:
    'در صورت بروز هرگونه اختلاف نظر در تفسیر یا اجرای مفاد قرارداد، موضوع بدواً از طریق مذاکره مسالمت‌آمیز حل و فصل خواهد شد و در صورت عدم توافق، مرجع حل اختلاف سازمان نظام صنفی رایانه‌ای (نصر) یا مراجع صالحه قضایی خواهد بود.',

  additionalNotes:
    'کلیه تغییرات خارج از دامنه پیوست فنی ۱ مستلزم توافق کتبی جداگانه و الحاقیه مالی و زمانی خواهد بود.',

  clientSignDate: '۱۴۰۳/۰۶/۲۳',
  contractorSignDate: '۱۴۰۳/۰۶/۲۳',
  showSignLines: true,
};

export const sampleFilledContract: ContractData = {
  ...initialContractData,
  client: {
    name: 'شرکت فناوری داده‌های نوین آریا (سهامی خاص)',
    nationalId: '۱۰۱۰۲۸۳۴۷۹۱',
    phone: '۰۲۱-۸۸۹۹۰۰۱۱',
    email: 'contact@aria-tech.ir',
    address: 'تهران، خیابان ولیعصر، برج فناوری، طبقه ۷، واحد ۷۰۲',
    representative: 'مهندس محمدرضا شایگان (مدیرعامل)',
  },
  contractor: {
    name: 'پاشا رحیمی',
    nationalId: '۰۰۱۴۸۲۹۳۴۱',
    phone: '۰۹۱۲-۳۴۵-۶۷۸۹',
    email: 'pasha.architect@gmail.com',
    address: 'تهران، سعادت‌آباد، خیابان سرو غربی، پلاک ۱۲',
    representative: 'معمار ارشد نرم‌افزار و مهندس UI/UX',
  },
  totalAmount: 180000000,
  milestones: [
    {
      id: 'm-1',
      title: 'پیش‌پرداخت و طراحی معماری پایه و Design System',
      percentage: 30,
      amount: 54000000,
      condition: 'شروع رسمی پروژه پس از امضا و دریافت وایرفریم‌ها',
      dueDate: 'هفته اول',
    },
    {
      id: 'm-2',
      title: 'معماری هسته، کلاینت API و تحویل پروتوتایپ فعال (MVP)',
      percentage: 40,
      amount: 72000000,
      condition: 'پیاده‌سازی ۵۰ درصد ماژول‌ها و تست اتصال با بک‌اند',
      dueDate: 'پایان ماه اول',
    },
    {
      id: 'm-3',
      title: 'تحویل کامل، مستندات، استقرار و سورس‌کد Git',
      percentage: 30,
      amount: 54000000,
      condition: 'تست نهایی روی سرور دمو و تحویل مستندات معماری',
      dueDate: 'پایان ماه دوم',
    },
  ],
};
