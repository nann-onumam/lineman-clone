import type { HomeLocation } from '../types/HomeLocation';

export const LOCATION_DATA: HomeLocation[] = [
  {
    id: 'regent-pattanakarn',
    name: 'รีเจ้นท์ พัฒนาการ',
    latitude: 13.736717,
    longitude: 100.523186,
    addressHint: 'ใกล้ทางเข้าซอยหลัก',
  },
  {
    id: 'sukhumvit-71',
    name: 'สุขุมวิท 71',
    latitude: 13.72174,
    longitude: 100.595069,
    addressHint: 'หน้าปากซอยปรีดี 14',
  },
  {
    id: 'onnut-center',
    name: 'อ่อนนุช เซ็นเตอร์',
    latitude: 13.705482,
    longitude: 100.60183,
    addressHint: 'ข้าง BTS อ่อนนุช',
  },
];

export async function fetchLocations(keyword: string): Promise<HomeLocation[]> {
  const normalized = keyword.trim().toLowerCase();

  await new Promise<void>(resolve => setTimeout(resolve, 150));

  if (!normalized) {
    return LOCATION_DATA;
  }

  return LOCATION_DATA.filter(location =>
    location.name.toLowerCase().includes(normalized),
  );
}
