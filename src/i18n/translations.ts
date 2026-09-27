import { ToolDef, ToolCategory, Language } from '../types';

export interface CategoryItem {
  id: ToolCategory;
  label: string;
}

export interface TranslationSchema {
  // Navigation & Dropdown
  nav: {
    featuresDropdown: string;
    toolsBadge: string;
    advantages: string;
    howItWorks: string;
    faq: string;
    brandIdea: string;
    brandIdeaShort: string;
    getStarted: string;
    catalogTitle: string;
    catalogSubtitle: string;
    searchPlaceholder: string;
    filterLabel: string;
    filterAll: string;
    filterEdit: string;
    filterOrganize: string;
    filterFromPdf: string;
    filterToPdf: string;
    noToolsMatch: string;
    showAllTools: string;
    colEdit: string;
    colOrganize: string;
    colFromPdf: string;
    colToPdf: string;
    privacyNotice: string;
    viewCatalogPage: string;
    toolsCount: string;
    mobileSelectTool: string;
  };

  // Hero Section
  hero: {
    kickerSolution: string;
    kickerFree: string;
    kickerPrivacy: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    clearSearch: string;
    mostUsed: string;
    trustPrivacyTitle: string;
    trustPrivacyDesc: string;
    trustFreeTitle: string;
    trustFreeDesc: string;
    trustFastTitle: string;
    trustFastDesc: string;
  };

  // Catalog Grid Section
  catalog: {
    sectionTitle: string;
    sectionSubtitle: string;
    showingCount: (count: number) => string;
    emptyTitle: string;
    emptyDesc: string;
    resetFilter: string;
    useTool: string;
    openTool: string;
    freeBadge: string;
  };

  // Active Tool Workspace
  workspace: {
    backToCatalog: string;
    secureMode: string;
    changeFile: string;
    failedProcess: string;
    dropzoneTitle: string;
    dropzoneMultiple: string;
    dropzoneSingle: string;
    selectFileBtn: string;
    htmlEditorTitle: string;
    quickTemplates: string;
    tplInvoice: string;
    tplOfficialLetter: string;
    tplResume: string;
    htmlPlaceholder: string;
    orUploadHtml: string;
    chooseHtmlFile: string;
    selectedFilesTitle: (count: number) => string;
    addMoreFiles: string;
    moveUp: string;
    moveDown: string;
    removeFile: string;
    loadingThumbnails: string;
    
    // Tool Specific Option Panels
    editSettingsTitle: string;
    editTextLabel: string;
    editPositionLabel: string;
    editFontSizeLabel: string;
    editColorLabel: string;
    editBoxLabel: string;
    posTopRight: string;
    posTopLeft: string;
    posCenter: string;
    posBottomRight: string;
    posBottomLeft: string;
    fontSmall: string;
    fontMedium: string;
    fontLarge: string;
    fontExtraLarge: string;

    signSettingsTitle: string;
    signDrawTab: string;
    signUploadTab: string;
    signInkLabel: string;
    signInkBlack: string;
    signInkBlue: string;
    signInkRed: string;
    signThicknessLabel: string;
    signClear: string;
    signDrawHint: string;
    signDrawSubhint: string;
    signUploadHint: string;
    signUploadSubhint: string;
    signChooseImage: string;
    signPositionLabel: string;
    signPageLabel: string;
    signPosBottomRight: string;
    signPosBottomLeft: string;
    signPosCenter: string;
    signPageFirst: string;
    signPageLast: string;
    signPageNum: (n: number) => string;
    signDateToggle: string;

    watermarkSettingsTitle: string;
    watermarkTextLabel: string;
    watermarkOpacityLabel: (pct: number) => string;
    watermarkSizeLabel: (pt: number) => string;
    watermarkAngleLabel: string;
    watermarkDiagonal: string;
    watermarkHorizontal: string;

    rotateSettingsTitle: string;
    rotateAllBtn: (deg: number) => string;
    rotateThumbnailHint: string;
    rotatePageNum: (n: number) => string;

    organizeSettingsTitle: string;
    organizeReset: string;
    organizePageNum: (pos: number) => string;
    organizeOriginalPage: (n: number) => string;

    removeSettingsTitle: string;
    removeMarkedCount: (count: number) => string;
    removePageNum: (n: number) => string;

    extractSettingsTitle: string;
    extractSelectAll: string;
    extractClear: string;
    extractPageNum: (n: number) => string;

    cropSettingsTitle: string;
    cropTop: (pct: number) => string;
    cropBottom: (pct: number) => string;
    cropLeft: (pct: number) => string;
    cropRight: (pct: number) => string;
    cropVisualArea: string;

    splitSettingsTitle: string;
    splitAllOptionTitle: string;
    splitAllOptionDesc: string;
    splitRangeOptionTitle: string;
    splitRangeOptionDesc: string;
    splitRangeLabel: string;

    compressSettingsTitle: string;
    compressLowTitle: string;
    compressLowDesc: string;
    compressMedTitle: string;
    compressMedDesc: string;
    compressHighTitle: string;
    compressHighDesc: string;

    jpgToPdfSettingsTitle: string;
    jpgOrientationLabel: string;
    jpgMarginLabel: string;
    orientationAuto: string;
    orientationPortrait: string;
    orientationLandscape: string;
    marginNone: string;
    marginSmall: string;
    marginNormal: string;

    // Action Trigger Buttons
    actionMerge: string;
    actionSplit: string;
    actionCompress: string;
    actionPdfToWord: string;
    actionPdfToExcel: string;
    actionPdfToPpt: string;
    actionPdfToJpg: string;
    actionJpgToPdf: string;
    actionWordToPdf: string;
    actionPptToPdf: string;
    actionExcelToPdf: string;
    actionHtmlToPdf: string;
    actionEdit: string;
    actionSign: string;
    actionWatermark: string;
    actionRotate: string;
    actionOrganize: string;
    actionRemove: string;
    actionExtract: string;
    actionCrop: string;

    // Results screen
    resultSuccessTitle: string;
    resultSuccessDesc: string;
    resultFileName: string;
    resultFinalSize: string;
    resultSavedPct: (pct: number, origSize: string) => string;
    resultJpgPreviewTitle: (count: number) => string;
    resultDownloadBtn: string;
    resultProcessAnotherBtn: string;
    resultDownloadSingle: string;

    // Validation & Alerts
    errSelectFileFirst: string;
    errMergeMinFiles: string;
    errSignRequired: string;
    errWatermarkRequired: string;
    errRemoveMinPage: string;
    errExtractMinPage: string;
  };

