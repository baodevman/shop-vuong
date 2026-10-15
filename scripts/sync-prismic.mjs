#!/usr/bin/env node

/**
 * Sync Custom Types & Slices to Prismic (hub-cms.prismic.io)
 * Uses the official Prismic Custom Types API: https://customtypes.prismic.io
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load .env.local if present
const envLocalPath = path.join(rootDir, '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...values] = trimmed.split('=');
    if (key && !process.env[key.trim()]) {
      process.env[key.trim()] = values.join('=').trim().replace(/^["']|["']$/g, '');
    }
  }
}

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME || 'hub-cms';
const API_TOKEN = process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN;
const BASE_URL = 'https://customtypes.prismic.io';

console.log('='.repeat(60));
console.log(`🚀 SYNC TO PRISMIC: https://${REPOSITORY}.prismic.io`);
console.log('='.repeat(60));

if (!API_TOKEN) {
  console.log(`
⚠️  CHƯA CÓ PRISMIC_CUSTOM_TYPES_API_TOKEN!

Để đẩy tự động toàn bộ Custom Types và Slices lên Prismic repository "${REPOSITORY}"
mà không cần tạo thủ công trên giao diện web, bạn chỉ cần 3 bước đơn giản:

1. Đăng nhập vào Prismic: https://${REPOSITORY}.prismic.io
2. Vào Settings (Cài đặt) -> Permanent Access Tokens (hoặc Custom Types API)
3. Tạo 1 token với quyền Custom Types API, sau đó điền vào file .env.local:
   PRISMIC_CUSTOM_TYPES_API_TOKEN=your_token_here

Hoặc chạy lệnh trực tiếp với token:
   PRISMIC_CUSTOM_TYPES_API_TOKEN=your_token_here npm run prismic:push
`);
  process.exit(1);
}

const headers = {
  'repository': REPOSITORY,
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json',
};

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, { ...options, headers: { ...headers, ...options.headers } });
  const text = await res.text();
  let data = null;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }
  return { status: res.status, ok: res.ok, data };
}

async function syncCustomTypes() {
  console.log('\n📦 [1/2] Đang đồng bộ Custom Types...');
  const customTypesDir = path.join(rootDir, 'customtypes');
  if (!fs.existsSync(customTypesDir)) {
    console.log('Không tìm thấy thư mục customtypes');
    return;
  }

  // Get current custom types from Prismic
  const existingRes = await fetchJSON(`${BASE_URL}/customtypes`);
  const existingTypes = new Map();
  if (existingRes.ok && Array.isArray(existingRes.data)) {
    for (const t of existingRes.data) {
      existingTypes.set(t.id, t);
    }
  }

  const entries = fs.readdirSync(customTypesDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const jsonPath = path.join(customTypesDir, entry.name, 'index.json');
    if (!fs.existsSync(jsonPath)) continue;

    const schema = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const typeId = schema.id || entry.name;
    const exists = existingTypes.has(typeId);

    const endpoint = exists ? `${BASE_URL}/customtypes/update` : `${BASE_URL}/customtypes/insert`;
    const res = await fetchJSON(endpoint, {
      method: 'POST',
      body: JSON.stringify(schema),
    });

    if (res.ok || res.status === 200 || res.status === 201 || res.status === 204) {
      console.log(`  ✓ Custom Type "${typeId}": ${exists ? 'CẬP NHẬT THÀNH CÔNG' : 'TẠO MỚI THÀNH CÔNG'}`);
    } else {
      console.error(`  ✕ Thất bại với "${typeId}": HTTP ${res.status}`, res.data);
    }
  }
}

async function syncSlices() {
  console.log('\n🧩 [2/2] Đang đồng bộ Slices...');
  const slicesDir = path.join(rootDir, 'src', 'slices');
  if (!fs.existsSync(slicesDir)) {
    console.log('Không tìm thấy thư mục src/slices');
    return;
  }

  // Get current slices from Prismic
  const existingRes = await fetchJSON(`${BASE_URL}/slices`);
  const existingSlices = new Map();
  if (existingRes.ok && Array.isArray(existingRes.data)) {
    for (const s of existingRes.data) {
      existingSlices.set(s.id, s);
    }
  }

  const entries = fs.readdirSync(slicesDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const modelPath = path.join(slicesDir, entry.name, 'model.json');
    if (!fs.existsSync(modelPath)) continue;

    const schema = JSON.parse(fs.readFileSync(modelPath, 'utf8'));
    const sliceId = schema.id;
    const exists = existingSlices.has(sliceId);

    const endpoint = exists ? `${BASE_URL}/slices/update` : `${BASE_URL}/slices/insert`;
    const res = await fetchJSON(endpoint, {
      method: 'POST',
      body: JSON.stringify(schema),
    });

    if (res.ok || res.status === 200 || res.status === 201 || res.status === 204) {
      console.log(`  ✓ Slice "${sliceId}": ${exists ? 'CẬP NHẬT THÀNH CÔNG' : 'TẠO MỚI THÀNH CÔNG'}`);
    } else {
      console.error(`  ✕ Thất bại với slice "${sliceId}": HTTP ${res.status}`, res.data);
    }
  }
}

async function main() {
  try {
    await syncCustomTypes();
    await syncSlices();
    console.log('\n🎉 ĐÃ ĐỒNG BỘ TOÀN BỘ CUSTOM TYPES & SLICES LÊN PRISMIC THÀNH CÔNG!\n');
  } catch (err) {
    console.error('Lỗi khi đồng bộ:', err);
    process.exit(1);
  }
}

main();
