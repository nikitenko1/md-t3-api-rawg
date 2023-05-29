const convertToPlatform = (id: number) => {
  switch (id) {
    case 1:
      return "Xbox One";
    case 3:
      return "IOS";
    case 4:
      return "PC";
    case 5:
      return "maxOS";
    case 6:
      return "Linux";
    case 7:
      return "Nintendo Switch";
    case 8:
      return "Nintendo 3DS";
    case 9:
      return "Nintendo DS";
    case 10:
      return "Wii U";
    case 11:
      return "Wii";
    case 12:
      return "Neo Geo";
    case 13:
      return "Nintendo DSi";
    case 14:
      return "Xbox 360";
    case 15:
      return "Playstation 2";
    case 16:
      return "Playstation 3";
    case 17:
      return "PSP";
    case 18:
      return "Playstation 4";
    case 19:
      return "PS Vita";
    case 21:
      return "Android";
    case 22:
      return "Atari Flashback";
    case 23:
      return "Atari 2600";
    case 24:
      return "Game Boy Advance";
    case 25:
      return "Atari 8-bit";
    case 26:
      return "Game Boy";
    case 27:
      return "Playstation";
    case 28:
      return "Atari 7800";
    case 31:
      return "Atari 5200";
    case 34:
      return "Atari ST";
    case 41:
      return "Apple II";
    case 43:
      return "Game Boy Color";
    case 46:
      return "Atari Lynx";
    case 49:
      return "NES";
    case 50:
      return "Atari XEGS";
    case 55:
      return "Classic Macintosh";
    case 74:
      return "SEGA Master System";
    case 77:
      return "Game Gear";
    case 79:
      return "SNES";
    case 80:
      return "Xbox";
    case 83:
      return "Nintendo 64";
    case 105:
      return "GameCube";
    case 106:
      return "Dreamcast";
    case 107:
      return "SEGA Saturn";
    case 111:
      return "3D0";
    case 112:
      return "Jaguar";
    case 117:
      return "SEGA 32X";
    case 119:
      return "SEGA CD";
    case 166:
      return "Commodore / Amiga";
    case 167:
      return "Genesis";
    case 187:
      return "Playstation 5";
    default:
      break;
  }
};

export default convertToPlatform;
