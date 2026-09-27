import { ToolDef, ToolCategory, Language } from '../types';

export interface CategoryItem {
  id: ToolCategory;
  label: string;
}

export interface ToolLocaleData {
  title: string;
  shortDesc: string;
  fullDesc: string;
}

export const TOOL_LOCALES: Record<string, Record<Language, ToolLocaleData>> = {
  'merge-pdf': {
    en: {
      title: 'Merge PDF',
      shortDesc: 'Combine multiple PDF files into a single unified document.',
      fullDesc: 'Combine two or more PDF documents into a single unified file with an intuitive visual sequence you can rearrange.',
    },
    id: {
      title: 'Merge PDF',
      shortDesc: 'Menggabungkan beberapa file PDF menjadi satu dokumen berurutan.',
      fullDesc: 'Gabungkan dua atau lebih dokumen PDF menjadi satu berkas terpadu dengan susunan halaman yang dapat diatur ulang sesuai keinginan Anda.',
    },
  },
  'split-pdf': {
    en: {
      title: 'Split PDF',
      shortDesc: 'Separate PDF into multiple files or specific page ranges.',
      fullDesc: 'Split large PDF documents into individual page files inside a ZIP archive or extract targeted page ranges (e.g., 1-3, 5) instantly.',
    },
    id: {
      title: 'Split PDF',
      shortDesc: 'Memisahkan PDF menjadi beberapa file atau halaman tertentu.',
      fullDesc: 'Pisahkan dokumen PDF besar menjadi halaman individual berformat ZIP atau ambil rentang halaman spesifik (misal: 1-3, 5) secara instan.',
    },
  },
  'compress-pdf': {
    en: {
      title: 'Compress PDF',
      shortDesc: 'Reduce PDF file size without sacrificing readability.',
      fullDesc: 'Shrink PDF weight for easy sending via email or messaging apps with automatic compression tiers and preserved privacy.',
    },
    id: {
      title: 'Compress PDF',
      shortDesc: 'Mengurangi ukuran file PDF tanpa menurunkan keterbacaan dokumen.',
      fullDesc: 'Kecilkan bobot file PDF agar mudah dikirim via email atau WhatsApp dengan pilihan tingkat kompresi otomatis dan privasi terjaga.',
    },
  },
  'pdf-to-word': {
    en: {
      title: 'PDF to Word',
      shortDesc: 'Convert PDF documents into editable Microsoft Word (.docx).',
      fullDesc: 'Extract text content and layout structure from PDF files into Microsoft Word (.docx) documents ready for easy editing.',
    },
    id: {
      title: 'PDF to Word',
      shortDesc: 'Konversi dokumen PDF menjadi file Microsoft Word (.docx).',
      fullDesc: 'Ubah teks dan struktur dari berkas PDF menjadi dokumen Microsoft Word (.docx) yang dapat disunting kembali dengan mudah.',
    },
  },
  'pdf-to-excel': {
    en: {
      title: 'PDF to Excel',
      shortDesc: 'Extract tables and data from PDF to Excel spreadsheets (.xlsx).',
      fullDesc: 'Pull table rows, numerical metrics, and columns from PDF documents directly into Microsoft Excel (.xlsx) workbooks.',
    },
    id: {
      title: 'PDF to Excel',
      shortDesc: 'Ekstrak tabel dan data dari PDF ke spreadsheet Excel (.xlsx).',
      fullDesc: 'Tarik baris tabel, data numerik, dan kolom dari dokumen PDF langsung ke dalam lembar kerja Microsoft Excel (.xlsx).',
    },
  },
  'pdf-to-powerpoint': {
    en: {
      title: 'PDF to PowerPoint',
      shortDesc: 'Transform PDF pages into PowerPoint slides (.pptx).',
      fullDesc: 'Convert each page of your presentation PDF into editable Microsoft PowerPoint (.pptx) slides ready for presentations.',
    },
    id: {
      title: 'PDF to PowerPoint',
      shortDesc: 'Ubah halaman PDF menjadi slide presentasi PowerPoint (.pptx).',
      fullDesc: 'Konversi setiap halaman dokumen presentasi PDF Anda menjadi slide presentasi Microsoft PowerPoint (.pptx) yang siap dipresentasikan.',
    },
  },
  'pdf-to-jpg': {
    en: {
      title: 'PDF to JPG',
      shortDesc: 'Convert PDF pages into high-resolution JPG images.',
      fullDesc: 'Extract each page of your PDF file into crisp JPG images. Download per page or all together in a single ZIP file.',
    },
    id: {
      title: 'PDF to JPG',
      shortDesc: 'Mengubah halaman PDF menjadi gambar resolusi tinggi (JPG).',
      fullDesc: 'Ekstrak tiap halaman dokumen PDF ke gambar JPG berkualitas tinggi. Unduh gambar per halaman atau seluruhnya dalam satu arsip ZIP.',
    },
  },
  'jpg-to-pdf': {
    en: {
      title: 'JPG to PDF',
      shortDesc: 'Convert photos or scans into a clean PDF document.',
      fullDesc: 'Combine JPG, PNG, or WebP images into a single formatted A4 PDF file with auto orientation and neat margins.',
    },
    id: {
      title: 'JPG to PDF',
      shortDesc: 'Mengubah gambar foto atau scan menjadi dokumen PDF rapi.',
      fullDesc: 'Satukan file JPG, PNG, atau WebP menjadi satu dokumen PDF standar A4 dengan orientasi otomatis atau margin yang rapi.',
    },
  },
  'word-to-pdf': {
    en: {
      title: 'Word to PDF',
      shortDesc: 'Convert Microsoft Word (.docx) documents into PDF.',
      fullDesc: 'Convert Microsoft Word (.docx) files into clean, portable PDF documents with fixed layout formatting across all devices.',
    },
    id: {
      title: 'Word to PDF',
      shortDesc: 'Mengubah dokumen Word (.docx) menjadi file PDF berkualitas.',
      fullDesc: 'Ubah file dokumen teks Microsoft Word (.docx) menjadi dokumen PDF portabel yang tata letaknya tidak akan bergeser di perangkat mana pun.',
    },
  },
  'powerpoint-to-pdf': {
    en: {
      title: 'PowerPoint to PDF',
      shortDesc: 'Convert presentation slides (.pptx) into PDF documents.',
      fullDesc: 'Transform PowerPoint (.pptx) slide decks into landscape PDF files ready for printing and seamless distribution.',
    },
    id: {
      title: 'PowerPoint to PDF',
      shortDesc: 'Mengubah slide presentasi (.pptx) menjadi dokumen PDF.',
      fullDesc: 'Konversi deck presentasi PowerPoint (.pptx) Anda menjadi berkas PDF lanskap siap cetak dan mudah dibagikan kepada peserta.',
    },
  },
  'excel-to-pdf': {
    en: {
      title: 'Excel to PDF',
      shortDesc: 'Convert Excel spreadsheets (.xlsx) into PDF documents.',
      fullDesc: 'Print spreadsheet worksheets (.xlsx, .xls, .csv) into structured PDF tables with clear border lines and zebra shading.',
    },
    id: {
      title: 'Excel to PDF',
      shortDesc: 'Mengubah lembar kerja Excel (.xlsx) menjadi dokumen PDF.',
      fullDesc: 'Cetak lembar kerja spreadsheet Excel (.xlsx/.xls/.csv) menjadi dokumen PDF dengan tabel bergaris yang mudah dibaca.',
    },
  },
  'html-to-pdf': {
    en: {
      title: 'HTML to PDF',
      shortDesc: 'Convert HTML code or web templates into formatted PDF.',
      fullDesc: 'Render HTML code, receipt templates, invoice formats, or resumes into professional printable PDF documents.',
    },
    id: {
      title: 'HTML to PDF',
      shortDesc: 'Mengubah halaman atau kode HTML menjadi berkas PDF rapi.',
      fullDesc: 'Konversi kode HTML, format struk, faktur invoice, atau template resume menjadi dokumen PDF profesional siap cetak.',
    },
  },
  'edit-pdf': {
    en: {
      title: 'Edit PDF',
      shortDesc: 'Add text, notes, annotations, or stamps to PDF pages.',
      fullDesc: 'Place custom text notes, headers, dates, or verification stamps anywhere on your PDF document pages.',
    },
    id: {
      title: 'Edit PDF',
      shortDesc: 'Menambahkan teks, catatan, gambar, atau anotasi ke dokumen PDF.',
      fullDesc: 'Bubuhkan teks keterangan, catatan kaki, tanggal, atau stempel informasi tambahan langsung ke halaman dokumen PDF Anda.',
    },
  },
  'sign-pdf': {
    en: {
      title: 'Sign PDF',
      shortDesc: 'Add electronic or digital signatures to PDF documents.',
      fullDesc: 'Draw signatures directly with smooth strokes, select ink colors, or upload initials images to stamp on target pages.',
    },
    id: {
      title: 'Sign PDF',
      shortDesc: 'Menambahkan tanda tangan elektronik basah atau digital ke PDF.',
      fullDesc: 'Gambar tanda tangan langsung dengan kuas halus, pilih warna tinta, atau unggah gambar paraf untuk ditempelkan di halaman dokumen.',
    },
  },
  'watermark-pdf': {
    en: {
      title: 'Watermark PDF',
      shortDesc: 'Add custom text watermarks with opacity and diagonal rotation.',
      fullDesc: 'Stamp watermarks (CONFIDENTIAL, DRAFT, COPY, or custom text) with opacity controls, font sizing, and 45° rotation.',
    },
    id: {
      title: 'Watermark PDF',
      shortDesc: 'Menambahkan watermark teks atau logo perlindungan hak cipta.',
      fullDesc: 'Beri tanda air (RAHASIA, DRAF, COPY, atau teks khusus) dengan kontrol transparansi, ukuran font, rotasi diagonal 45°, dan posisi repetitif.',
    },
  },
  'rotate-pdf': {
    en: {
      title: 'Rotate PDF',
      shortDesc: 'Rotate PDF pages (90°, 180°, 270°) individually or all at once.',
      fullDesc: 'Fix upside-down scans or adjust portrait and landscape orientations across your entire PDF or on specific pages.',
    },
    id: {
      title: 'Rotate PDF',
      shortDesc: 'Memutar orientasi halaman PDF (90°, 180°, 270°) per halaman atau semua.',
      fullDesc: 'Putar balik halaman yang terbalik hasil scan atau lanskap menjadi potret dengan rotasi per halaman atau serentak ke seluruh dokumen.',
    },
  },
  'organize-pdf': {
    en: {
      title: 'Organize PDF',
      shortDesc: 'Rearrange, reorder, or resequence PDF pages visually.',
      fullDesc: 'Drag and reorder pages visually with interactive thumbnail previews so your document order is perfect.',
    },
    id: {
      title: 'Organize PDF',
      shortDesc: 'Mengatur ulang urutan lembar halaman dokumen secara visual.',
      fullDesc: 'Pindahkan posisi halaman maju atau mundur secara visual dengan antarmuka thumbnail interaktif agar urutan dokumen tertata sempurna.',
    },
  },
  'remove-pages': {
    en: {
      title: 'Remove Pages',
      shortDesc: 'Delete unwanted, blank, or sensitive pages from your PDF.',
      fullDesc: 'Select specific blank or unwanted pages to permanently delete and download a clean PDF.',
    },
    id: {
      title: 'Remove Pages',
      shortDesc: 'Menghapus halaman tertentu yang tidak diinginkan dari PDF.',
      fullDesc: 'Pilih lembar halaman kosong, salah cetak, atau halaman sensitif untuk dihapus secara permanen dan unduh versi PDF yang bersih.',
    },
  },
  'extract-pages': {
    en: {
      title: 'Extract Pages',
      shortDesc: 'Extract specific pages from a PDF into a new standalone document.',
      fullDesc: 'Select key pages (such as summary sheets or specific exhibits) and export them into a separate new PDF.',
    },
    id: {
      title: 'Extract Pages',
      shortDesc: 'Mengambil dan memisahkan halaman pilihan menjadi dokumen PDF baru.',
      fullDesc: 'Ambil lembar dokumen penting (misalnya halaman rangkuman atau lampiran spesifik) dan simpan sebagai satu file PDF baru yang ringkas.',
    },
  },
  'crop-pdf': {
    en: {
      title: 'Crop PDF',
      shortDesc: 'Trim page margins and white borders with precision.',
      fullDesc: 'Trim extra white border margins on PDF pages for a focused layout when printing or viewing on digital screens.',
    },
    id: {
      title: 'Crop PDF',
      shortDesc: 'Memotong area margin atau batas tepi halaman PDF.',
      fullDesc: 'Potong batas tepi putih berlebih pada halaman PDF agar konten fokus dan terlihat lebih pas saat dicetak atau dibaca di layar digital.',
    },
  },
};

