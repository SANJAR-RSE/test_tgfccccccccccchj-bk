// Backend API kontraktiga mos konstantalar (docs/API_CONTRACT.md)

export const CATEGORIES = [
  { value: "texnika", label: "Texnika" },
  { value: "mebel", label: "Mebel" },
  { value: "kitob", label: "Kitob" },
  { value: "kiyim", label: "Kiyim" },
  { value: "bolalar", label: "Bolalar buyumlari" },
  { value: "boshqa", label: "Boshqa" },
];

export const TYPES = [
  { value: "bepul", label: "Bepul" },
  { value: "almashish", label: "Almashish" },
  { value: "xayriya", label: "Xayriya" },
];

export const STATUSES = [
  { value: "mavjud", label: "Mavjud" },
  { value: "band", label: "Band qilingan" },
  { value: "berildi", label: "Berib bo'lindi" },
];

export const POINT_TYPES = [
  { value: "qayta_ishlash", label: "Qayta ishlash punkti" },
  { value: "saralash", label: "Saralash punkti" },
];

export const DISTRICTS = [
  "Bektemir",
  "Chilonzor",
  "Mirobod",
  "Mirzo Ulug'bek",
  "Olmazor",
  "Sergeli",
  "Shayxontohur",
  "Uchtepa",
  "Yakkasaroy",
  "Yashnobod",
  "Yunusobod",
  "Yangihayot",
];

function labelFrom(list, value) {
  const found = list.find((item) => item.value === value);
  return found ? found.label : value;
}

export const categoryLabel = (value) => labelFrom(CATEGORIES, value);
export const typeLabel = (value) => labelFrom(TYPES, value);
export const statusLabel = (value) => labelFrom(STATUSES, value);
export const pointTypeLabel = (value) => labelFrom(POINT_TYPES, value);
