// src/shared/constants/MenuData.ts
import { MenuItem } from '../../core/models/Menu.model';

export const MENU_DATA: MenuItem[] = [
  { id: 1, title: 'สั่งอาหาร', icon: '🍔' },
  { id: 2, title: 'สั่งของ', icon: '🛒' },
  { id: 3, title: 'เรียกรถ', icon: '🚕' },
  { id: 4, title: 'ปรึกษาเภสัช', icon: '💊' },
  { id: 5, title: 'เมสเซนเจอร์', icon: '📦' },
  { id: 6, title: 'แพ็กเกจ', icon: '🎟️' },
];

export const FOOTER_DATA: MenuItem[] = [
  { id: 1, title: 'หน้าแรก', icon: '🏠' },
  { id: 2, title: 'คำสั่งซื้อ', icon: '📄' },
  { id: 3, title: 'ข้อความ', icon: '💬' },
  { id: 4, title: 'อื่นๆ', icon: '⚙️' },
];