  // Features Section
  features: {
    kicker: string;
    title: string;
    subtitle: string;
    item1Title: string;
    item1Desc: string;
    item2Title: string;
    item2Desc: string;
    item3Title: string;
    item3Desc: string;
    item4Title: string;
    item4Desc: string;
  };

  // How It Works Section
  howItWorks: {
    kicker: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };

  // FAQ Section
  faq: {
    kicker: string;
    title: string;
    subtitle: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
    q5: string;
    a5: string;
    q6: string;
    a6: string;
  };

  // Brand Modal
  brandModal: {
    kicker: string;
    title: string;
    desc: string;
    previewHeading: string;
    previewBadge: string;
    previewTitle: string;
    previewSubtitle: string;
    downloadSvg: string;
    copySvg: string;
    svgCopied: string;
    ideasTitle: string;
    domainHint: string;
    applyName: string;
    activeName: string;
  };

  // Footer Section
  footer: {
    desc: string;
    clientSideNotice: string;
    colEditTitle: string;
    colOrganizeTitle: string;
    colConvertTitle: string;
    copyright: (brand: string, year: number) => string;
    brandIdeaLink: string;
    catalogLink: string;
    freeAccess: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      featuresDropdown: 'All PDF Tools',
      toolsBadge: '20 Tools',
      advantages: 'Advantages',
      howItWorks: 'How It Works',
      faq: 'FAQ',
      brandIdea: 'Brand Names',
      brandIdeaShort: 'Brand',
      getStarted: 'Get Started Free',
      catalogTitle: '20 Complete PDF Tools Catalog',
      catalogSubtitle: 'Every tool is 100% free with no account or subscription required',
      searchPlaceholder: 'Search tools (e.g. Word, Sign, Merge, Rotate)...',
      filterLabel: 'Filter:',
      filterAll: 'All (20)',
      filterEdit: '✏️ Edit & Sign (4)',
      filterOrganize: '📑 Page Layout (6)',
      filterFromPdf: '📤 Convert From PDF (5)',
      filterToPdf: '📥 Convert To PDF (5)',
      noToolsMatch: 'No tools match your query',
      showAllTools: 'Show All 20 Tools',
      colEdit: 'Edit & Annotate',
      colOrganize: 'Page Layout',
      colFromPdf: 'Convert From PDF',
      colToPdf: 'Convert To PDF',
      privacyNotice: 'Guaranteed Privacy: All files are processed client-side in your browser without ever reaching an external server',
      viewCatalogPage: 'View Complete Catalog on Page',
      toolsCount: 'tools',
      mobileSelectTool: 'Select a PDF Tool',
    },
    hero: {
      kickerSolution: 'All-in-One PDF Suite',
      kickerFree: '100% Free Forever',
      kickerPrivacy: 'Private & Secure in Browser',
      title: 'Edit, Merge & Convert PDF Documents with Zero Limits',
      subtitle: 'A full-featured suite of 20 PDF utilities without logins, ads, or file caps. All operations execute privately and instantaneously on your computer or mobile device.',
      searchPlaceholder: 'Search any tool (e.g. Edit, Sign, Watermark, Merge, Rotate)...',
      clearSearch: 'Clear',
      mostUsed: 'Most Popular Tools:',
      trustPrivacyTitle: 'Strict Privacy',
      trustPrivacyDesc: 'Files are processed locally in your browser',
      trustFreeTitle: '100% Free Forever',
      trustFreeDesc: 'No account needed & zero watermarks',
      trustFastTitle: 'Instant Performance',
      trustFastDesc: 'Zero upload wait times or server queues',
    },
    catalog: {
      sectionTitle: 'Document Tools Catalog',
      sectionSubtitle: 'Choose any utility below to process your documents with zero hassle',
      showingCount: (count) => `Showing ${count} of 20 tools`,
      emptyTitle: 'No tools match your search',
      emptyDesc: 'Try a different keyword or reset the category filter to view all available tools.',
      resetFilter: 'Show All Tools',
      useTool: 'Use tool',
      openTool: 'Open →',
      freeBadge: 'Free',
    },
    workspace: {
      backToCatalog: 'Back to All Tools',
      secureMode: 'Secure Mode · 100% Client-Side',
      changeFile: 'Change File',
      failedProcess: 'Failed to process document',
      dropzoneTitle: 'Choose or Drop Files Here',
      dropzoneMultiple: 'You can choose or drop multiple files simultaneously',
      dropzoneSingle: 'Select a single document to start processing',
      selectFileBtn: 'Select File from Device',
      htmlEditorTitle: 'HTML Code & Document Editor:',
      quickTemplates: 'Quick Templates:',
      tplInvoice: 'Invoice',
      tplOfficialLetter: 'Official Letter',
      tplResume: 'Resume / CV',
      htmlPlaceholder: 'Enter HTML code or plain formatted text here...',
      orUploadHtml: 'Or select a .html file from your device:',
      chooseHtmlFile: 'Select .html file',
      selectedFilesTitle: (count) => `SELECTED FILES (${count})`,
      addMoreFiles: '+ Add More Files',
      moveUp: 'Move Up',
      moveDown: 'Move Down',
      removeFile: 'Remove File',
      loadingThumbnails: 'Loading page thumbnails for visual layout...',
      
      editSettingsTitle: 'Annotation & Text Configuration:',
      editTextLabel: 'Custom Text / Note:',
      editPositionLabel: 'Stamp Position:',
      editFontSizeLabel: 'Font Size:',
      editColorLabel: 'Text Color:',
      editBoxLabel: 'Add white protective border box around text for clear contrast',
      posTopRight: 'Top-Right',
      posTopLeft: 'Top-Left',
      posCenter: 'Center Page',
      posBottomRight: 'Bottom-Right',
      posBottomLeft: 'Bottom-Left',
      fontSmall: 'Small (10pt)',
      fontMedium: 'Medium (14pt)',
      fontLarge: 'Large (18pt)',
      fontExtraLarge: 'Extra Large (24pt)',

      signSettingsTitle: 'Stamp Digital or Electronic Signature:',
      signDrawTab: 'Draw Signature',
      signUploadTab: 'Upload Image',
      signInkLabel: 'Ink Color:',
      signInkBlack: 'Black',
      signInkBlue: 'Navy Blue',
      signInkRed: 'Red',
      signThicknessLabel: 'Pen Width:',
      signClear: 'Clear',
      signDrawHint: 'Sign or draw your signature in this box',
      signDrawSubhint: '(Supports mouse, touchpad, and mobile touchscreen)',
      signUploadHint: 'Upload initials or signature image',
      signUploadSubhint: 'Transparent PNG format is highly recommended',
      signChooseImage: 'Choose Image',
      signPositionLabel: 'Signature Position:',
      signPageLabel: 'Target Page:',
      signPosBottomRight: 'Bottom-Right Corner (Standard)',
      signPosBottomLeft: 'Bottom-Left Corner',
      signPosCenter: 'Bottom Center',
      signPageFirst: 'Page 1',
      signPageLast: 'Last Page',
      signPageNum: (n) => `Page ${n}`,
      signDateToggle: 'Include automatic electronic verification date stamp under signature',

      watermarkSettingsTitle: 'Watermark Stamp Configuration:',
      watermarkTextLabel: 'Watermark Text:',
      watermarkOpacityLabel: (pct) => `Opacity (${pct}%):`,
      watermarkSizeLabel: (pt) => `Text Size (${pt}pt):`,
      watermarkAngleLabel: 'Orientation:',
      watermarkDiagonal: 'Diagonal 45°',
      watermarkHorizontal: 'Horizontal',

      rotateSettingsTitle: 'Document Page Rotation Options:',
      rotateAllBtn: (deg) => `Rotate All (${deg}°)`,
      rotateThumbnailHint: 'Click rotate icon on any thumbnail below to adjust single pages:',
      rotatePageNum: (n) => `Page ${n}`,

      organizeSettingsTitle: 'Rearrange Page Sequence Visually:',
      organizeReset: 'Reset Order',
      organizePageNum: (pos) => `Page ${pos}`,
      organizeOriginalPage: (n) => `Original: Page ${n}`,

      removeSettingsTitle: 'Select Pages to Remove Permanently:',
      removeMarkedCount: (count) => `${count} page(s) marked for deletion`,
      removePageNum: (n) => `Page ${n}`,

      extractSettingsTitle: 'Select Pages to Extract into New PDF:',
      extractSelectAll: 'Select All',
      extractClear: 'Clear Selection',
      extractPageNum: (n) => `Page ${n}`,

      cropSettingsTitle: 'Trim Page Margin Borders:',
      cropTop: (pct) => `Top (${pct}%):`,
      cropBottom: (pct) => `Bottom (${pct}%):`,
      cropLeft: (pct) => `Left (${pct}%):`,
      cropRight: (pct) => `Right (${pct}%):`,
      cropVisualArea: 'Cropped Area',

      splitSettingsTitle: 'PDF Splitting Settings:',
      splitAllOptionTitle: 'Every Page (.ZIP Archive)',
      splitAllOptionDesc: 'Extract every single page into individual PDF files',
      splitRangeOptionTitle: 'Specific Page Range',
      splitRangeOptionDesc: 'Extract targeted pages or comma ranges (e.g. 1-3, 5)',
      splitRangeLabel: 'Page Range (e.g. 1-3, 5):',

      compressSettingsTitle: 'Compression Level:',
      compressLowTitle: 'Gentle',
      compressLowDesc: 'Highest visual fidelity, slight size reduction',
      compressMedTitle: 'Recommended',
      compressMedDesc: 'Balanced compression with sharp text readability',
      compressHighTitle: 'Extreme',
      compressHighDesc: 'Smallest file size for email attachment caps',

      jpgToPdfSettingsTitle: 'Page Layout & Margins:',
      jpgOrientationLabel: 'Page Orientation:',
      jpgMarginLabel: 'Margin Spacing:',
      orientationAuto: 'Automatic (Based on Image)',
      orientationPortrait: 'Portrait (Vertical)',
      orientationLandscape: 'Landscape (Horizontal)',
      marginNone: 'No Margin (Full Bleed)',
      marginSmall: 'Small Margin (Clean)',
      marginNormal: 'Standard Margin',

      actionMerge: 'Merge PDF Documents Now',
      actionSplit: 'Split PDF Document Now',
      actionCompress: 'Compress PDF Document Now',
      actionPdfToWord: 'Convert to Word Document (.docx)',
      actionPdfToExcel: 'Convert to Excel Spreadsheet (.xlsx)',
      actionPdfToPpt: 'Convert to PowerPoint Presentation (.pptx)',
      actionPdfToJpg: 'Convert Pages to JPG Images',
      actionJpgToPdf: 'Convert All Images into PDF',
      actionWordToPdf: 'Convert Word to PDF Document',
      actionPptToPdf: 'Convert PowerPoint to PDF Document',
      actionExcelToPdf: 'Convert Excel to PDF Document',
      actionHtmlToPdf: 'Generate PDF Document from HTML',
      actionEdit: 'Apply Changes & Save PDF',
      actionSign: 'Sign Document & Download PDF',
      actionWatermark: 'Apply Watermark & Save PDF',
      actionRotate: 'Rotate Pages & Save PDF',
      actionOrganize: 'Save New Page Order',
      actionRemove: 'Remove Pages & Save PDF',
      actionExtract: 'Extract Selected Pages into PDF',
      actionCrop: 'Trim Margins & Save PDF',

      resultSuccessTitle: 'Process Completed Successfully!',
      resultSuccessDesc: 'Your processed document is ready to download instantly.',
      resultFileName: 'File Name:',
      resultFinalSize: 'Final Size:',
      resultSavedPct: (pct, origSize) => `Saved ${pct}% from original file size (${origSize})`,
      resultJpgPreviewTitle: (count) => `CONVERTED PAGES PREVIEW (${count}):`,
      resultDownloadBtn: 'Download Processed File',
      resultProcessAnotherBtn: 'Process Another File',
      resultDownloadSingle: 'Download',

      errSelectFileFirst: 'Please select a file before continuing.',
      errMergeMinFiles: 'Please select at least 2 PDF files to merge.',
      errSignRequired: 'Please draw or upload your signature before proceeding.',
      errWatermarkRequired: 'Please enter watermark text first.',
      errRemoveMinPage: 'Please select at least one page to delete.',
      errExtractMinPage: 'Please select at least one page to extract.',
    },
    features: {
      kicker: 'Why Choose Us',
      title: 'A Modern, Secure & Frictionless Document Platform',
      subtitle: 'Engineered for professionals, students, and businesses who need swift document processing without sign-up walls.',
      item1Title: '100% Guaranteed Privacy',
      item1Desc: 'All document processing runs strictly in your client browser. Your sensitive records never leave your device or reach an external server.',
      item2Title: 'Free with No Login',
      item2Desc: 'Access all 20 powerful tools immediately without user registrations, spam newsletters, or paid tiers.',
      item3Title: 'Fast & Lightweight',
      item3Desc: 'Harnesses high-performance WebAssembly and JavaScript for instantaneous rendering, compression, and conversion.',
      item4Title: 'Standard Office Formats',
      item4Desc: 'Seamlessly works with official Microsoft Word (.docx), Excel (.xlsx), PowerPoint (.pptx), crisp JPGs, and HTML.',
    },
    howItWorks: {
      kicker: 'Simple Workflow',
      title: 'Three Easy Steps',
      subtitle: 'No heavy software downloads, drivers, or complicated configurations.',
      step1Title: 'Select Your Document',
      step1Desc: 'Drag and drop or select files directly from your computer or phone. Multi-file uploads are supported for merging.',
      step2Title: 'Customize & Process',
      step2Desc: 'Adjust page sequence, choose compression levels, or select layout options. Processing happens in a flash.',
      step3Title: 'Download Without Limits',
      step3Desc: 'One click to download your ready-to-use file straight to your downloads folder, completely free of watermarks.',
    },
    faq: {
      kicker: 'Frequently Asked Questions',
      title: 'Questions & Answers',
      subtitle: 'Comprehensive details on document privacy, mobile compatibility, and security.',
      q1: 'Are my uploaded documents secure and private from third parties?',
      a1: 'Extremely secure. This platform processes documents entirely inside your browser using client-side WebAssembly and JavaScript engines. Your files are never uploaded to any remote server, preserving 100% confidentiality.',
      q2: 'Is it truly free without any hidden login requirements?',
      a2: 'Yes, all 20 tools are completely free to use without creating an account or paying a subscription. We believe foundational document utility tools should be open and accessible to all.',
      q3: 'How does electronic signature (Sign PDF) work?',
      a3: 'You can draw your signature directly with your mouse cursor, laptop touchpad, or mobile touchscreen, or upload a transparent PNG signature. You can position it on any corner or page you specify.',
      q4: 'Are there any promotional watermarks on output documents?',
      a4: 'None whatsoever. All output documents (merged, converted, split, or signed) are completely clean of system watermarks or promotional logos.',
      q5: 'How does the PDF compression engine work?',
      a5: 'The compression algorithm optimizes internal cross-reference tables, eliminates duplicate metadata, and recalibrates raster assets to shrink file weight without compromising legibility.',
      q6: 'Can I use these tools on mobile devices (Android / iPhone / iPad)?',
      a6: 'Absolutely. The user interface is engineered with a responsive touch design and operates seamlessly on mobile browsers including Chrome, Safari, and Firefox.',
    },
    brandModal: {
      kicker: 'Brand Identity & Recommendations',
      title: 'Logo & Brand Identity Ideas',
      desc: 'Select your preferred brand name to test it live across the platform interface.',
      previewHeading: 'Live Brand Preview Card',
      previewBadge: 'Free Utility Suite',
      previewTitle: 'All-in-One PDF Platform',
      previewSubtitle: 'Transform, sign, merge, and convert documents directly in your browser with zero logins.',
      downloadSvg: 'Download Vector SVG Logo',
      copySvg: 'Copy SVG Code',
      svgCopied: 'Copied to Clipboard!',
      ideasTitle: 'Curated Name Recommendations',
      domainHint: 'Recommended domains:',
      applyName: 'Use This Brand',
      activeName: 'Currently Active',
    },
    footer: {
      desc: 'An all-in-one suite of 20 versatile PDF utilities without account sign-ups or subscription barriers.',
      clientSideNotice: '100% Client-Side: Documents stay safe on your machine',
      colEditTitle: 'Edit & Manage PDF',
      colOrganizeTitle: 'Merge & Organize',
      colConvertTitle: 'Convert Other Formats',
      copyright: (brand, year) => `© ${year} ${brand}. Complete 20 PDF Tools Suite.`,
      brandIdeaLink: 'Brand Name Recommendations',
      catalogLink: '20 Tools Catalog',
      freeAccess: 'Free Unlimited Access',
    },
  },
  id: {
    nav: {
      featuresDropdown: 'Fitur PDF Lengkap',
      toolsBadge: '20 Alat',
      advantages: 'Keunggulan',
      howItWorks: 'Cara Kerja',
      faq: 'Tanya Jawab',
      brandIdea: 'Rekomendasi Nama',
      brandIdeaShort: 'Brand',
      getStarted: 'Mulai Gratis',
      catalogTitle: 'Katalog 20 Alat Dokumen PDF',
      catalogSubtitle: 'Semua fitur bebas digunakan tanpa akun & gratis selamanya',
      searchPlaceholder: 'Cari alat (misal: word, tanda tangan, merge, rotate)...',
      filterLabel: 'Filter:',
      filterAll: 'Semua (20)',
      filterEdit: '✏️ Edit & TTD (4)',
      filterOrganize: '📑 Organisasi (6)',
      filterFromPdf: '📤 Dari PDF (5)',
      filterToPdf: '📥 Ke PDF (5)',
      noToolsMatch: 'Tidak ada alat yang sesuai dengan kata kunci',
      showAllTools: 'Tampilkan Semua 20 Alat',
      colEdit: 'Edit & Anotasi',
      colOrganize: 'Tata Letak Halaman',
      colFromPdf: 'Konversi Dari PDF',
      colToPdf: 'Konversi Ke PDF',
      privacyNotice: 'Privasi Terlindungi: Semua file diproses langsung di peramban tanpa pernah diunggah ke server',
      viewCatalogPage: 'Lihat Katalog Lengkap di Halaman',
      toolsCount: 'alat',
      mobileSelectTool: 'Pilih Alat PDF',
    },
    hero: {
      kickerSolution: 'Solusi Dokumen Lengkap',
      kickerFree: '100% Gratis',
      kickerPrivacy: 'Privasi Terjaga di Peramban',
      title: 'Kelola, Gabung, & Konversi Dokumen PDF Tanpa Batas',
      subtitle: 'Platform 20 alat PDF lengkap tanpa perlu login atau langganan. Semua proses berjalan secara aman dan instan langsung di komputer atau ponsel Anda.',
      searchPlaceholder: 'Cari alat (misal: Edit, Sign, Watermark, Merge, Rotate)...',
      clearSearch: 'Hapus',
      mostUsed: 'Paling Sering Digunakan:',
      trustPrivacyTitle: 'Privasi Terjaga',
      trustPrivacyDesc: 'File diproses lokal di browser Anda',
      trustFreeTitle: '100% Gratis',
      trustFreeDesc: 'Tanpa akun & tanpa watermark sistem',
      trustFastTitle: 'Proses Kilat',
      trustFastDesc: 'Tanpa antrean server atau waktu tunggu',
    },
    catalog: {
      sectionTitle: 'Katalog Alat Dokumen',
      sectionSubtitle: 'Pilih alat yang Anda butuhkan untuk memproses dokumen secara instan',
      showingCount: (count) => `Menampilkan ${count} dari 20 alat`,
      emptyTitle: 'Tidak ada alat yang cocok',
      emptyDesc: 'Coba kata kunci pencarian lain atau tampilkan semua kategori alat.',
      resetFilter: 'Tampilkan Semua Alat',
      useTool: 'Gunakan alat',
      openTool: 'Buka →',
      freeBadge: 'Gratis',
    },
    workspace: {
      backToCatalog: 'Kembali ke Semua Alat',
      secureMode: 'Mode Aman · 100% di Browser',
      changeFile: 'Ganti File',
      failedProcess: 'Gagal memproses dokumen',
      dropzoneTitle: 'Pilih atau Tarik File ke Sini',
      dropzoneMultiple: 'Anda dapat memilih lebih dari satu file sekaligus',
      dropzoneSingle: 'Pilih satu dokumen untuk memulai proses',
      selectFileBtn: 'Pilih Berkas dari Perangkat',
      htmlEditorTitle: 'Editor HTML & Kode Dokumen:',
      quickTemplates: 'Template Cepat:',
      tplInvoice: 'Faktur',
      tplOfficialLetter: 'Surat Resmi',
      tplResume: 'CV / Resume',
      htmlPlaceholder: 'Tulis kode HTML atau teks di sini...',
      orUploadHtml: 'Atau unggah berkas .html dari komputer:',
      chooseHtmlFile: 'Pilih file .html',
      selectedFilesTitle: (count) => `BERKAS TERPILIH (${count})`,
      addMoreFiles: '+ Tambah Berkas Lagi',
      moveUp: 'Geser ke atas',
      moveDown: 'Geser ke bawah',
      removeFile: 'Hapus file',
      loadingThumbnails: 'Memuat pratinjau lembar halaman dokumen...',
      
      editSettingsTitle: 'Pengaturan Anotasi & Teks:',
      editTextLabel: 'Teks Anotasi / Catatan:',
      editPositionLabel: 'Posisi Peletakan:',
      editFontSizeLabel: 'Ukuran Font:',
      editColorLabel: 'Warna Teks:',
      editBoxLabel: 'Tambahkan bingkai kotak putih di sekeliling teks agar mudah terbaca',
      posTopRight: 'Kanan Atas',
      posTopLeft: 'Kiri Atas',
      posCenter: 'Tengah Halaman',
      posBottomRight: 'Kanan Bawah',
      posBottomLeft: 'Kiri Bawah',
      fontSmall: 'Kecil (10pt)',
      fontMedium: 'Sedang (14pt)',
      fontLarge: 'Besar (18pt)',
      fontExtraLarge: 'Sangat Besar (24pt)',

      signSettingsTitle: 'Bubuhkan Tanda Tangan Elektronik:',
      signDrawTab: 'Gambar TTD',
      signUploadTab: 'Unggah Gambar',
      signInkLabel: 'Tinta:',
      signInkBlack: 'Hitam',
      signInkBlue: 'Biru Tua',
      signInkRed: 'Merah',
      signThicknessLabel: 'Ketebalan:',
      signClear: 'Hapus',
      signDrawHint: 'Tulis atau gambar tanda tangan Anda di sini',
      signDrawSubhint: '(Mendukung mouse, touchpad, dan layar sentuh)',
      signUploadHint: 'Unggah file paraf / tanda tangan',
      signUploadSubhint: 'Format PNG transparan sangat disarankan',
      signChooseImage: 'Pilih Gambar',
      signPositionLabel: 'Posisi Tanda Tangan:',
      signPageLabel: 'Target Halaman:',
      signPosBottomRight: 'Pojok Kanan Bawah (Standar)',
      signPosBottomLeft: 'Pojok Kiri Bawah',
      signPosCenter: 'Tengah Bawah',
      signPageFirst: 'Halaman 1',
      signPageLast: 'Halaman Terakhir',
      signPageNum: (n) => `Halaman ${n}`,
      signDateToggle: 'Sertakan stempel tanggal elektronik otomatis di bawah tanda tangan',

      watermarkSettingsTitle: 'Pengaturan Watermark / Tanda Air:',
      watermarkTextLabel: 'Teks Watermark:',
      watermarkOpacityLabel: (pct) => `Transparansi (${pct}%):`,
      watermarkSizeLabel: (pt) => `Ukuran Teks (${pt}pt):`,
      watermarkAngleLabel: 'Kemiringan:',
      watermarkDiagonal: 'Diagonal 45°',
      watermarkHorizontal: 'Horizontal',

      rotateSettingsTitle: 'Opsi Rotasi Halaman Dokumen:',
      rotateAllBtn: (deg) => `Putar Semua (${deg}°)`,
      rotateThumbnailHint: 'Klik tombol putar pada halaman individual untuk memutar per lembar:',
      rotatePageNum: (n) => `Hal ${n}`,

      organizeSettingsTitle: 'Susun Ulang Urutan Halaman:',
      organizeReset: 'Reset Urutan',
      organizePageNum: (pos) => `Hal ${pos}`,
      organizeOriginalPage: (n) => `Asli: Hal ${n}`,

      removeSettingsTitle: 'Pilih Halaman yang Ingin Dihapus:',
      removeMarkedCount: (count) => `${count} halaman ditandai untuk dihapus`,
      removePageNum: (n) => `Halaman ${n}`,

      extractSettingsTitle: 'Pilih Halaman yang Ingin Diekstrak:',
      extractSelectAll: 'Pilih Semua',
      extractClear: 'Kosongkan',
      extractPageNum: (n) => `Halaman ${n}`,

      cropSettingsTitle: 'Potong Margin Area Halaman PDF:',
      cropTop: (pct) => `Atas (${pct}%):`,
      cropBottom: (pct) => `Bawah (${pct}%):`,
      cropLeft: (pct) => `Kiri (${pct}%):`,
      cropRight: (pct) => `Kanan (${pct}%):`,
      cropVisualArea: 'Area Terpotong',

      splitSettingsTitle: 'Pengaturan Pemisahan Dokumen:',
      splitAllOptionTitle: 'Semua Halaman (.ZIP)',
      splitAllOptionDesc: 'Ekstrak setiap halaman menjadi file PDF terpisah',
      splitRangeOptionTitle: 'Rentang Halaman Tertentu',
      splitRangeOptionDesc: 'Pilih rentang halaman spesifik untuk diekstrak',
      splitRangeLabel: 'Rentang Halaman (misal: 1-3, 5):',

      compressSettingsTitle: 'Tingkat Kompresi Dokumen:',
      compressLowTitle: 'Ringan',
      compressLowDesc: 'Kualitas tertinggi, ukuran berkurang sedikit',
      compressMedTitle: 'Rekomendasi',
      compressMedDesc: 'Kompresi seimbang & kualitas tetap tajam',
      compressHighTitle: 'Ekstrem',
      compressHighDesc: 'Ukuran paling kecil untuk hemat kuota/email',

      jpgToPdfSettingsTitle: 'Orientasi & Tata Letak Halaman PDF:',
      jpgOrientationLabel: 'Orientasi Halaman:',
      jpgMarginLabel: 'Batas Tepi (Margin):',
      orientationAuto: 'Otomatis (Sesuai Foto)',
      orientationPortrait: 'Potret (Tegak)',
      orientationLandscape: 'Lanskap (Melebar)',
      marginNone: 'Tanpa Margin (Penuh)',
      marginSmall: 'Margin Kecil (Rapi)',
      marginNormal: 'Margin Standar',

      actionMerge: 'Gabungkan Dokumen PDF Sekarang',
      actionSplit: 'Pisahkan Dokumen PDF Sekarang',
      actionCompress: 'Kompres Dokumen PDF Sekarang',
      actionPdfToWord: 'Konversi ke Dokumen Word (.docx)',
      actionPdfToExcel: 'Konversi ke Spreadsheet Excel (.xlsx)',
      actionPdfToPpt: 'Konversi ke Presentasi PowerPoint (.pptx)',
      actionPdfToJpg: 'Konversi Halaman ke Gambar JPG',
      actionJpgToPdf: 'Ubah Semua Gambar Menjadi PDF',
      actionWordToPdf: 'Konversi Word ke Dokumen PDF',
      actionPptToPdf: 'Konversi PowerPoint ke Dokumen PDF',
      actionExcelToPdf: 'Konversi Excel ke Dokumen PDF',
      actionHtmlToPdf: 'Buat Dokumen PDF dari HTML',
      actionEdit: 'Terapkan Perubahan & Simpan PDF',
      actionSign: 'Tandatangani & Unduh PDF',
      actionWatermark: 'Beri Watermark & Simpan PDF',
      actionRotate: 'Putar Halaman & Simpan PDF',
      actionOrganize: 'Simpan Urutan Halaman Baru',
      actionRemove: 'Hapus Halaman & Simpan PDF',
      actionExtract: 'Ekstrak Halaman Pilihan ke PDF',
      actionCrop: 'Potong Margin & Simpan PDF',

      resultSuccessTitle: 'Proses Berhasil Selesai!',
      resultSuccessDesc: 'Dokumen Anda telah siap diunduh secara instan ke perangkat.',
      resultFileName: 'Nama Berkas:',
      resultFinalSize: 'Ukuran Akhir:',
      resultSavedPct: (pct, origSize) => `Hemat ${pct}% dari ukuran berkas awal (${origSize})`,
      resultJpgPreviewTitle: (count) => `PRATINJAU HALAMAN TERKONVERSI (${count}):`,
      resultDownloadBtn: 'Unduh Berkas Hasil',
      resultProcessAnotherBtn: 'Proses Berkas Lain',
      resultDownloadSingle: 'Unduh',

      errSelectFileFirst: 'Silakan pilih berkas terlebih dahulu sebelum melanjutkan.',
      errMergeMinFiles: 'Pilih minimal 2 file PDF untuk digabungkan.',
      errSignRequired: 'Silakan buat tanda tangan Anda terlebih dahulu pada panel tanda tangan.',
      errWatermarkRequired: 'Masukkan teks watermark terlebih dahulu.',
      errRemoveMinPage: 'Pilih minimal satu halaman yang ingin dihapus.',
      errExtractMinPage: 'Pilih minimal satu halaman untuk diekstrak.',
    },
    features: {
      kicker: 'Mengapa Memilih Kami',
      title: 'Solusi Dokumen Modern yang Aman & Nyaman Digunakan',
      subtitle: 'Didesain khusus untuk para profesional, mahasiswa, dan siapa saja yang membutuhkan pengelolaan dokumen tanpa repot.',
      item1Title: 'Privasi Terjamin 100%',
      item1Desc: 'Seluruh pemrosesan berkas dikerjakan langsung di dalam browser Anda. Dokumen sensitif tidak pernah diunggah atau disimpan di server luar.',
      item2Title: 'Bebas Tanpa Perlu Login',
      item2Desc: 'Langsung gunakan seluruh 20 alat lengkap tanpa registrasi, tanpa email, dan tanpa batasan langganan berbayar.',
      item3Title: 'Pemrosesan Cepat & Ringan',
      item3Desc: 'Memanfaatkan performa mesin peramban modern untuk kompresi dan konversi instan tanpa antrean server.',
      item4Title: 'Format Dokumen Standar',
      item4Desc: 'Mendukung format resmi Microsoft Word (.docx), Excel (.xlsx), PowerPoint (.pptx), gambar resolusi tinggi, dan HTML.',
    },
    howItWorks: {
      kicker: 'Alur Kerja Sederhana',
      title: 'Tiga Langkah Mudah',
      subtitle: 'Tanpa perlu instalasi software berat ataupun proses registrasi yang membingungkan.',
      step1Title: 'Pilih Dokumen Anda',
      step1Desc: 'Tarik dan lepas atau pilih berkas dari komputer maupun ponsel Anda. Bisa mengunggah lebih dari satu berkas untuk penggabungan.',
      step2Title: 'Atur & Proses Otomatis',
      step2Desc: 'Sesuaikan urutan halaman, tentukan tingkat kompresi atau orientasi halaman. Mesin memproses dokumen secara instan di peramban.',
      step3Title: 'Unduh Hasil Tanpa Batas',
      step3Desc: 'Satu klik untuk mengunduh dokumen yang telah selesai. File langsung tersimpan di folder unduhan Anda tanpa watermark.',
    },
    faq: {
      kicker: 'Pertanyaan Umum',
      title: 'Tanya Jawab Seputar Layanan',
      subtitle: 'Informasi lengkap seputar privasi, kompatibilitas, dan keamanan penggunaan.',
      q1: 'Apakah dokumen saya aman dan tidak diintip pihak lain?',
      a1: 'Sangat aman. Platform ini memproses file sepenuhnya di dalam browser Anda menggunakan teknologi WebAssembly dan JavaScript. Berkas tidak pernah diunggah atau disimpan di server mana pun, sehingga kerahasiaan dan privasi dokumen Anda 100% terjaga.',
      q2: 'Apakah benar-benar gratis tanpa perlu login?',
      a2: 'Ya, seluruh 20 alat lengkap dapat digunakan tanpa biaya, tanpa perlu mendaftar akun, dan tanpa batas langganan seumur hidup. Kami percaya alat utilitas dokumen dasar harus dapat diakses dengan mudah oleh semua orang.',
      q3: 'Bagaimana cara menambahkan tanda tangan elektronik (Sign PDF)?',
      a3: 'Anda dapat langsung menggambar tanda tangan basah di kanvas layar menggunakan kursor mouse, touchpad laptop, atau layar sentuh smartphone, atau mengunggah berkas gambar paraf transparan (PNG). Tanda tangan dapat ditempatkan di halaman dan sudut mana pun yang Anda tentukan.',
      q4: 'Apakah ada watermark pada dokumen yang dihasilkan?',
      a4: 'Tidak sama sekali. Semua dokumen hasil gabungan, pemisahan, maupun konversi bersih dari watermark, stempel, atau logo promosi.',
      q5: 'Bagaimana cara kerja kompresi PDF?',
      a5: 'Alat kompresi menghapus metadata berlebih, mengoptimalkan tabel objek internal, dan menyeimbangkan resolusi gambar tertanam agar ukuran file berkurang drastis tanpa merusak keterbacaan teks.',
      q6: 'Apakah bisa digunakan di smartphone (Android / iPhone)?',
      a6: 'Tentu saja. Antarmuka PDF Tools dirancang sepenuhnya responsif dan dapat dioperasikan langsung dari browser seluler Anda seperti Chrome, Safari, atau Firefox.',
    },
    brandModal: {
      kicker: 'Identitas & Rekomendasi Nama Brand',
      title: 'Logo & Rekomendasi Nama',
      desc: 'Pilih nama brand favorit Anda untuk langsung melihat penerapannya di seluruh antarmuka aplikasi.',
      previewHeading: 'Kartu Pratinjau Brand',
      previewBadge: 'Aplikasi PDF Gratis',
      previewTitle: 'Platform Dokumen PDF Lengkap',
      previewSubtitle: 'Transformasi, tanda tangani, gabungkan, dan konversi format dokumen langsung di peramban Anda tanpa perlu login.',
      downloadSvg: 'Unduh Logo Vektor SVG',
      copySvg: 'Salin Kode SVG',
      svgCopied: 'Kode SVG Berhasil Disalin!',
      ideasTitle: 'Pilihan Rekomendasi Nama Brand',
      domainHint: 'Rekomendasi domain:',
      applyName: 'Gunakan Brand Ini',
      activeName: 'Sedang Aktif',
    },
    footer: {
      desc: 'Platform produktivitas 20 alat dokumen PDF serbaguna gratis tanpa perlu mendaftar akun dan tanpa batasan.',
      clientSideNotice: '100% Client-Side: Berkas aman di peramban',
      colEditTitle: 'Edit & Kelola PDF',
      colOrganizeTitle: 'Gabung & Kompres',
      colConvertTitle: 'Konversi Format Lain',
      copyright: (brand, year) => `© ${year} ${brand}. Solusi 20 Alat PDF Lengkap & Gratis.`,
      brandIdeaLink: 'Rekomendasi Nama Brand',
      catalogLink: 'Katalog 20 Alat',
      freeAccess: 'Bebas Akses Kapan Saja',
    },
  },
};
