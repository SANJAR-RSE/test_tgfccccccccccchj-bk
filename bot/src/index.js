require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const api = require('./api');
const {
  MAIN_MENU,
  CATEGORY_LABELS,
  TYPE_LABELS,
  CATEGORY_KEYBOARD,
  TYPE_KEYBOARD,
} = require('./keyboards');

const BOT_TOKEN = process.env.BOT_TOKEN;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000';

if (!BOT_TOKEN) {
  console.error(
    '[XATO] BOT_TOKEN topilmadi. Iltimos, .env faylida (yoki muhit o\'zgaruvchisida) ' +
      "BOT_TOKEN qiymatini belgilang (masalan .env.example faylidan nusxa oling: cp .env.example .env). " +
      'Bot ishga tushmadi.'
  );
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log('Eco Tashkent bot ishga tushdi. Backend:', BACKEND_URL);

// --- Xatolarni ushlab, botni yiqitmaslik ---
bot.on('polling_error', (err) => {
  console.error('[polling_error]', err && err.message ? err.message : err);
});

process.on('unhandledRejection', (err) => {
  console.error('[unhandledRejection]', err);
});

process.on('uncaughtException', (err) => {
  console.error('[uncaughtException]', err);
});

const GENERIC_ERROR_MSG = 'Xatolik yuz berdi, keyinroq urinib ko\'ring.';

// --- "Buyum joylash" suhbat holati (chatId -> state) ---
// state: { step: string, data: { title, description, category, type, district, contact } }
const sessions = new Map();

function resetSession(chatId) {
  sessions.delete(chatId);
}

function startAddItemFlow(chatId) {
  sessions.set(chatId, { step: 'title', data: {} });
  bot.sendMessage(chatId, 'Buyum nomini kiriting (masalan: "Noutbuk Lenovo").', {
    reply_markup: { remove_keyboard: true },
  });
}

async function safeSend(chatId, text, opts) {
  try {
    await bot.sendMessage(chatId, text, opts);
  } catch (err) {
    console.error('[sendMessage xatosi]', err.message);
  }
}

// --- /start ---
bot.onText(/^\/start$/, (msg) => {
  const chatId = msg.chat.id;
  resetSession(chatId);
  const name = msg.from && msg.from.first_name ? msg.from.first_name : '';
  safeSend(
    chatId,
    `Assalomu alaykum${name ? ', ' + name : ''}! 🌱\n\n` +
      "\"Eco Tashkent\" botiga xush kelibsiz.\n" +
      "Bu bot orqali kerak bo'lmay qolgan buyumlaringizni bepul berishingiz, " +
      "almashtirishingiz yoki xayriya qilishingiz, shuningdek yaqin atrofdagi " +
      "qayta ishlash/saralash punktlarini topishingiz mumkin.\n\n" +
      'Quyidagi menyudan tanlang:',
    MAIN_MENU
  );
});

// --- /cancel — joriy suhbat oqimini bekor qilish ---
bot.onText(/^\/cancel$/, (msg) => {
  const chatId = msg.chat.id;
  if (sessions.has(chatId)) {
    resetSession(chatId);
    safeSend(chatId, "Bekor qilindi.", MAIN_MENU);
  } else {
    safeSend(chatId, 'Bekor qilinadigan amal yo\'q.', MAIN_MENU);
  }
});

// --- Asosiy menyu va suhbat oqimi ---
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text || text.startsWith('/')) return; // /start, /cancel yuqorida ishlanadi

  const session = sessions.get(chatId);

  // Agar foydalanuvchi buyum joylash oqimida bo'lsa — matnli qadamlarni qayta ishlash
  if (session) {
    return handleAddItemStep(msg, session);
  }

  // Asosiy menyu tugmalari
  switch (text) {
    case '📦 Buyumlar':
      return showItems(chatId);
    case '➕ Buyum joylash':
      return startAddItemFlow(chatId);
    case '♻️ Punktlar':
      return showPoints(chatId);
    case "👤 Mening e'lonlarim":
      return showMyItems(chatId, msg.from.id);
    default:
      return safeSend(chatId, "Iltimos, menyudagi tugmalardan foydalaning.", MAIN_MENU);
  }
});

// --- Buyum joylash: matnli qadamlar ---
async function handleAddItemStep(msg, session) {
  const chatId = msg.chat.id;
  const text = (msg.text || '').trim();

  switch (session.step) {
    case 'title':
      if (!text) return safeSend(chatId, "Iltimos, buyum nomini matn ko'rinishida kiriting.");
      session.data.title = text;
      session.step = 'description';
      return safeSend(chatId, "Buyum haqida qisqacha tavsif yozing.");

    case 'description':
      if (!text) return safeSend(chatId, "Iltimos, tavsifni matn ko'rinishida kiriting.");
      session.data.description = text;
      session.step = 'category';
      return safeSend(chatId, 'Kategoriyani tanlang:', CATEGORY_KEYBOARD);

    case 'category':
      return safeSend(chatId, 'Iltimos, kategoriyani tugmalar orqali tanlang.', CATEGORY_KEYBOARD);

    case 'type':
      return safeSend(chatId, "Iltimos, turini tugmalar orqali tanlang.", TYPE_KEYBOARD);

    case 'district':
      if (!text) return safeSend(chatId, "Iltimos, tumanni matn ko'rinishida kiriting (masalan: Chilonzor).");
      session.data.district = text;
      session.step = 'contact';
      return safeSend(
        chatId,
        "Aloqa uchun ma'lumot kiriting (telefon raqami yoki telegram username, masalan @username)."
      );

    case 'contact':
      if (!text) return safeSend(chatId, "Iltimos, aloqa ma'lumotini matn ko'rinishida kiriting.");
      session.data.contact = text;
      return finishAddItemFlow(msg, session);

    default:
      resetSession(chatId);
      return safeSend(chatId, GENERIC_ERROR_MSG, MAIN_MENU);
  }
}

