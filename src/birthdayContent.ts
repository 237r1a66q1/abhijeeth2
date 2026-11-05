/**
 * ============================================================================
 * 🎂 BIRTHDAY WEBSITE MASTER CONTENT FILE (EDITABLE) 🎂
 * ============================================================================
 * 
 * Edit ANY text, nickname, photo captions, awards, song dedication, or letter
 * content right here in this single file!
 * 
 * You do NOT need to touch any UI components or styling to customize this.
 * Everything on the website updates automatically from this file.
 * 
 * Language: Telugu written with English letters (Telugu-English / Tanglish)
 * ============================================================================
 */

import { BirthdayWebsiteContent } from './types';

export const BIRTHDAY_CONTENT: BirthdayWebsiteContent = {
  // --------------------------------------------------------------------------
  // 🏷️ GENERAL NICKNAMES & BRANDING
  // --------------------------------------------------------------------------
  bestFriendNickname: 'pillu',
  girlBestFriendName: 'Nee Bestfriend',
  websiteTitle: 'Nee Kosam Oka Chinna Surprise ❤️',

  // --------------------------------------------------------------------------
  // 🧭 HEADER NAVIGATION BAR
  // --------------------------------------------------------------------------
  header: {
    brandText: 'Nee Kosam Oka Chinna Surprise ❤️',
    navMemories: 'Memories 📸',
    navStory: 'Story ❤️',
    navAwards: 'Awards 🏆',
    navSong: 'Song 🎧',
    navLetter: 'Letter 💌',
    navGift: 'Gift 🎁',
    navCake: 'Cake 🎂',
    editModeButtonText: 'Text Marchuko ✏️',
    saveButtonText: 'Save Cheyyi 💾',
  },

  // --------------------------------------------------------------------------
  // 🌸 SECTION 1: WELCOME PAGE
  // --------------------------------------------------------------------------
  welcome: {
    badge: 'Special Surprise Edition for Bestie',
    heading: 'Heyyyy Abhijeet!! ❤️',
    subheading: 'Nee kosam oka chinna surprise ready chesa...',
    note: 'Ekva feel avaku ley, birthday month kadha, konchem special ga treat chedham anni anthey',
    buttonText: 'Open Cheyyi abhijeet🎁',
    envelopeStamp: 'PILLU',
    envelopeHint: 'Tap chesi open cheyy! 💌',
    envelopeOpenTitle: 'Yayyy! first time nen chepindhi chepinattu cheshnavv thankyou abhijeet ! ❤️',
    envelopeOpenMessage: 'mana friendship etla start ayindhoo ippudh etla nadusthundhii chudhamaaaa ready ahh',
    bottomTagline: '(ee waste fellow kosam handmade with love 🌸)',
  },

  // --------------------------------------------------------------------------
  // 📸 SECTION 2: PHOTO GALLERY (POLAROID MEMORIES)
  // --------------------------------------------------------------------------
  gallery: {
    badge: 'Polaroid Scrapbook Album',
    heading: 'Mana Memories 📸',
    subtitle: 'Prathi photo venuka oka peddha lolli untundhi 😂',
    uploadHint: '',
    addMemoryButtonText: '',

    // You can paste image URLs here or upload them directly on the website
    photos: [
      {
        id: 'photo-1',
        url: '', // Leave empty for cute scrapbook placeholder or add your image URL
        caption: 'Ee pic gurthundha ra?,idhi mana first photo,manam appudh just frndssss ',
        rotation: -2,
        tapeColor: 'pink',
        sticker: '✨',
        date: 'Day 1 nunchi...',
      },
      {
        id: 'photo-2',
        url: '',
        caption: 'ee cute boyy evvaruu',
        rotation: 3,
        tapeColor: 'blue',
        sticker: '😂',
        date: '',
      },
      {
        id: 'photo-3',
        url: '',
        caption: 'ee okka photo venakala enni kathal enni lollilu unnay kadhaaa',
        rotation: -3,
        tapeColor: 'lavender',
        sticker: '🤪',
        date: '',
      },
      {
        id: 'photo-4',
        url: '',
        caption: 'Enni fights aynaa kanii manakii full cute memories unnay  ',
        rotation: 2,
        tapeColor: 'cream',
        sticker: '❤️',
        date: 'Forever memory',
      },
    ],

    // Fallback cute artistic doodle badges when photos are not yet uploaded
    doodles: [
      {
        title: 'Chai & Maggi Time ☕',
        tag: 'Midnight sodhi & canteen treats',
      },
      {
        title: 'Non-stop Navvulu 😂',
        tag: 'jokes & stomach pain laughs',
      },
      {
        title: 'Vibe & Car Rides 🎧',
        tag: 'Singing horribly & having fun',
      },
      {
        title: 'Evergreen Bestie Bond ❤️',
        tag: 'Day 1 nunchi ippativaraku',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // ❤️ SECTION 3: OUR FRIENDSHIP STORY
  // --------------------------------------------------------------------------
  friendship: {
    badge: 'mana 3 years Journey & Daily Drama',
    heading: 'Mana Friendship Story ❤️',
    subtitle: 'Konni friendships plan cheskuni raavu, destiny isthundhi!',
    chapterTag: 'CHAPTER: BEST FRIENDS FOREVER',
    statusText: 'Status: Irreplaceable ',
    moodText: 'Mood: Full Emotional',
    notes: [
      {
        quote: 'First lo just friends... ippudu daily headache! 😂',
        label: '01. How It Started',
        subtext: 'Ipudu nuvve naa prime headache!',
        emoji: '😂',
        color: 'amber',
      },
      {
        quote: 'Enni silly fights, enni arguments, enni random conversations... anni naaku special memories aipoyayi.',
        label: '02. The Chaos & Love',
        subtext: 'Every fight made us closer!',
        emoji: '💬',
        color: 'pink',
      },
      {
        quote: 'Nuvvu eppudu ilage naa life lo undalii abhijeet. ✨',
        label: '03. Forever Promise',
        subtext: 'Lifelong friendship guarantee!',
        emoji: '✨',
        color: 'purple',
      },
    ],
    footerQuote: 'Mana bond ni evaru replace cheyaleru...',
    tierTag: 'Best Friends Tier: MAX',
  },

  // --------------------------------------------------------------------------
  // 🏆 SECTION 4: AWARDS CEREMONY
  // --------------------------------------------------------------------------
  awards: {
    badge: 'Annual Bestie Honors Ceremony',
    heading: 'And The Awards Go To... 🏆',
    subtitle: 'Oscar kante peddha awards ivi, muskonii silent ga teeskoo! 😂',
    list: [
      {
        id: 1,
        title: 'Best Human Award 🌟',
        description: 'Naa life lo oka manchi person ga unnandhuku.',
        iconName: 'heart',
        badgeColor: 'from-amber-200 to-yellow-100',
      },
      {
        id: 2,
        title: 'Best Support System Award 🛡️',
        description: 'Naaku avasaram unnappudu pakkana unnandhuku.',
        iconName: 'shield',
        badgeColor: 'from-sky-200 to-blue-100',
      },
      {
        id: 3,
        title: 'Best Listener Award 👂',
        description: 'Naa sollu antha patience tho vinnandhuku,anni anta anukunnavaa nuv asal vinnav kanii idhi ichinaka ayna vintav anni chinna hope ',
        iconName: 'headphones',
        badgeColor: 'from-pink-200 to-rose-100',
      },
      {
        id: 4,
        title: 'Best Memories Award 📸',
        description: 'Marchipoleni memories ichinandhuku.',
        iconName: 'camera',
        badgeColor: 'from-purple-200 to-indigo-100',
      },
      {
        id: 5,
        title: 'Most Trusted Person Award 🤝',
        description: 'Ninnu nenu nammagaliginandhuku.',
        iconName: 'lock',
        badgeColor: 'from-emerald-200 to-teal-100',
      },
      {
        id: 6,
        title: 'One In A Million Award 💎',
        description: 'Nee place ni evaru replace cheyyaleru kabatti.',
        iconName: 'gem',
        badgeColor: 'from-violet-200 to-fuchsia-100',
      },
      {
        id: 7,
        title: 'Forever Best Friend Award ♾️',
        description: 'Mana bond eppatiki ilage undalani.',
        iconName: 'sparkles',
        badgeColor: 'from-pink-300 to-amber-200',
      },
    ],

    // Special Grand Finale Award
    specialAward: {
      badge: 'Grand Finale Honour',
      title: 'My Favourite Person Award ❤️',
      description: 'Ee award matram eppatiki neekeyy pillu . Nuvvu naa life lo undadam chala special.',
      claimButtonText: 'Award Claim Cheyyi ! 👑',
      claimedButtonText: 'Award Claim Cheskunnaav! 🏆❤️',
      certifiedNotice: '🎉 Certified & Sealed by your Girl Best Friend forever! 🎉',
    },
  },

  // --------------------------------------------------------------------------
  // 🎧 SECTION 5: SONG DEDICATION
  // --------------------------------------------------------------------------
  song: {
    badge: 'Personal Playlist Dedication',
    heading: 'Ee Song Neeke dedicate chesthunna! 🎧',
    dedicationNoteLabel: 'Dedication Note 💌',
    dedicationMessage: 'Ee song vinnappudu nenu gurthosthe chalu. Nee kosam dedicate chesthunna.',
    defaultTrackTitle: 'Bestie Birthday Instrumental Melody 🌸',
    defaultTrackTag: 'Sweet Acoustic Birthday Chimes 🎹',
    uploadedTrackTag: 'Custom Uploaded Song 🎵',
    playText: 'Play Cheyyi pillu▶️',
    playingText: 'Paata Vintunvaa! 🎶',
    noAutoplayNote: '(No autoplay - nee permission tho ne!)',
    uploadButtonText: 'MP3 Upload Cheyyi 🎵',
  },

  // --------------------------------------------------------------------------
  // 💌 SECTION 6: HEARTFELT LETTER
  // --------------------------------------------------------------------------
  letter: {
    badge: 'Handwritten Digital Letter',
    heading: 'Neeku Oka Chinna Letter 💌',
    subtitle: 'Nee kosam heartful ga rashnaa... 💌',
    confidentialTag: "Confidential: For Bestie's Eyes Only",
    openButtonText: 'Letter Chadhavu 📖',
    closeButtonText: 'Letter Maduchuko ✉️',
    waxSealPrompt: 'Wax Seal Break Cheyyadaniki Tap Cheyyi!',
    waxSealSubtext: '(Emotional avvaku, reality check kuda untundhi 😂)',
    letterSalutation: 'Dear abhijeet,',
    letterheadTag: 'Handwritten with Love 🌸',
    paragraphs: [
      'Nijam cheppalante, nuvvu naa life lo oka special place sampadinchukunnav Abhijeet. Naa life lo naaku chaala takkuva mandi friends unnaru, neeku kuda adi telusu. Naa friends lo prathi okkaru naaku chaala important. Nenu evarini antha easy ga odhulukonu. Alantidi nenu nitho intha close avthaanani asal anukoledu. So, nuvvu nannu oddu anukunna, nenu maatram nithone unta ra. ❤️',
      'Mana silly fights, random calls, endless conversations, nee jealousy... ivanni eppatiki gurthundipoye memories Abhijeet. 😂❤️',
      'Nuvvu anukunnavanni achieve cheyyali. Eppudu happy ga undali. Life lo entha mandi vachina vellina, mana friendship matram eppatiki change avvakudadhu. Adhi naaku telusu leyyy! 🥹',
      'Thank you for being there ra. Nuvvu naaku eppatiki special. Mana bond eppatiki ilage untundhi. Tension padaku Abhijeet, nuvvu oddu anna nenu nithone maatladtha, nithone unta. Neeku telusu kadha! ❤️',
    ],
    signOff: 'Raghavii🌸',
    subSignOff: 'Always with you 🤍',
  },

  // --------------------------------------------------------------------------
  // 🎁 SECTION 7: SURPRISE GIFT & FRIENDSHIP COUPONS
  // --------------------------------------------------------------------------
  gift: {
    badge: 'Interactive Surprise Box',
    heading: 'Neekoka Surprise Undhi! 🎁',
    subtitle: 'Box meedha tap cheyyi, emundho choodu!',
    boxTapPrompt: 'Open Cheyyi pillu! 🎀',
    revealTitle: 'Surprise pillu!! 😂❤️',
    revealText: 'Gift kanna mundhu ee website motham chadivinandhuku thanks. Nuvvu naa best friend ga undadam naaku chala special.',
    couponsHeading: '🎁 BONUS: Lifetime Redeemable Bestie Coupons (Click to Redeem)',
    coupons: [
      {
        id: 'c1',
        title: 'Free Biryani Party Coupon 🍗',
        desc: 'Whenever you want, full stomach Biryani treat on me!',
        emoji: '🍛',
      },
      {
        id: 'c2',
        title: 'Unlimited Rants Listening Pass 🗣️',
        desc: 'Nee sollu, sodhi, complaints motham vintaanu without interruption!',
        emoji: '👂',
      },
      {
        id: 'c3',
        title: '1 Day No Mocking Guarantee 🤐',
        desc: 'One full day ninnu irritate cheyyakunda, roast cheyyakunda untanu!',
        emoji: '😇',
      },
      {
        id: 'c4',
        title: 'Late Night Call Support 🌙',
        desc: '2 AM aina sare call lift chesi matlade exclusive VIP access!',
        emoji: '📞',
      },
    ],
    repackButtonText: 'Malli Gift Box Pack Cheyyi 📦',
  },

  // --------------------------------------------------------------------------
  // 🎂 SECTION 8: FINAL BIRTHDAY PAGE
  // --------------------------------------------------------------------------
  cake: {
    badge: 'The Grand Birthday Wish',
    mainText: 'Happy Birthday Month Ra Mentaloda!! ❤️',
    subtitle: 'Ilage navvuthu, happy ga undu. Mana friendship ki expiry date ledhu!',
    blowButtonText: 'Candles Blow Cheyyi Ra 🎂💨',
    relightButtonText: 'Malli Candles Veliginchu 🔥',
    confettiButtonText: 'Confetti Challu 🎉',
    wishMadeTitle: 'Nee Wish Nijam Avvali !',
    wishMadeSubtext: 'Candles aarpavu, god bless you with unlimited success and happiness!',
    footerQuote: 'Once a best friend, always a best friend... Happy Birthdayy abhijeet! ❤️',
    footerSubtext: 'Crafted with all the love, silly banter & memories in the world 🌸',
  },

  // --------------------------------------------------------------------------
  // 📝 FOOTER
  // --------------------------------------------------------------------------
  footer: {
    quote: 'Best Friends forever and ever... pillu ❤️',
    themeTag: 'Made with cute pastel scrapbook theme 🌸',
    editionTag: 'Telugu-English edition',
    resetButtonText: 'Original Wishes Reset Cheyyi',
  },
};
