export interface MemoryPhoto {
  id: string;
  url: string;
  caption: string;
  rotation: number;
  tapeColor: 'pink' | 'blue' | 'lavender' | 'cream';
  sticker?: string;
  date?: string;
}

export interface AwardItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
  badgeColor: string;
}

export interface BirthdayWebsiteContent {
  bestFriendNickname: string;
  girlBestFriendName: string;
  websiteTitle: string;

  header: {
    brandText: string;
    navMemories: string;
    navStory: string;
    navAwards: string;
    navSong: string;
    navLetter: string;
    navGift: string;
    navCake: string;
    editModeButtonText: string;
    saveButtonText: string;
  };

  welcome: {
    badge: string;
    heading: string;
    subheading: string;
    note: string;
    buttonText: string;
    envelopeStamp: string;
    envelopeHint: string;
    envelopeOpenTitle: string;
    envelopeOpenMessage: string;
    bottomTagline: string;
  };

  gallery: {
    badge: string;
    heading: string;
    subtitle: string;
    uploadHint: string;
    addMemoryButtonText: string;
    photos: MemoryPhoto[];
    doodles: {
      title: string;
      tag: string;
    }[];
  };

  friendship: {
    badge: string;
    heading: string;
    subtitle: string;
    chapterTag: string;
    statusText: string;
    moodText: string;
    notes: {
      quote: string;
      label: string;
      subtext: string;
      emoji: string;
      color: 'amber' | 'pink' | 'purple';
    }[];
    footerQuote: string;
    tierTag: string;
  };

  awards: {
    badge: string;
    heading: string;
    subtitle: string;
    list: AwardItem[];
    specialAward: {
      badge: string;
      title: string;
      description: string;
      claimButtonText: string;
      claimedButtonText: string;
      certifiedNotice: string;
    };
  };

  song: {
    badge: string;
    heading: string;
    dedicationNoteLabel: string;
    dedicationMessage: string;
    defaultTrackTitle: string;
    defaultTrackTag: string;
    uploadedTrackTag: string;
    playText: string;
    playingText: string;
    noAutoplayNote: string;
    uploadButtonText: string;
  };

  letter: {
    badge: string;
    heading: string;
    subtitle: string;
    confidentialTag: string;
    openButtonText: string;
    closeButtonText: string;
    waxSealPrompt: string;
    waxSealSubtext: string;
    letterSalutation: string;
    letterheadTag: string;
    paragraphs: string[];
    signOff: string;
    subSignOff: string;
  };

  gift: {
    badge: string;
    heading: string;
    subtitle: string;
    boxTapPrompt: string;
    revealTitle: string;
    revealText: string;
    couponsHeading: string;
    coupons: {
      id: string;
      title: string;
      desc: string;
      emoji: string;
    }[];
    repackButtonText: string;
  };

  cake: {
    badge: string;
    mainText: string;
    subtitle: string;
    blowButtonText: string;
    relightButtonText: string;
    confettiButtonText: string;
    wishMadeTitle: string;
    wishMadeSubtext: string;
    footerQuote: string;
    footerSubtext: string;
  };

  footer: {
    quote: string;
    themeTag: string;
    editionTag: string;
    resetButtonText: string;
  };
}
