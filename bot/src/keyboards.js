const MAIN_MENU = {
  reply_markup: {
    keyboard: [
      ['📦 Buyumlar', '➕ Buyum joylash'],
      ['♻️ Punktlar', "👤 Mening e'lonlarim"],
    ],
    resize_keyboard: true,
  },
};

const CATEGORY_LABELS = {
  texnika: '💻 Texnika',
  mebel: '🛋 Mebel',
  kitob: '📚 Kitob',
  kiyim: '👕 Kiyim',
  bolalar: '🧸 Bolalar',
  boshqa: '📦 Boshqa',
};

const TYPE_LABELS = {
  bepul: '🆓 Bepul',
  almashish: '🔄 Almashish',
  xayriya: '🎁 Xayriya',
};

const CATEGORY_KEYBOARD = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: CATEGORY_LABELS.texnika, callback_data: 'cat:texnika' },
        { text: CATEGORY_LABELS.mebel, callback_data: 'cat:mebel' },
      ],
      [
        { text: CATEGORY_LABELS.kitob, callback_data: 'cat:kitob' },
        { text: CATEGORY_LABELS.kiyim, callback_data: 'cat:kiyim' },
      ],
      [
        { text: CATEGORY_LABELS.bolalar, callback_data: 'cat:bolalar' },
        { text: CATEGORY_LABELS.boshqa, callback_data: 'cat:boshqa' },
      ],
    ],
  },
};

const TYPE_KEYBOARD = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: TYPE_LABELS.bepul, callback_data: 'type:bepul' },
        { text: TYPE_LABELS.almashish, callback_data: 'type:almashish' },
        { text: TYPE_LABELS.xayriya, callback_data: 'type:xayriya' },
      ],
    ],
  },
};

module.exports = {
  MAIN_MENU,
  CATEGORY_LABELS,
  TYPE_LABELS,
  CATEGORY_KEYBOARD,
  TYPE_KEYBOARD,
};
