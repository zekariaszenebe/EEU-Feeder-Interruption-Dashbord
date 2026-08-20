// Dictionary and helper utilities for bilingual (Amharic & English)
// EEU Feeder Landmarks, Substation Communities, and Neighborhood names

export type LanguageMode = 'en' | 'am';

// Comprehensive dictionary of Amharic landmark names to English spelling
export const AMHARIC_TO_ENGLISH_DICT: Record<string, string> = {
  // Common Structural Words & Suffixes
  'ሕንጻ': 'Building',
  'ሕንፃ': 'Building',
  'ሆቴል': 'Hotel',
  'ሆል': 'Hotel',
  'ሆስፒታል': 'Hospital',
  'ክሊኒክ': 'Clinic',
  'ት/ቤት': 'School',
  'ትምህርት ቤት': 'School',
  'ዩኒቨርስቲ': 'University',
  'ዩኒቨርሲቲ': 'University',
  'ኮሌጅ': 'College',
  'ቤ/ክ': 'Church',
  'ቤ/ክርስቲያን': 'Church',
  'ቤተክርስቲያን': 'Church',
  'መስጊድ': 'Mosque',
  'ኮንዶሚኒየም': 'Condominium',
  'ኮንዶሚንየም': 'Condominium',
  'ኮንዶኒየም': 'Condominium',
  'ፋብሪካ': 'Factory',
  'ፋበሪካ': 'Factory',
  'መናፈሻ': 'Park',
  'ፓርክ': 'Park',
  'ገበያ': 'Market',
  'አደባባይ': 'Square',
  'መንደር': 'Village',
  'ሰፈር': 'Neighborhood',
  'ሰፈራ': 'Settlement',
  'መንገድ': 'Road / Street',
  'አካባቢ': 'Area',
  'አካባቢው': 'Vicinity',
  'ጀርባ': 'Behind',
  'በስተጀርባ': 'Behind',
  'ፊትለፊት': 'In front of',
  'ፊትላፊት': 'In front of',
  'ጎን': 'Beside',
  'አጠገብ': 'Near',
  'ድልድይ': 'Bridge',
  'ወፍጮ': 'Mill',
  'ቄራ': 'Abattoir (Kera)',
  'በረንዳ': 'Veranda / Market',
  'ተራ': 'Row / Market',
  'ማዞሪያ': 'Turning / Roundabout',
  'ማዕከል': 'Center',
  'መጋዘን': 'Warehouse',
  'ጋራዥ': 'Garage',
  'ጋራጨዥ': 'Garage',
  'ጣቢያ': 'Station',
  'ጣቢ': 'Station',
  'ሴንተር': 'Center',
  'ፍርድ ቤት': 'Court',
  'መኖሪያ': 'Residence',
  'ቤቶች': 'Houses',
  'ማህበር': 'Association',
  'ማሕበር': 'Association',
  'ማህበራት': 'Associations',
  'ክበብ': 'Club',
  'መከላከያ': 'Defense',
  'ካምፕ': 'Camp',
  'ፖሊስ': 'Police',
  'እሳት አደጋ': 'Fire Emergency',
  'ውኃ': 'Water',
  'ውሀ': 'Water',
  'ውሃ': 'Water',
  'ግድብ': 'Dam',
  'ፍሳሽ': 'Sewerage',
  'ማጣሪያ': 'Treatment Plant',
  'ቆዳ': 'Leather',
  'ብረታ ብረት': 'Metal Works',
  'ዳቦ': 'Bakery',
  'ቡና': 'Coffee',
  'ባንክ': 'Bank',
  'ቴሌ': 'Telecom',
  'መብራት ኃይል': 'Electric Utility',
  'ሰብስቴሽን': 'Substation',
  'ሰብስቴ': 'Substation',
  'ማከፋፈያ': 'Distribution',
  'መናኸሪያ': 'Bus Station',
  'ኤምባሲ': 'Embassy',
  'ኤምበሲ': 'Embassy',
  'ከተማ': 'Town / City',
  'ማዘጋጃ': 'Municipality',
  'ማዘጋጃ ቤት': 'City Hall',
  'መስተዳደር': 'Administration',
  'ኢንዱስትሪ': 'Industry',
  'ኢንዱስት': 'Industry',
  'ሪል እስቴት': 'Real Estate',
  'ሪልኤስቴት': 'Real Estate',
  'ሪልስቴት': 'Real Estate',
  'ሞል': 'Mall',
  'ፕላዛ': 'Plaza',
  'ካፌ': 'Cafe',
  'ሬስቶራንት': 'Restaurant',
  'ዳታ ሴንተር': 'Data Center',
  'ስቶር': 'Store',
  'ዴዲኬትድ': 'Dedicated Line',
  'ስታዲየም': 'Stadium',
  'ኦቨርፓስ': 'Overpass',
  'ቤተመንግስት': 'Palace',
  'ቤተ መንግስት': 'Palace',
  'ቤ/መንግስት': 'Palace',
  'ፓርላማ': 'Parliament',
  'ኬላ': 'Checkpoint',
  'እርባታ': 'Farm',

  // Major Sub-cities & Neighborhoods
  'ሜክሲኮ': 'Mexico',
  'ለገሐር': 'Legehar',
  'ለገሃር': 'Legehar',
  'ፍላሚንጎ': 'Flamingo',
  'ኦሎምፒያ': 'Olympia',
  'ደንበል': 'Dembel',
  'ቦሌ': 'Bole',
  'ፒኮክ': 'Peacock',
  'ገነት': 'Genet',
  'ልደታ': 'Lideta',
  'ሳር ቤት': 'Sar Bet',
  'ሳርቤት': 'Sar Bet',
  'ቂርቆስ': 'Kirkos',
  'ጨርቆስ': 'Cherkos',
  'ፖፖላሬ': 'Popolare',
  'ካሳንቺስ': 'Kazanchis',
  'ካዛንቺስ': 'Kazanchis',
  'ሾላ': 'Shola',
  'የካ': 'Yeka',
  'መገናኛ': 'Megenagna',
  'ጎላጎል': 'Golagol',
  'አድዋ': 'Adwa',
  'ባልደራስ': 'Balderas',
  'አቧሬ': 'Abware',
  'ቤለር': 'Beler',
  'አትላስ': 'Atlas',
  'ሻላ': 'Shala',
  'ሩዋንዳ': 'Rwanda',
  'ቀጨኔ': 'Kechene',
  'ሽሮ ሜዳ': 'Shiro Meda',
  'ሽሮሜዳ': 'Shiro Meda',
  'ላዛሪስት': 'Lazarist',
  '6 ኪሎ': '6 Kilo',
  'ስድስት ኪሎ': '6 Kilo',
  '4 ኪሎ': '4 Kilo',
  'አራት ኪሎ': '4 Kilo',
  '10 ኪሎ': '10 Kilo',
  'አፍንጮ በር': 'Afincho Ber',
  'ደጃች ውቤ': 'Dejach Wube',
  'ጊዮርጊስ': 'St. George (Giorgis)',
  'ሰሜን': 'North',
  'ደቡብ': 'South',
  'ምስራቅ': 'East',
  'ምሥራቅ': 'East',
  'ምዕራብ': 'West',
  'ሸገር': 'Sheger',
  'ዕንቁላል': 'Enkulal',
  'ሩፋኤል': 'St. Rufael',
  'ፓስተር': 'Pasteur',
  'አቤት': 'AaBET',
  'አራብሳ': 'Arabsa',
  'በሻሌ': 'Beshale',
  'ሰሚት': 'Summit',
  'ኮልፌ': 'Kolfe',
  'ታይዋን': 'Taiwan',
  'እህል': 'Grain',
  'አውቶብስ': 'Autobus',
  'አዲስ ከተማ': 'Addis Ketema',
  'አማኑኤል': 'Amanuel',
  'አማኔኤል': 'Amanuel',
  'ብርጭቆ': 'Birchiko (Glass)',
  'አስኮ': 'Asko',
  'ቀራንዮ': 'Keranyo',
  'ቀራኒዮ': 'Keranyo',
  'ቤተል': 'Bethel',
  'ጦር ኃሎች': 'Tor Hailoch (Armed Forces)',
  'ጦርኃይሎች': 'Tor Hailoch',
  'ወይራ': 'Weyra',
  'አንፎ': 'Anfo',
  'አለም ባንክ': 'Alem Bank',
  'ዓለም ባንክ': 'Alem Bank',
  'ዓለምገና': 'Alem Gena',
  'አለምገና': 'Alem Gena',
  'አቃቂ': 'Akaki',
  'አያት': 'Ayat',
  'መሪ': 'Meri',
  'ጀርመን': 'German',
  'ቤላ': 'Bella',
  'ሚኒሊክ': 'Menelik II',
  'ፈረንሳይ': 'French / Ferensay',
  'ጉራራ': 'Gurara',
  'ጉለሌ': 'Gullele',
  'እንጦጦ': 'Entoto',
  'መርካቶ': 'Merkato',
  'አብነት': 'Abnet',
  'ተ/ኃይማኖት': 'Teklehaimanot',
  'ተ/ሃይማኖት': 'Teklehaimanot',
  'ተክለሃይማኖት': 'Teklehaimanot',
  'አትክልት': 'Vegetable (Atkilt)',
  'ጣሊያን': 'Italy / Italian',
  'ፒያሳ': 'Piazza',
  'ሰንጋተራ': 'Senga Tera',
  'ሰንጋ ተራ': 'Senga Tera',
  'ጥቁር አንበሳ': 'Tikur Anbessa (Black Lion)',
  'ኩባ': 'Cuba',
  'አምባሳደር': 'Ambassador',
  'ሸራተን': 'Sheraton',
  'ባሻወልዴ': 'Basha Wolde',
  'ቱሪስት': 'Tourist',
  'ባላቻ': 'Balcha',
  'ኮተቤ': 'Kotebe',
  'ላምበረት': 'Lamberet',
  'ጉርድ ሾላ': 'Gurd Shola',
  'ሲቪል ሰርቪስ': 'Civil Service',
  'ፊጋ': 'Figa',
  'ጎሮ': 'Goro',
  'ካራ': 'Kara',
  'አባዶ': 'Abado',
  'ሳሊተ ምሕረት': 'Salite Mehret',
  'ሳሊተምሕረት': 'Salite Mehret',
  'ሲኤምሲ': 'CMC',
  'ገፈርሳ': 'Gefersa',
  'ታጠቅ': 'Tatek',
  'ቡራዩ': 'Burayu',
  'ቡራዪ': 'Burayu',
  'ገላን': 'Gelan',
  'ቱሉዲምቱ': 'Tulu Dimtu',
  'ቱሉ ዲምቱ': 'Tulu Dimtu',
  'ዱከም': 'Dukem',
  'ቃሊቲ': 'Kaliti',
  'ጎፋ': 'Gofa',
  'ላፍቶ': 'Lafto',
  'መካኒሳ': 'Mekanisa',
  'ባቱ': 'Batu',
  'ቄሊንጦ': 'Kilinto',
  'ቂሊንጦ': 'Kilinto',
  'ጨፌ': 'Chefe',
  'ቡልቡላ': 'Bulbula',
  'ሳሪስ': 'Saris',
  'ፋፋ': 'Fafa',
  'አደይ አበባ': 'Adey Abeba',
  'ኮዬ': 'Koye',
  'ኮዬ ፈጬ': 'Koye Feche',
  'ለገጣፎ': 'Legetafo',
  'ለገዳዲ': 'Legedadi',
  'ሰንዳፋ': 'Sendafa',
  'ሃና ማርያም': 'Hana Maryam',
  'ሐና ማርያም': 'Hana Maryam',
  'ለቡ': 'Lebu',
  'ጀሞ': 'Jemo',
  'ቆሼ': 'Koshe',
  'ኃይሌ ጋርመንት': 'Haile Garment',
  'ሐይሌ ጋርመንት': 'Haile Garment',
  'ንፋስ ስልክ': 'Nifas Silk',
  'ንፋስልክ': 'Nifas Silk',
  'ጎተራ': 'Gotera',
  'ወሎ ሰፈር': 'Wollo Sefer',
  'ላንቻ': 'Lancha',
  'በቅሎ ቤት': 'Beklo Bet',
  'ሪቼ': 'Riche',
  'ረጲ': 'Repi',
  'ሰበታ': 'Sebeta',
  'ሸጎሌ': 'Shegole',
  'ዊንጌት': 'Wingate',
  'ሱሉልታ': 'Sululta',
  'ወረገኑ': 'Weregenu',
  'ገርጂ': 'Gerji',
  'ጃክሮስ': 'Jackros',
  'አየር ጤና': 'Ayer Tena',
  'አየርጤና': 'Ayer Tena',
  'አየር መንገድ': 'Airlines / Airport',
  'ዊጃን': 'Wijan',
  'ሰባተኛ': 'Sebategna',
  'አጠና': 'Atena',
  'አሸዋ': 'Ashewa',
  'አሸዋ ሜዳ': 'Ashewa Meda',
  'ቀይ ባህር': 'Red Sea',
  'ዘነበወርቅ': 'Zenebework',
  'ፉሪ': 'Furi',
  'ወለቴ': 'Welete',
  'ካራቆ': 'Karakore',
  'ካራቆሬ': 'Karakore',

  // Landmark names & Specific buildings
  'ደብረወርቅ': 'Debrework',
  'ኤግዝቢሽን': 'Exhibition',
  'ፐርፕል': 'Purple',
  'አስቴር': 'Aster',
  'አይናለም በዜ': 'Aynalem Beze',
  'ኮካኮላ': 'Coca-Cola',
  'ኮካ': 'Coca-Cola',
  'ኢዩበልዩ': 'Jubilee',
  'ኢትዮጵያ': 'Ethiopia',
  'ኢቢሲ': 'EBC',
  'አፍሪካ ሕብረት': 'African Union (AU)',
  'መቻሬ': 'Mechare',
  'ላምሮት': 'Lamrot',
  'ቤተዛታ': 'Bethzatha',
  'ኦሮሚያ': 'Oromia',
  'ባሕል': 'Cultural',
  'ጊዮን': 'Ghion',
  'እስጢፋኖስ': 'St. Stephen (Estifanos)',
  'ኃይለ ዓለም': 'Haile Alem',
  'ዘፍመሽ': 'Zefmesh',
  'መክሊት': 'Meklit',
  'ዳውን ታውን': 'Downtown',
  'አውራሪስ': 'Awraris',
  'ካልዲስ': 'Kaldi\'s',
  'መድሓኒዓለም': 'Medhanialem',
  'መድኃኔዓለም': 'Medhanialem',
  'ሲግናል': 'Signal',
  'ሳንፎርድ': 'Sandford',
  'ኤስኦኤስ': 'SOS',
  'ደሳለኝ': 'Desalegn',
  'ፕሬዚደንሺያል': 'Presidential',
  'ሴቶች': 'Women\'s (Setoch)',
  'ሂልተን': 'Hilton',
  'ኢንተርኮንትኔንታል': 'Intercontinental',
  'ሐናን': 'Hanan',
  'ኢሊሌ': 'Elilly',
  'እናት': 'Enat',
  'ማርቆስ': 'Markos',
  'ጵጥሮስ': 'St. Peter',
  'ጸሐይ ጮራ': 'Tsehay Chora',
  'ስፓኒሽ': 'Spanish',
  'ተፈሪ መኮንን': 'Teferi Mekonnen',
  'ዳዊት': 'Dawit',
  'አባዲና': 'Abadina',
  'ቀለመወርቅ': 'Kelemework',
  'ራስ ደስታ': 'Ras Desta',
  'አርበኞች': 'Arbegnoch (Patriots)',
  'ሀግቤስ': 'Hagbes',
  'ጎጃም': 'Gojjam',
  'ጅንአድ': 'Jinad',
  'አበበች ጎበና': 'Abebech Gobena',
  'ዮሐንስ': 'St. John (Yohannes)',
  'ሰን': 'Sun',
  'አይ.ሲ.ቲ.': 'ICT',
  'ፔፕሲ': 'Pepsi',
  'ሰንራይዝ': 'Sunrise',
  'አትለቶች': 'Athletes',
  'ኢትዮ ጠቢብ': 'Ethio Tebib',
  'ሻወል ደማ': 'Shawel Dema',
  'ፊሊጶስ': 'St. Philippos',
  'እስላም': 'Muslim',
  'መቃብር': 'Cemetery',
  'ሎሚ ሜዳ': 'Lomi Meda',
  'ጠሮ': 'Tero',
  'መኮንኖች': 'Officers',
  'ገዳመ ኢየሱስ': 'Gedame Eyesus',
  'ወይብላ ማርያም': 'Weybla Maryam',
  'አውጉስታ': 'Augusta',
  'ሞቢል': 'Mobil',
  'ራሺያ': 'Russia',
  'ተዘንአ': 'Tezena',
  'ዲያስፖራ': 'Diaspora',
  'ፊሊደሮ': 'Filidero',
  'ተኩሼ': 'Tekushe',
  'ቤጂንግ': 'Beijing',
  'አበበ ጎንፋ': 'Abebe Gonfa',
  'ብሩህ ተስፋ': 'Biruh Tesfa',
  'ኮፊ ሲቲ': 'Coffee City',
  'ኢንዲያና': 'Indiana',
  'ኢነዲያና': 'Indiana',
  'ፀሐይ': 'Tsehay',
  'አሉላ': 'Alula',
  'ጎህ': 'Goh',
  'ፋኑኤል': 'St. Fanuel',
  'ኬንያ': 'Kenya',
  'እንግሊዝ': 'British',
  'ጣሊያን ኤምባሲ': 'Italian Embassy',
  'ፈረንሳይ ኤምባሲ': 'French Embassy',
  'ኪዩር': 'CURE',
  'አቦ': 'Abbo',
  'ኪዳነምሕረት': 'Kidanemehret',
  'ኪዳነምህረት': 'Kidanemehret',
  'ኪደነምህረት': 'Kidanemehret',
  'ግብፅ': 'Egyptian',
  'የካቲት 12': 'Yekatit 12',
  'ኤፍቢ': 'FBI',
  'ናይጄሪያ': 'Nigerian',
  'ሞላ ማሩ': 'Molla Maru',
  'በርበሬ': 'Berbere (Pepper)',
  'ዲአፍሪካ': 'D\'Afrique',
  'ደሴ': 'Dessie',
  'ደቡብ አፍሪካ': 'South Africa',
  'ኢፋርም': 'Epharm',
  'ጆሳንሰን': 'Johnson',
  'ፍየል ቤት': 'Fiyel Bet',
  'ጆርጅ': 'George',
  'ሜታ': 'Meta',
  'ሰንሻይን': 'Sunshine',
  'አይ.ሲ.ኤም .ሲ': 'ICMC',
  'አይሲኤምሲ': 'ICMC',
  'መንገሻ': 'Mengesha',
  'ቶፕ': 'Top',
  'ሙገር': 'Muger',
  'ሲሚንቶ': 'Cement',
  'አኔ ዲማ': 'Ane Dima',
  'ወጣቢቻ': 'Wetabicha',
  'ጉዱ': 'Gudu',
  'ሙሎ': 'Mulo',
  'ከሚሴ': 'Kemise',
  'ሪፍት ቫሊ': 'Rift Valley',
  'ፀርሐ ፅዮን': 'Tserha Tsion',
  'ወለጋ': 'Wollega',
  'ቶልቻ': 'Tolcha',
  'ሲሊ': 'Sili',
  'ከረላ': 'Kerela',
  'መናገሻ': 'Menagesha',
  'ባቡር': 'Train / Railway',
  'ሐዲድ': 'Track',
  'ሲዳሞ አዋሽ': 'Sidamo Awash',
  'ገንደ ቆሬ': 'Gende Kore',
  'ገመዳ': 'Gemeda',
  'ወሰርቢ': 'Woserbi',
  'በላይነህ ክንዴ': 'Belayneh Kinde',
  'ካፍ': 'KAF',
  'አባሳሙኤል': 'Abba Samuel',
  'አቡሴራ': 'Abusera',
  'ሉግና': 'Lugna',
  'ደበራ ጢኖ': 'Debera Tino',
  'ሻሸመኔ': 'Shashemene',
  'አርትስቲ': 'Artisti',
  'ነጮ': 'Necho',
  'ኖክ': 'NOC',
  'ማንጎ': 'Mango',
  'ማረሚያ': 'Correctional (Prisons)',
  'አልማዝዬ': 'Almaziye',
  'ሶፊያ': 'Sofia',
  'ሐመልማል': 'Hamelmal',
  'በረት': 'Beret (Corral)',
  'ሶፉመር': 'Sofumar',
  'ብሎኬት': 'Block (Hollow Block)',
  'መካነ ኢየሱስ': 'Mekane Yesus',
  'አረቄ': 'Areke',
  'አሚጎ': 'Amigo',
  'ቫቲካን': 'Vatican',
  'ጥቁር አባይ': 'Tikur Abay (Blue Nile)',
  'ሰላም አስከባሪ': 'Peacekeeping',
  'ጥቃቅንና አነስተኛ': 'Micro & Small Enterprise',
  'ዶምቦስኮ': 'Don Bosco',
  'ዩኒቲ': 'Unity',
  'አንበሳ': 'Anbessa',
  'ጉራጌ': 'Gurage',
  'ትግሬ': 'Tigray / Tigre',
  'ኔዳጅ': 'Fuel',
  'ቼራሊያ': 'Cheralia',
  'ዩሮ ኬብል': 'Euro Cable',
  'መኮድ': 'Mekod',
  'ብሔራዊ': 'National',
  'ኬኬ': 'KK',
  'ብርድ ልብስ': 'Blanket',
  'አስቱ': 'ASTU',
  'ዋልያ': 'Walia',
  'ቢራ': 'Beer',
  'ማሩ': 'Maru',
  'ቁስቋም': 'Kuskuam',
  'ደራርቱ': 'Derartu',
  'አየር ኃይል': 'Air Force',
  'ወርቁ': 'Worku',
  'ትራንስፖርት': 'Transport',
  'ጣና': 'Tana',
  'ድርሊንግ': 'Drilling',
  'ኢትዮቤቶን': 'Ethio Beton',
  'ግንቦት 20': 'Ginbot 20',
  'ስላሴ': 'Holy Trinity (Selassie)',
  'ነጋ ቦንገር': 'Nega Bonger',
  'ጀሶ': 'Gypsum / Gesso',
  'ብሔረፅጌ': 'Bihere Tsige',
  'ፓስታና መኮረኒ': 'Pasta & Macaroni',
  'አዲስ ጎማ': 'Addis Tyre',
  'ሸራና ፕላስቲክ': 'Canvas & Plastic',
  'ማርያም': 'St. Mary (Maryam)',
  'አዋሽ': 'Awash',
  'ባሌስትራ': 'Spring (Balestra)',
  'ቅመማ ቅመም': 'Spices',
  'ልማት ተነሺዎች': 'Resettlement Area',
  'ኔትዎርክ': 'Network',
  'ፋንታ': 'Fanta',
  'ፈጬ': 'Feche',
  'ክፍያ ጣቢያ': 'Toll Gate',
  'ጂፕሰም': 'Gypsum',
  'ጣፎ': 'Tafo',
  'ፈረስ ቤት': 'Feres Bet',
  'መቄዶኒያ': 'Macedonia (Mekedonia)',
  'መቄዶኒ': 'Macedonia',
  'ፀበል': 'Holy Water (Tsebel)',
  'ወሰን': 'Wesen',
  'ካራሎ': 'Karalo',
  'ዙሪያሽ': 'Zuriash',
  'ለሚ ኩራ': 'Lemi Kura',
  'ንቡ ሚካኤል': 'Nibu Michael',
  'የካሰዴ': 'Yekasede',
  'ጥሩ': 'Tiru',
  'ኤሞሌስ': 'Emoles',
  'አብርሃሙ': 'Abrihamu',
  'ምስራቀ ገብርኤል': 'Misrake Gabriel',
  'ናሆም': 'Nahom',
  'ካቶሊክ': 'Catholic',
  'የሺ': 'Yeshi',
  'ቡ ሙዚቃ': 'Bu Muzika',
  'ሶል': 'Sole',
  'ዮበክ': 'Yobek',
  'መምሪያ': 'Department / HQ',
  'አርባምንጭ': 'Arba Minch',
  'አሳ': 'Fish',
  'ፏፏቴ': 'Fwafwate',
  'ክትፎ': 'Kitfo',
  'ዕውቀት ፋና': 'Ewket Fana',
  'ወንጌላዊት': 'Wongelawit',
  'ዩኒማክ': 'Unimac',
  'መስቀል ፍላውር': 'Meskel Flower',
  'መስቀል': 'Meskel',
  'ተሻላ': 'Teshale',
  'ዳኞችና አቃቢ ሕግ': 'Judges & Prosecutors Office',
  'ኮስሞስ': 'Cosmos',
  'ድሪም ላይነር': 'Dreamliner',
  'አይቤክስ': 'Ibex',
  'ተባበር በርታ': 'Tebaber Berta',
  'ጃፓን': 'Japan',
  'መስማት የተሳናቸው': 'Deaf Association',
  'ዓለም': 'Alem',
  'ሲኒማ': 'Cinema',
  'ፍሬንድሺፕ': 'Friendship',
  'ለንደን': 'London',
  'ሚሊኒየም': 'Millennium',
  'አዳራሽ': 'Hall',
  'ሚክዌር': 'Micware',
  'ማንዴላ': 'Mandela',
  'ፈለገ ዮርዳኖስ': 'Felege Yordanos',
  'ቡና ቦርድ': 'Coffee Board',
  'ዳቺያ': 'Dacia',
  'ያኮር': 'Yakor',
  'ካርታ ስራዎች': 'Mapping Agency',
  'ራዳር': 'Radar',
  'ቻይና': 'China / Chinese',
  'ከሬሸር': 'Crusher',
  'ገስላ': 'Gesla',
  'ካዲስኮ': 'Kadisco',
  'ቀለሞች': 'Paints',
  'ዮሴፍ': 'St. Joseph',
  'ጃማይካ': 'Jamaica',
  'ጫማ': 'Shoes',
  'ሼል': 'Shell',
  'ዲፖ': 'Depot',
  'ቱቦ': 'Pipe',
  'ፋና': 'Fana',
  'ሬዲዮ': 'Radio',
  'ኖህ': 'Noah',
  'ካፒታል': 'Capital',
  'ሳሚ': 'Sami',
  'መሐንዲስ': 'Engineers',
  'ስልጤ': 'Silte',
  'አጃንባ': 'Ajanba',
  'አይካ': 'Ayka',
  'ሃጂ': 'Haji',
  'ወርዶፋ': 'Wordofa',
  'ሎጅ': 'Lodge',
  'ዳርፉር': 'Darfur',
  'ስላ': 'Sila',
  'ናትራን': 'Natran',
  'ለማ ነገዎ': 'Lema Negewo',
  'ግራር': 'Grar',
  'የስ': 'Yes',
  'ማርስ': 'Mars',
  'ብስኩት': 'Biscuit',
  'ቢኤምቲ': 'BMT',
  'አልሳም': 'Alsam',
  'አቀበና': 'Akebena',
  'ዲማ': 'Dima',
  'ተፍኪ': 'Tefki',
  'ተጂ': 'Teji',
  'ሁላሳ': 'Hulasa',
  'ኩምቴክ': 'Kumtek',
  'ጌጃ': 'Geja',
  'ዋን': 'One (Wan)',
  'አባሃዋ': 'Abahawa',
  'አወልያ': 'Awoliya',
  'ካኦጄጄ': 'KOJJ',
  'አበነሃብተማርያም': 'Abene Habtemaryam',
  'ሳንሱሲ': 'Sans Souci',
  'እያሱ': 'Eyasu',
  'ኢራን': 'Iran',
  'ጋዝ': 'Gas',
  'ድሬ': 'Dire',
  'በረኪና': 'Bleach (Berekina)',
  'ሾሌ': 'Shole',
  'አበበ ቢቂላ': 'Abebe Bikila',
  'ኳስ ሜዳ': 'Football Field',
  'ፊናንስ': 'Finance',
  'ፅዮን': 'Tsion',
  'መርሐቤቴ': 'Merhabete',
  'በላይ ዘለቀ': 'Belay Zeleke',
  'ድልበር': 'Dilber',
  'አትሌት': 'Athletes',
  'ሚዛን': 'Mizan',
  'ስፔስ ሳይንስ': 'Space Science',
  'ሽንቁሩ': 'Shinkuru',
  'አካኮ': 'Akako',
  'ቀንብሬ': 'Kenbire',
  'አርኪ': 'Arki',
  'ጫንጮ': 'Chancho',
  'ኮሶ በር': 'Koso Ber',
  'አብሽሮ': 'Abshiro',
  'ኤድናሞል': 'Edna Mall',
  'ቶቶት': 'Totot',
  'ኢምፔርያል': 'Imperial',
  'ኢምፔሪያል': 'Imperial',
  'ኮከብ': 'Kokeb (Star)',
  'ብሉ ስካይ': 'Blue Sky',
  'ፍሊንት ስቶን': 'Flintstone',
  'ዓለማየሁ': 'Alemayehu',
  'አጣና': 'Timber (Atana)',
  'መምህራን': 'Teachers',
  'እንጦጦ ፓርክ': 'Entoto Park',
  'አዋሽ ወይን': 'Awash Wine'
};