export const TOOL_BASE_CONFIGS: Omit<ToolDef, 'title' | 'shortDesc' | 'fullDesc'>[] = [
  {
    id: 'merge-pdf',
    icon: 'Merge',
    category: 'organize',
    accentColor: '#3b82f6',
    accept: '.pdf,application/pdf',
    multiple: true,
  },
  {
    id: 'split-pdf',
    icon: 'Split',
    category: 'organize',
    accentColor: '#8b5cf6',
    accept: '.pdf,application/pdf',
    multiple: false,
  },
  {
    id: 'compress-pdf',
    icon: 'Minimize2',
    category: 'optimize',
    accentColor: '#10b981',
    accept: '.pdf,application/pdf',
    multiple: false,
  },
  {
    id: 'pdf-to-word',
    icon: 'FileText',
    category: 'convert-from',
    accentColor: '#2563eb',
    accept: '.pdf,application/pdf',
    multiple: false,
  },
  {
    id: 'pdf-to-excel',
    icon: 'Table',
    category: 'convert-from',
    accentColor: '#059669',
    accept: '.pdf,application/pdf',
    multiple: false,
  },
  {
    id: 'pdf-to-powerpoint',
    icon: 'Presentation',
    category: 'convert-from',
    accentColor: '#ea580c',
    accept: '.pdf,application/pdf',
    multiple: false,
  },
  {
    id: 'pdf-to-jpg',
    icon: 'Image',
    category: 'convert-from',
    accentColor: '#d97706',
    accept: '.pdf,application/pdf',
    multiple: false,
  },
  {
    id: 'jpg-to-pdf',
    icon: 'FileImage',
    category: 'convert-to',
    accentColor: '#f43f5e',
    accept: 'image/jpeg,image/png,image/webp,image/jpg',
    multiple: true,
  },
  {
    id: 'word-to-pdf',
    icon: 'FileUp',
    category: 'convert-to',
    accentColor: '#0284c7',
    accept: '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    multiple: false,
  },
  {
    id: 'powerpoint-to-pdf',
    icon: 'MonitorPlay',
    category: 'convert-to',
    accentColor: '#f97316',
    accept: '.pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation',
    multiple: false,
  },
  {
    id: 'excel-to-pdf',
    icon: 'FileSpreadsheet',
    category: 'convert-to',
    accentColor: '#16a34a',
    accept: '.xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    multiple: false,
  },
  {
    id: 'html-to-pdf',
    icon: 'Code2',
    category: 'convert-to',
    accentColor: '#06b6d4',
    accept: '.html,.htm,text/html',
    multiple: false,
  },
  {
    id: 'edit-pdf',
    icon: 'Edit3',
    category: 'edit-manage',
    accentColor: '#ec4899',
    accept: '.pdf,application/pdf',
    multiple: false,
  },
  {
    id: 'sign-pdf',
    icon: 'PenLine',
    category: 'edit-manage',
    accentColor: '#6366f1',
    accept: '.pdf,application/pdf',
    multiple: false,
  },
  {
    id: 'watermark-pdf',
    icon: 'Stamp',
    category: 'edit-manage',
    accentColor: '#14b8a6',
    accept: '.pdf,application/pdf',
    multiple: false,
  },
  {
    id: 'rotate-pdf',
    icon: 'RotateCw',
    category: 'edit-manage',
    accentColor: '#f59e0b',
    accept: '.pdf,application/pdf',
    multiple: false,
  },
  {
    id: 'organize-pdf',
    icon: 'LayoutGrid',
    category: 'organize',
    accentColor: '#8b5cf6',
    accept: '.pdf,application/pdf',
    multiple: false,
  },
  {
    id: 'remove-pages',
    icon: 'FileX',
    category: 'organize',
    accentColor: '#ef4444',
    accept: '.pdf,application/pdf',
    multiple: false,
  },
  {
    id: 'extract-pages',
    icon: 'Copy',
    category: 'organize',
    accentColor: '#3b82f6',
    accept: '.pdf,application/pdf',
    multiple: false,
  },
  {
    id: 'crop-pdf',
    icon: 'Crop',
    category: 'optimize',
    accentColor: '#10b981',
    accept: '.pdf,application/pdf',
    multiple: false,
  },
];

