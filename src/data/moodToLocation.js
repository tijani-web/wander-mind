const moodToLocation = {
  // 🌧️ SAD: Places that hold space for your emotions
  sad: [
    { location: "Wistman’s Wood", country: "England", vibe: "twisted oaks in a fog that listens", imageQuery: "Wistman's Wood foggy forest" },
    { location: "Marble Caves", country: "Chile", vibe: "echoing caves carved by gentle waves", imageQuery: "Marble Caves Patagonia water reflections" },
    { location: "Lake Natron", country: "Tanzania", vibe: "a crimson mirror of silence and time", imageQuery: "Lake Natron red lake flamingos" },
    { location: "Aokigahara Forest", country: "Japan", vibe: "stillness thick as moss beneath ancient trees", imageQuery: "Aokigahara Forest quiet mist" },
    { location: "Lofoten Islands", country: "Norway", vibe: "sorrow wrapped in blue fjords and mountains", imageQuery: "Lofoten Islands moody sky" },
    { location: "Isle of Skye", country: "Scotland", vibe: "cliffs and clouds that understand solitude", imageQuery: "Isle of Skye dark coast" },
    { location: "Prypiat", country: "Ukraine", vibe: "forgotten cities frozen in loss", imageQuery: "Chernobyl abandoned city overgrown" },
    { location: "Lake Bled in Rain", country: "Slovenia", vibe: "a chapel island blurred by tears of sky", imageQuery: "Lake Bled rain mist" },
    { location: "St. Kevin’s Monastic Ruins", country: "Ireland", vibe: "ruins where monks whispered to the rain", imageQuery: "St. Kevin ruins Ireland fog" },
    { location: "Derweze Gas Crater", country: "Turkmenistan", vibe: "the earth’s glowing wound, still burning", imageQuery: "Door to Hell crater night fire" }
  ],

  // 😤 STRESSED: Where noise melts into breath
  stressed: [
    { location: "Shirakami-Sanchi", country: "Japan", vibe: "beech forests dripping golden stillness", imageQuery: "Shirakami Sanchi sunlight forest" },
    { location: "Plitvice Lakes", country: "Croatia", vibe: "cascading waters singing soft lullabies", imageQuery: "Plitvice Lakes waterfalls emerald" },
    { location: "Lençóis Maranhenses", country: "Brazil", vibe: "sapphire pools cradled by white dunes", imageQuery: "Lencois Maranhenses aerial dunes lagoons" },
    { location: "Socotra Island", country: "Yemen", vibe: "alien trees in sacred silence", imageQuery: "Socotra dragon blood trees" },
    { location: "Antelope Canyon", country: "USA", vibe: "curved stone waves kissed by light", imageQuery: "Antelope Canyon light beams" },
    { location: "Kyoto Zen Garden", country: "Japan", vibe: "patterns in gravel that calm the storm", imageQuery: "Kyoto Zen rock garden" },
    { location: "Jasper National Park", country: "Canada", vibe: "silent peaks reflected in glassy lakes", imageQuery: "Jasper lake reflections" },
    { location: "Valley of Flowers", country: "India", vibe: "meadows breathing out color and calm", imageQuery: "Valley of Flowers Himalayas" },
    { location: "Château de Chambord", country: "France", vibe: "serenity behind ancient castle walls", imageQuery: "Chambord castle France fog" },
    { location: "Blue Pond", country: "Japan", vibe: "hauntingly still waters under pale skies", imageQuery: "Blue Pond Biei Japan" }
  ],

  // 🎉 EXCITED: Bursting with light, color, and motion
  excited: [
    { location: "Cappadocia", country: "Turkey", vibe: "sunrise skies filled with balloons and thrill", imageQuery: "Cappadocia hot air balloons" },
    { location: "La Tomatina", country: "Spain", vibe: "red chaos, laughter, and tomato storms", imageQuery: "La Tomatina festival Spain" },
    { location: "Holi Festival", country: "India", vibe: "colors exploding like happiness set free", imageQuery: "Holi Festival color powder" },
    { location: "Times Square NYE", country: "USA", vibe: "countdowns, confetti, and collective joy", imageQuery: "Times Square New Year confetti" },
    { location: "Oktoberfest", country: "Germany", vibe: "mugs clashing and accordion joy", imageQuery: "Oktoberfest Germany crowd beer" },
    { location: "Rio Carnival", country: "Brazil", vibe: "dancing feathers in electric rhythms", imageQuery: "Rio Carnival costumes parade" },
    { location: "Tomorrowland", country: "Belgium", vibe: "beats pulsing under a neon sky", imageQuery: "Tomorrowland music festival crowd" },
    { location: "Santorini", country: "Greece", vibe: "sunset claps and white rooftops over joy", imageQuery: "Santorini sunset celebration" },
    { location: "Lantern Festival", country: "Taiwan", vibe: "sky on fire with flying wishes", imageQuery: "Taiwan Lantern Festival night sky" },
    { location: "Disneyland Fireworks", country: "USA", vibe: "magic exploding in starbursts", imageQuery: "Disneyland fireworks night" }
  ],

  // 😴 TIRED: Where your body finally exhales
  tired: [
    { location: "Gasadalur", country: "Faroe Islands", vibe: "a sleepy village wrapped in waterfalls", imageQuery: "Gasadalur waterfall Faroe Islands" },
    { location: "Huacachina Oasis", country: "Peru", vibe: "dunes whispering secrets to the lagoon", imageQuery: "Huacachina oasis desert Peru" },
    { location: "Bamboo Forest", country: "Japan", vibe: "wind murmuring through green pillars", imageQuery: "Kyoto bamboo forest sunlight" },
    { location: "Lake Louise", country: "Canada", vibe: "a mirror of turquoise beneath giants", imageQuery: "Lake Louise canoe mountain" },
    { location: "Hallstatt", country: "Austria", vibe: "dreamlike lakeside stillness", imageQuery: "Hallstatt lake village mountains" },
    { location: "Blue Grotto", country: "Italy", vibe: "a glowing cave where time floats", imageQuery: "Blue Grotto Capri cave boat" },
    { location: "Seongsan Ilchulbong", country: "South Korea", vibe: "gentle sunrise over a crater by sea", imageQuery: "Seongsan Ilchulbong sunrise" },
    { location: "Mount Cook Village", country: "New Zealand", vibe: "snowy silence under southern stars", imageQuery: "Mount Cook New Zealand snowy" },
    { location: "Llyn Padarn", country: "Wales", vibe: "a lonely tree sleeping in a quiet lake", imageQuery: "Llyn Padarn lone tree mist" },
    { location: "Laguna Colorada", country: "Bolivia", vibe: "a sleepy red lagoon dotted with flamingos", imageQuery: "Laguna Colorada flamingos lake" }
  ],

  // ❄️ NUMB: The calmest kind of cold
  numb: [
    { location: "Svalbard Seed Vault", country: "Norway", vibe: "a frozen ark of forgotten futures", imageQuery: "Svalbard Seed Vault snow" },
    { location: "Salar de Uyuni", country: "Bolivia", vibe: "a sky mirror that erases edges", imageQuery: "Salar de Uyuni reflection sky" },
    { location: "Lake Baikal", country: "Russia", vibe: "cracked turquoise glass frozen in time", imageQuery: "Lake Baikal frozen ice" },
    { location: "Mount Erebus", country: "Antarctica", vibe: "a volcano whispering through frost", imageQuery: "Mount Erebus Antarctica lava" },
    { location: "Vatnajökull Glacier", country: "Iceland", vibe: "an ocean of blue ice breathing silence", imageQuery: "Vatnajökull glacier cave" },
    { location: "Deadvlei", country: "Namibia", vibe: "ghost trees under an eternal orange sky", imageQuery: "Deadvlei Namibia dead trees" },
    { location: "Tasiilaq", country: "Greenland", vibe: "quiet houses swallowed by snow", imageQuery: "Tasiilaq Greenland winter village" },
    { location: "Lapland", country: "Finland", vibe: "snow forests glowing in polar night", imageQuery: "Lapland winter forest aurora" },
    { location: "White Desert", country: "Egypt", vibe: "chalk spires frozen in windblown silence", imageQuery: "White Desert Egypt rocks" },
    { location: "Uummannaq", country: "Greenland", vibe: "icebergs drifting past a sleeping town", imageQuery: "Uummannaq Greenland iceberg village" }
  ],

  // 📸 NOSTALGIC: Feels like a faded memory
  nostalgic: [
    { location: "Angkor Wat", country: "Cambodia", vibe: "sunrise temples lost in time", imageQuery: "Angkor Wat sunrise temple" },
    { location: "Petra", country: "Jordan", vibe: "rose-red stone holding ancient breath", imageQuery: "Petra Jordan rock temple" },
    { location: "Machu Picchu", country: "Peru", vibe: "mist weaving through forgotten steps", imageQuery: "Machu Picchu Peru mist ruins" },
    { location: "Venice", country: "Italy", vibe: "gondolas gliding through history", imageQuery: "Venice canals gondola sunset" },
    { location: "Havana", country: "Cuba", vibe: "faded pastels and rolling 1950s cars", imageQuery: "Havana vintage cars buildings" },
    { location: "Bagan", country: "Myanmar", vibe: "temples floating in golden haze", imageQuery: "Bagan temples sunrise mist" },
    { location: "Córdoba", country: "Spain", vibe: "mosaics echoing medieval prayers", imageQuery: "Cordoba mosque arches" },
    { location: "Old Quebec", country: "Canada", vibe: "stone walls warmed by lanterns", imageQuery: "Old Quebec cobbled streets night" },
    { location: "Toledo", country: "Spain", vibe: "winding alleys and cathedral bells", imageQuery: "Toledo Spain old city sunset" },
    { location: "Bhaktapur", country: "Nepal", vibe: "wooden carvings and incense in the air", imageQuery: "Bhaktapur Nepal temple square" }
  ],

  // 🪂 ADVENTUROUS: When life needs to feel real again
  adventurous: [
    { location: "Mount Roraima", country: "Venezuela", vibe: "a floating plateau above the clouds", imageQuery: "Mount Roraima plateau Venezuela" },
    { location: "Zhangjiajie Glass Bridge", country: "China", vibe: "a path in the sky above forest pillars", imageQuery: "Zhangjiajie Glass Bridge" },
    { location: "Waitomo Caves", country: "New Zealand", vibe: "glowworms lighting a silent river", imageQuery: "Waitomo Caves glowworm" },
    { location: "Cerro Negro", country: "Nicaragua", vibe: "volcano boarding down ashen slopes", imageQuery: "Volcano boarding Cerro Negro" },
    { location: "Trolltunga", country: "Norway", vibe: "a cliff tongue stretching into the abyss", imageQuery: "Trolltunga cliff Norway" },
    { location: "Kalalau Trail", country: "Hawaii", vibe: "a jungle path on the edge of the sea", imageQuery: "Kalalau Trail Hawaii coast" },
    { location: "Moab Arches", country: "USA", vibe: "wind-carved stone gates to nowhere", imageQuery: "Moab Arches desert Utah" },
    { location: "Ice Climbing Sólheimajökull", country: "Iceland", vibe: "tools in hand, frozen walls to conquer", imageQuery: "Ice climbing Iceland glacier" },
    { location: "Wadi Rum", country: "Jordan", vibe: "Mars-like valleys waiting for footprints", imageQuery: "Wadi Rum desert mountains" },
    { location: "Tiger’s Nest Monastery", country: "Bhutan", vibe: "a cliffside temple for brave hearts", imageQuery: "Tiger's Nest Monastery Bhutan" }
  ]
};

export default moodToLocation