// Clean Amharic punctuation and helper terms
export function cleanAmharicItem(text: string): string {
  return text
    .replace(/[፣、፤,;።]+/g, '')
    .replace(/^(እና|ወደ|በ|ከ|ለ)\s+/g, '')
    .trim();
}

/**
 * Translates an Amharic location or sentence to English spelling.
 * If the input already contains Latin/English letters, it handles it smoothly.
 */
export function translateAmharicLocation(rawText: string): string {
  if (!rawText || !rawText.trim()) return '';

  // Check if text already has English slash format: "Amharic / English"
  if (rawText.includes('/') && /[a-zA-Z]/.test(rawText)) {
    const parts = rawText.split('/');
    if (parts.length >= 2 && /[a-zA-Z]/.test(parts[1])) {
      return parts[1].trim();
    }
  }

  // Split by common delimiters (Amharic comma, Ethiopic semicolon, English comma)
  const segments = rawText.split(/[፣、፤,;]+/);
  const translatedSegments: string[] = [];

  for (let segment of segments) {
    let cleanSeg = segment.trim();
    if (!cleanSeg) continue;

    // Check if segment is purely Latin/English already
    if (!/[\u1200-\u137F]/.test(cleanSeg)) {
      translatedSegments.push(cleanSeg);
      continue;
    }

    // Direct dictionary lookup for exact or sub-phrases
    let translated = cleanSeg;
    let matchFound = false;

    // Check full phrase match
    const lookupKey = cleanSeg.replace(/።+$/, '').trim();
    if (AMHARIC_TO_ENGLISH_DICT[lookupKey]) {
      translatedSegments.push(AMHARIC_TO_ENGLISH_DICT[lookupKey]);
      continue;
    }

    // Replace known multi-word phrases and words within the segment
    const words = cleanSeg.split(/\s+/);
    const translatedWords: string[] = [];
    let i = 0;

    while (i < words.length) {
      let matched = false;

      // Try 3-word match
      if (i + 2 < words.length) {
        const threeWords = `${cleanAmharicItem(words[i])} ${cleanAmharicItem(words[i+1])} ${cleanAmharicItem(words[i+2])}`;
        if (AMHARIC_TO_ENGLISH_DICT[threeWords]) {
          translatedWords.push(AMHARIC_TO_ENGLISH_DICT[threeWords]);
          i += 3;
          matched = true;
          matchFound = true;
          continue;
        }
      }

      // Try 2-word match
      if (i + 1 < words.length) {
        const twoWords = `${cleanAmharicItem(words[i])} ${cleanAmharicItem(words[i+1])}`;
        if (AMHARIC_TO_ENGLISH_DICT[twoWords]) {
          translatedWords.push(AMHARIC_TO_ENGLISH_DICT[twoWords]);
          i += 2;
          matched = true;
          matchFound = true;
          continue;
        }
      }

      // Try 1-word match
      const oneWord = cleanAmharicItem(words[i]);
      if (AMHARIC_TO_ENGLISH_DICT[oneWord]) {
        translatedWords.push(AMHARIC_TO_ENGLISH_DICT[oneWord]);
        i += 1;
        matched = true;
        matchFound = true;
        continue;
      }

      // Handle common Amharic prefix prepositions: በ (in/at), ከ (from), ወደ (towards), ለ (for)
      if (oneWord.startsWith('በ') && oneWord.length > 2 && AMHARIC_TO_ENGLISH_DICT[oneWord.substring(1)]) {
        translatedWords.push(`At ${AMHARIC_TO_ENGLISH_DICT[oneWord.substring(1)]}`);
        i += 1;
        matched = true;
        matchFound = true;
        continue;
      }
      if (oneWord.startsWith('ከ') && oneWord.length > 2 && AMHARIC_TO_ENGLISH_DICT[oneWord.substring(1)]) {
        translatedWords.push(`From ${AMHARIC_TO_ENGLISH_DICT[oneWord.substring(1)]}`);
        i += 1;
        matched = true;
        matchFound = true;
        continue;
      }
      if (oneWord.startsWith('ወደ') && oneWord.length > 3 && AMHARIC_TO_ENGLISH_DICT[oneWord.substring(2)]) {
        translatedWords.push(`Towards ${AMHARIC_TO_ENGLISH_DICT[oneWord.substring(2)]}`);
        i += 1;
        matched = true;
        matchFound = true;
        continue;
      }

      // Fallback: Transliterate word using phonetic character mapping
      const transliterated = phoneticTransliterate(words[i]);
      translatedWords.push(transliterated);
      i += 1;
    }

    if (translatedWords.length > 0) {
      translatedSegments.push(translatedWords.join(' '));
    }
  }

  return translatedSegments.join(', ');
}