async function finishAddItemFlow(msg, session) {
  const chatId = msg.chat.id;
  const { title, description, category, type, district, contact } = session.data;

  const payload = {
    title,
    description,
    category,
    type,
    district,
    ownerContact: contact,
    ownerName: msg.from.first_name || 'Foydalanuvchi',
    ownerTelegramId: msg.from.id,
  };

  try {
    await api.createItem(payload);
    resetSession(chatId);
    await safeSend(
      chatId,
      "✅ E'loningiz muvaffaqiyatli joylandi! Rahmat, siz ekologiyaga hissa qo'shdingiz. 🌱",
      MAIN_MENU
    );
  } catch (err) {
    console.error('[createItem xatosi]', err.message);
    resetSession(chatId);
    await safeSend(chatId, GENERIC_ERROR_MSG, MAIN_MENU);
  }
}

// --- Inline tugmalar: kategoriya va tur tanlash ---
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data || '';
  const session = sessions.get(chatId);

  try {
    await bot.answerCallbackQuery(query.id);
  } catch (err) {
    console.error('[answerCallbackQuery xatosi]', err.message);
  }

  if (!session) return;

  if (data.startsWith('cat:') && session.step === 'category') {
    const category = data.slice('cat:'.length);
    if (!CATEGORY_LABELS[category]) return;
    session.data.category = category;
    session.step = 'type';
    return safeSend(chatId, `Kategoriya: ${CATEGORY_LABELS[category]}\n\nEndi turini tanlang:`, TYPE_KEYBOARD);
  }

  if (data.startsWith('type:') && session.step === 'type') {
    const type = data.slice('type:'.length);
    if (!TYPE_LABELS[type]) return;
    session.data.type = type;
    session.step = 'district';
    return safeSend(chatId, `Tur: ${TYPE_LABELS[type]}\n\nQaysi tumanda joylashgan? (masalan: Chilonzor)`);
  }
});

// --- "📦 Buyumlar" — so'nggi 5 ta e'lon ---
async function showItems(chatId) {
  try {
    const items = await api.getItems();
    const list = Array.isArray(items) ? items.slice(0, 5) : [];

    if (list.length === 0) {
      return safeSend(chatId, "Hozircha e'lonlar mavjud emas.", MAIN_MENU);
    }

    await safeSend(chatId, `So'nggi ${list.length} ta e'lon:`);
    for (const item of list) {
      await safeSend(chatId, formatItem(item));
    }
  } catch (err) {
    console.error('[getItems xatosi]', err.message);
    await safeSend(chatId, GENERIC_ERROR_MSG, MAIN_MENU);
  }
}

// --- "👤 Mening e'lonlarim" ---
async function showMyItems(chatId, ownerTelegramId) {
  try {
    const items = await api.getItems({ ownerTelegramId });
    const list = Array.isArray(items) ? items : [];

    if (list.length === 0) {
      return safeSend(chatId, "Sizda hali e'lonlar yo'q. \"➕ Buyum joylash\" orqali qo'shishingiz mumkin.", MAIN_MENU);
    }

    await safeSend(chatId, `Sizning e'lonlaringiz (${list.length} ta):`);
    for (const item of list) {
      await safeSend(chatId, formatItem(item, true));
    }
  } catch (err) {
    console.error('[getItems (mening) xatosi]', err.message);
    await safeSend(chatId, GENERIC_ERROR_MSG, MAIN_MENU);
  }
}

// --- "♻️ Punktlar" — qayta ishlash/saralash punktlari ---
async function showPoints(chatId) {
  try {
    const points = await api.getPoints();
    const list = Array.isArray(points) ? points.slice(0, 10) : [];

    if (list.length === 0) {
      return safeSend(chatId, 'Hozircha punktlar mavjud emas.', MAIN_MENU);
    }

    await safeSend(chatId, `Qayta ishlash/saralash punktlari (${list.length} ta):`);
    for (const point of list) {
      await safeSend(chatId, formatPoint(point));
    }
  } catch (err) {
    console.error('[getPoints xatosi]', err.message);
    await safeSend(chatId, GENERIC_ERROR_MSG, MAIN_MENU);
  }
}

function formatItem(item, showStatus) {
  const categoryLabel = CATEGORY_LABELS[item.category] || item.category || '-';
  const typeLabel = TYPE_LABELS[item.type] || item.type || '-';
  let text =
    `📦 ${item.title || '-'}\n` +
    `Kategoriya: ${categoryLabel}\n` +
    `Turi: ${typeLabel}\n` +
    `Tuman: ${item.district || '-'}\n` +
    `Aloqa: ${item.ownerContact || '-'}`;
  if (showStatus && item.status) {
    text += `\nHolati: ${item.status}`;
  }
  return text;
}

function formatPoint(point) {
  return (
    `♻️ ${point.name || '-'}\n` +
    `Manzil: ${point.address || '-'}\n` +
    `Tuman: ${point.district || '-'}\n` +
    `Ish vaqti: ${point.workingHours || '-'}`
  );
}
