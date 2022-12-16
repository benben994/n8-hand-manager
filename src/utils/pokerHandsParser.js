export default class pokerHandsParser {
  constructor(string) {
    Object.keys(this.PLATFORM_PREFIX).forEach((platform) => {
      const regexPattern = `(?=\\b${this.PLATFORM_PREFIX[platform]}\\b)`;
      if (string.match(new RegExp(regexPattern, 'g'))) {
        const hands = string.split(new RegExp(regexPattern, 'g'));
        this.setPlatform(platform);
        this.setRawHands(hands);

        hands.forEach((hand) => this.parseHand(hand));
      }
    });

    if (typeof this.platform === 'undefined') {
      throw Error('PLATFORM_NOT_SUPPORT');
    }
  }

  get PLATFORM_PREFIX() {
    return {
      Natural8: 'Poker Hand',
    };
  }

  get handCount() {
    if (typeof this.hands !== 'undefined') {
      return this.hands.length;
    }

    return 0;
  }

  setPlatform(platform) {
    this.platform = platform;
  }

  setRawHands(hands) {
    this.rawHands = hands;
  }

  addHand(hand) {
    if (typeof this.hands === 'undefined') {
      this.hands = [hand];
    } else {
      this.hands.push(hand);
    }
  }

  parseHand(hand) {
    if (this.platform === 'Natural8') {
      const handStruct = this.parseNatural8Hand(hand);
    }
  }

  parseNatural8Hand(hand) {
    const handStruct = {
      handId: null,
      platform: this.platform,
      timestamp: null,
      stakes: '',
      max: 0,
      seats: [],
      buttonSeatIndex: 0,
      heroSeatIndex: 0,
      smallBlind: null,
      bigBlind: null,
      preflopActions: [],
      flopActions: [],
      turnActions: [],
      riverActions: [],
      summary: {
        totalPot: 0,
        rake: 0,
        jackpot: 0,
        bingo: 0,
        boards: [],
        seats: [],
        winner: null,
      },
    };
    const lines = hand.split(/\r?\n/).filter((line) => line !== '');
    console.log(lines);

    const handId = this.parseHandId(lines[0]);
    if (!handId) {
      throw Error('MISSING_HAND_ID');
    }
    const timestamp = this.parseTimestamp(lines[0]);
    const stake = this.parseStake(lines[0]);

    return handStruct;
  }

  parseHandId(text) {
    const regex = /Poker Hand (#RC\d+):/;
    let handId = null;
    if (regex.test(text)) {
      const match = text.match(regex);
      handId = match[1];
    }
    console.log('[Poker Hands Parser] handId:', handId);

    return handId;
  }

  parseTimestamp(text) {
    const regex = /\d{4}?(-|\/)\d{2}(-|\/)\d{2} \d{1,2}:\d{1,2}:\d{1,2}/;
    let timestamp = null;
    if (regex.test(text)) {
      const match = text.match(regex);
      timestamp = match[0];
    }
    console.log('[Poker Hands Parser] timestamp:', timestamp);

    return timestamp;
  }

  parseStake(text) {
    const regex = /Hold'em No Limit {2}\((\$\d\.\d{2}\/\$\d\.\d{2})\)/;
    let stake = null;
    if (regex.test(text)) {
      const match = text.match(regex);
      stake = match[1];
    }
    console.log('[Poker Hands Parser] stake:', stake);

    return stake;
  }

  parseTableMax(text) {}

  parseButtonSeatIndex(text) {}

  parseSeats(text) {}

  parsePreFlop(text) {}

  parseFlop(text) {}

  parseTurn(text) {}

  parseRiver(text) {}

  parseSummary(text) {}
}