// Phonetic fallback for Ethiopic Fidel syllables to Latin script
const FIDEL_PHONETIC: Record<string, string> = {
  'ሀ': 'he', 'ሁ': 'hu', 'ሂ': 'hi', 'ሃ': 'ha', 'ሄ': 'hie', 'ህ': 'h', 'ሆ': 'ho',
  'ለ': 'le', 'ሉ': 'lu', 'ሊ': 'li', 'ላ': 'la', 'ሌ': 'lie', 'ል': 'l', 'ሎ': 'lo',
  'ሐ': 'he', 'ሑ': 'hu', 'ሒ': 'hi', 'ሓ': 'ha', 'ሔ': 'hie', 'ሕ': 'h', 'ሖ': 'ho',
  'መ': 'me', 'ሙ': 'mu', 'ሚ': 'mi', 'ማ': 'ma', 'ሜ': 'mie', 'ም': 'm', 'ሞ': 'mo',
  'ሠ': 'se', 'ሡ': 'su', 'ሢ': 'si', 'ሣ': 'sa', 'ሤ': 'sie', 'ሥ': 's', 'ሦ': 'so',
  'ረ': 're', 'ሩ': 'ru', 'ሪ': 'ri', 'ራ': 'ra', 'ሬ': 'rie', 'ር': 'r', 'ሮ': 'ro',
  'ሰ': 'se', 'ሱ': 'su', 'ሲ': 'si', 'ሳ': 'sa', 'ሴ': 'sie', 'ስ': 's', 'ሶ': 'so',
  'ሸ': 'she', 'ሹ': 'shu', 'ሺ': 'shi', 'ሻ': 'sha', 'ሼ': 'shie', 'ሽ': 'sh', 'ሾ': 'sho',
  'ቀ': 'ke', 'ቁ': 'ku', 'ቂ': 'ki', 'ቃ': 'ka', 'ቄ': 'kie', 'ቅ': 'k', 'ቆ': 'ko',
  'በ': 'be', 'ቡ': 'bu', 'ቢ': 'bi', 'ባ': 'ba', 'ቤ': 'bie', 'ብ': 'b', 'ቦ': 'bo',
  'ተ': 'te', 'ቱ': 'tu', 'ቲ': 'ti', 'ታ': 'ta', 'ቴ': 'tie', 'ት': 't', 'ቶ': 'to',
  'ቸ': 'che', 'ቹ': 'chu', 'ቺ': 'chi', 'ቻ': 'cha', 'ቼ': 'chie', 'ች': 'ch', 'ቾ': 'cho',
  'ኀ': 'he', 'ኁ': 'hu', 'ኂ': 'hi', 'ኃ': 'ha', 'ኄ': 'hie', 'ኅ': 'h', 'ኆ': 'ho',
  'ነ': 'ne', 'ኑ': 'nu', 'ኒ': 'ni', 'ና': 'na', 'ኔ': 'nie', 'ን': 'n', 'ኖ': 'no',
  'ኘ': 'gne', 'ኙ': 'gnu', 'ኚ': 'gni', 'ኛ': 'gna', 'ኜ': 'gnie', 'ኝ': 'gn', 'ኞ': 'gno',
  'አ': 'a', 'ኡ': 'u', 'ኢ': 'i', 'ኣ': 'a', 'ኤ': 'e', 'እ': 'e', 'ኦ': 'o',
  'ከ': 'ke', 'ኩ': 'ku', 'ኪ': 'ki', 'ካ': 'ka', 'ኬ': 'kie', 'ክ': 'k', 'ኮ': 'ko',
  'ኸ': 'he', 'ኹ': 'hu', 'ኺ': 'hi', 'ኻ': 'ha', 'ኼ': 'hie', 'ኽ': 'h', 'ኾ': 'ho',
  'ወ': 'we', 'ዉ': 'wu', 'ዊ': 'wi', 'ዋ': 'wa', 'ዌ': 'wie', 'ው': 'w', 'ዎ': 'wo',
  'ዐ': 'a', 'ዑ': 'u', 'ዒ': 'i', 'ዓ': 'a', 'ዔ': 'e', 'ዕ': 'e', 'ዖ': 'o',
  'ዘ': 'ze', 'ዙ': 'zu', 'ዚ': 'zi', 'ዛ': 'za', 'ዜ': 'zie', 'ዝ': 'z', 'ዞ': 'zo',
  'ዠ': 'zhe', 'ዡ': 'zhu', 'ዢ': 'zhi', 'ዣ': 'zha', 'ዤ': 'zhie', 'ዥ': 'zh', 'ዦ': 'zho',
  'የ': 'ye', 'ዩ': 'yu', 'ዪ': 'yi', 'ያ': 'ya', 'ዬ': 'yie', 'ይ': 'y', 'ዮ': 'yo',
  'ደ': 'de', 'ዱ': 'du', 'ዲ': 'di', 'ዳ': 'da', 'ዴ': 'die', 'ድ': 'd', 'ዶ': 'do',
  'ጀ': 'je', 'ጁ': 'ju', 'ጂ': 'ji', 'ጃ': 'ja', 'ጄ': 'jie', 'ጅ': 'j', 'ጆ': 'jo',
  'ገ': 'ge', 'ጉ': 'gu', 'ጊ': 'gi', 'ጋ': 'ga', 'ጌ': 'gie', 'ግ': 'g', 'ጎ': 'go',
  'ጠ': 'te', 'ጡ': 'tu', 'ጢ': 'ti', 'ጣ': 'ta', 'ጤ': 'tie', 'ጥ': 't', 'ጦ': 'to',
  'ጨ': 'che', 'ጩ': 'chu', 'ጪ': 'chi', 'ጫ': 'cha', 'ጬ': 'chie', 'ጭ': 'ch', 'ጮ': 'cho',
  'ጰ': 'pe', 'ጱ': 'pu', 'ጲ': 'pi', 'ጳ': 'pa', 'ጴ': 'pie', 'ጵ': 'p', 'ጶ': 'po',
  'ጸ': 'tse', 'ጹ': 'tsu', 'ጺ': 'tsi', 'ጻ': 'tsa', 'ጼ': 'tsie', 'ጽ': 'ts', 'ጾ': 'tso',
  'ፀ': 'tse', 'ፁ': 'tsu', 'ፂ': 'tsi', 'ፃ': 'tsa', 'ፄ': 'tsie', 'ፅ': 'ts', 'ፆ': 'tso',
  'ፈ': 'fe', 'ፉ': 'fu', 'ፊ': 'fi', 'ፋ': 'fa', 'ፌ': 'fie', 'ፍ': 'f', 'ፎ': 'fo',
  'ፐ': 'pe', 'ፑ': 'pu', 'ፒ': 'pi', 'ፓ': 'pa', 'ፔ': 'pie', 'ፕ': 'p', 'ፖ': 'po'
};

export function phoneticTransliterate(str: string): string {
  let out = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (FIDEL_PHONETIC[char]) {
      out += FIDEL_PHONETIC[char];
    } else {
      out += char;
    }
  }
  // Capitalize first letter of word
  if (out.length > 0) {
    return out.charAt(0).toUpperCase() + out.slice(1);
  }
  return out;
}

/**
 * Returns formatted location representations based on the selected language mode ('en' | 'am').
 */
export function formatLocationDisplay(
  originalAmharic: string,
  mode: LanguageMode = 'en'
): {
  primary: string;
  secondary?: string;
  english: string;
  amharic: string;
} {
  const amharic = originalAmharic || '';
  const english = translateAmharicLocation(amharic);

  if (mode === 'am') {
    return {
      primary: amharic || english,
      secondary: undefined,
      english,
      amharic
    };
  }

  // English mode (default)
  return {
    primary: english || amharic,
    secondary: undefined,
    english,
    amharic
  };
}