export function getLocalizedTools(lang: Language = 'en'): ToolDef[] {
  return TOOL_BASE_CONFIGS.map((cfg) => {
    const locale = TOOL_LOCALES[cfg.id]?.[lang] || TOOL_LOCALES[cfg.id]?.['en'];
    return {
      ...cfg,
      title: locale?.title || cfg.id,
      shortDesc: locale?.shortDesc || '',
      fullDesc: locale?.fullDesc || '',
    };
  });
}

export function getLocalizedCategories(lang: Language = 'en'): CategoryItem[] {
  if (lang === 'id') {
    return [
      { id: 'all', label: 'Semua Alat (20)' },
      { id: 'edit-manage', label: '✏️ Edit & Kelola' },
      { id: 'organize', label: 'Organisasi Halaman' },
      { id: 'convert-from', label: 'Konversi dari PDF' },
      { id: 'convert-to', label: 'Konversi ke PDF' },
      { id: 'optimize', label: 'Optimalisasi' },
    ];
  }
  return [
    { id: 'all', label: 'All Tools (20)' },
    { id: 'edit-manage', label: '✏️ Edit & Manage' },
    { id: 'organize', label: 'Page Organization' },
    { id: 'convert-from', label: 'Convert from PDF' },
    { id: 'convert-to', label: 'Convert to PDF' },
    { id: 'optimize', label: 'Optimization' },
  ];
}

export function getLocalizedCategoryLabel(category: ToolCategory, lang: Language = 'en'): string {
  const map: Record<Language, Record<ToolCategory, string>> = {
    en: {
      all: 'All Tools',
      'edit-manage': 'Edit & Manage',
      organize: 'Organize Pages',
      'convert-from': 'Convert from PDF',
      'convert-to': 'Convert to PDF',
      optimize: 'Optimization',
    },
    id: {
      all: 'Semua Alat',
      'edit-manage': 'Edit & Kelola PDF',
      organize: 'Organisasi Dokumen',
      'convert-from': 'Konversi dari PDF',
      'convert-to': 'Konversi ke PDF',
      optimize: 'Optimalisasi',
    },
  };
  return map[lang]?.[category] || category;
}

export const TOOL_BADGES: Record<string, Record<Language, { label: string; bg: string; text: string }>> = {
  'edit-pdf': {
    en: { label: 'Text & Notes', bg: 'bg-pink-500/15', text: 'text-pink-300' },
    id: { label: 'Teks & Catatan', bg: 'bg-pink-500/15', text: 'text-pink-300' },
  },
  'sign-pdf': {
    en: { label: 'Digital Sign', bg: 'bg-indigo-500/15', text: 'text-indigo-300' },
    id: { label: 'TTD Digital', bg: 'bg-indigo-500/15', text: 'text-indigo-300' },
  },
  'watermark-pdf': {
    en: { label: 'Watermark', bg: 'bg-teal-500/15', text: 'text-teal-300' },
    id: { label: 'Cap Air', bg: 'bg-teal-500/15', text: 'text-teal-300' },
  },
  'crop-pdf': {
    en: { label: 'Precision Trim', bg: 'bg-emerald-500/15', text: 'text-emerald-300' },
    id: { label: 'Margin Presisi', bg: 'bg-emerald-500/15', text: 'text-emerald-300' },
  },
  'merge-pdf': {
    en: { label: 'Most Popular', bg: 'bg-blue-500/15', text: 'text-blue-300' },
    id: { label: 'Paling Dicari', bg: 'bg-blue-500/15', text: 'text-blue-300' },
  },
  'split-pdf': {
    en: { label: 'Split Files', bg: 'bg-purple-500/15', text: 'text-purple-300' },
    id: { label: 'Pisah Berkas', bg: 'bg-purple-500/15', text: 'text-purple-300' },
  },
  'rotate-pdf': {
    en: { label: '360° Rotate', bg: 'bg-amber-500/15', text: 'text-amber-300' },
    id: { label: 'Rotasi 360°', bg: 'bg-amber-500/15', text: 'text-amber-300' },
  },
  'organize-pdf': {
    en: { label: 'Visual Order', bg: 'bg-purple-500/15', text: 'text-purple-300' },
    id: { label: 'Visual Urutan', bg: 'bg-purple-500/15', text: 'text-purple-300' },
  },
  'remove-pages': {
    en: { label: 'Delete Pages', bg: 'bg-rose-500/15', text: 'text-rose-300' },
    id: { label: 'Hapus Halaman', bg: 'bg-rose-500/15', text: 'text-rose-300' },
  },
  'extract-pages': {
    en: { label: 'Extract Pages', bg: 'bg-sky-500/15', text: 'text-sky-300' },
    id: { label: 'Ekstrak Berkas', bg: 'bg-sky-500/15', text: 'text-sky-300' },
  },
  'pdf-to-word': {
    en: { label: 'To DOCX', bg: 'bg-blue-500/15', text: 'text-blue-300' },
    id: { label: 'Ke DOCX', bg: 'bg-blue-500/15', text: 'text-blue-300' },
  },
  'pdf-to-excel': {
    en: { label: 'To XLSX', bg: 'bg-emerald-500/15', text: 'text-emerald-300' },
    id: { label: 'Ke XLSX', bg: 'bg-emerald-500/15', text: 'text-emerald-300' },
  },
  'pdf-to-powerpoint': {
    en: { label: 'To PPTX', bg: 'bg-orange-500/15', text: 'text-orange-300' },
    id: { label: 'Ke PPTX', bg: 'bg-orange-500/15', text: 'text-orange-300' },
  },
  'pdf-to-jpg': {
    en: { label: 'Extract Images', bg: 'bg-amber-500/15', text: 'text-amber-300' },
    id: { label: 'Ekstrak Gambar', bg: 'bg-amber-500/15', text: 'text-amber-300' },
  },
  'compress-pdf': {
    en: { label: 'Shrink Size', bg: 'bg-emerald-500/15', text: 'text-emerald-300' },
    id: { label: 'Kecilkan MB', bg: 'bg-emerald-500/15', text: 'text-emerald-300' },
  },
  'jpg-to-pdf': {
    en: { label: 'Photos to PDF', bg: 'bg-rose-500/15', text: 'text-rose-300' },
    id: { label: 'Foto ke PDF', bg: 'bg-rose-500/15', text: 'text-rose-300' },
  },
  'word-to-pdf': {
    en: { label: 'DOCX to PDF', bg: 'bg-sky-500/15', text: 'text-sky-300' },
    id: { label: 'DOCX ke PDF', bg: 'bg-sky-500/15', text: 'text-sky-300' },
  },
  'powerpoint-to-pdf': {
    en: { label: 'PPTX to PDF', bg: 'bg-orange-500/15', text: 'text-orange-300' },
    id: { label: 'PPTX ke PDF', bg: 'bg-orange-500/15', text: 'text-orange-300' },
  },
  'excel-to-pdf': {
    en: { label: 'XLSX to PDF', bg: 'bg-emerald-500/15', text: 'text-emerald-300' },
    id: { label: 'XLSX ke PDF', bg: 'bg-emerald-500/15', text: 'text-emerald-300' },
  },
  'html-to-pdf': {
    en: { label: 'Web to PDF', bg: 'bg-cyan-500/15', text: 'text-cyan-300' },
    id: { label: 'Web ke PDF', bg: 'bg-cyan-500/15', text: 'text-cyan-300' },
  },
};

// Default English collections for backwards-compatibility
export const PDF_TOOLS: ToolDef[] = getLocalizedTools('en');
export const CATEGORIES: CategoryItem[] = getLocalizedCategories('en');
