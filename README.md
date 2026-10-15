# VƯƠNG SHOP — Thời Trang May Đo Tối Giản (Minimalist Clothing Atelier)

Website trưng bày và giới thiệu trang phục may đo phong cách tối giản cho **VƯƠNG SHOP**, sử dụng **Next.js** (tối ưu deploy Vercel), **Vanilla CSS**, kết nối **Headless Prismic CMS** (`hub-cms.prismic.io`).

---

## ✨ Điểm nổi bật & Yêu cầu thiết kế

1. **Thẩm mỹ tối giản, tông trắng chủ đạo**:
   - Tông màu trắng thanh lịch (`#ffffff`, `#fafafa`), hairline border siêu mảnh (`#eeeeee`).
   - Border radius chuẩn mực: chỉ từ **2px đến 4px** (`--radius-xs: 2px`, `--radius-sm: 3px`, `--radius-md: 4px`), tạo nét hiện đại, sang trọng như các lookbook thời trang quốc tế.
   - Không dùng đổ bóng đậm, chỉ có shadow nhẹ nhàng tinh tế.
2. **Hệ thống Flat Icon chuẩn mực**:
   - Hoàn toàn dùng SVG flat icons tinh gọn (Facebook, Instagram, Zalo, Share, Globe, Copy, Check, Filter, Search, Bag,...).
   - **Tuyệt đối không dùng emoji hay icon dạng ký tự**.
3. **Chức năng Chia sẻ (Social Share)**:
   - Nút chia sẻ trực tiếp lên **Facebook**, **Instagram**, và **Zalo**.
   - Hỗ trợ sao chép link (Copy to clipboard) có thông báo toast phản hồi.
   - Hỗ trợ Web Share API nguyên bản trên thiết bị di động.
4. **Nút dịch song ngữ (Tiếng Việt ⟷ Tiếng Anh)**:
   - Nút chuyển ngữ trực quan `VI / EN` trên Header với flat Globe icon.
   - Dịch tức thời toàn bộ tiêu đề, mô tả, chất liệu, hướng dẫn bảo quản, bảng kích cỡ và nút bấm.
5. **Headless Prismic CMS (`hub-cms.prismic.io`)**:
   - Cấu hình repo name: `hub-cms`.
   - Đã sinh sẵn toàn bộ cấu trúc **Custom Types** (`product`, `category`, `homepage`, `shop_settings`) và **Shared Slices** (`HeroBanner`, `FeaturedCollection`, `Lookbook`, `BrandStory`).
   - Có sẵn lệnh đẩy tự động **`npm run prismic:push`** lên Prismic API mà không cần tạo từng type thủ công trên giao diện web.
   - Cơ chế **Fail-safe fallback**: Khi Prismic chưa có dữ liệu hoặc chưa cấu hình token, website vẫn hiển thị dữ liệu mẫu thời trang chất lượng cao, hình ảnh sắc nét, trải nghiệm đầy đủ ngay lập tức.

---

## 🛠️ Cấu trúc thư mục

```text
shop-vuong/
├── customtypes/                     # Định nghĩa schema JSON của Custom Types
│   ├── product/index.json           # Type: Sản phẩm thời trang (bilingual, sizes, colors, gallery)
│   ├── category/index.json          # Type: Danh mục quần áo
│   ├── homepage/index.json          # Type: Trang chủ & Slice zone
│   └── shop_settings/index.json     # Type: Thông tin hotline, địa chỉ, Zalo, FB
├── src/
│   ├── slices/                      # Prismic Shared Slices
│   │   ├── HeroBanner/              # Banner mở đầu lookbook
│   │   ├── FeaturedCollection/      # Danh mục trang phục nổi bật
│   │   ├── Lookbook/                # Bộ ảnh lookbook thời trang
│   │   └── BrandStory/              # Câu chuyện thương hiệu & triết lý vải sợi
│   ├── components/
│   │   ├── FlatIcons.tsx            # Bộ icon flat SVG (Zalo, FB, IG, Globe, Share,...)
│   │   ├── Navbar.tsx               # Header, thanh thông báo, nút dịch VI/EN, chat Zalo
│   │   ├── ProductCard.tsx          # Thẻ sản phẩm với nút Xem nhanh & Chia sẻ
│   │   ├── ProductDetailModal.tsx   # Modal xem chi tiết hình ảnh, size, chất liệu, Zalo
│   │   ├── ShareModal.tsx           # Modal chia sẻ lên Facebook, Zalo, Instagram
│   │   ├── ShopClient.tsx           # Quản lý state bộ lọc, tìm kiếm, sắp xếp & ngôn ngữ
│   │   └── Footer.tsx               # Chân trang & thông tin shop
│   ├── lib/
│   │   ├── types.ts                 # Type definitions
│   │   ├── mock-data.ts             # Dữ liệu mẫu trang phục tự nhiên
│   │   └── prismic.ts               # Prismic client & helper methods
│   └── app/
│       ├── layout.tsx               # Next.js Root Layout & SEO Meta
│       ├── page.tsx                 # Trang chủ Server Component
│       └── globals.css              # Reset & biến CSS tông trắng chủ đạo
├── scripts/
│   └── sync-prismic.mjs             # Script đẩy Custom Types & Slices tự động lên Prismic
├── slicemachine.config.json         # Cấu hình Slice Machine cho repo hub-cms
├── .env.example                     # Biến môi trường mẫu
└── .env.local                       # Cấu hình local
```

---

## 🚀 Hướng dẫn khởi chạy Local

```bash
# Cài đặt dependencies
npm install

# Chạy server development
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000).

---

## 🔄 Hướng dẫn đồng bộ lên Prismic (`hub-cms.prismic.io`)

Bạn **không cần** vào web Prismic tạo từng field hay custom type:

1. Đăng nhập vào repository Prismic của bạn: [https://hub-cms.prismic.io](https://hub-cms.prismic.io).
2. Vào **Settings** -> **Permanent Access Tokens** (hoặc Custom Types API).
3. Tạo 1 token với quyền **Custom Types API**, sau đó dán vào file `.env.local`:
   ```env
   PRISMIC_CUSTOM_TYPES_API_TOKEN=your_token_here
   ```
4. Chạy lệnh đồng bộ:
   ```bash
   npm run prismic:push
   ```
   Lệnh sẽ tự động đẩy toàn bộ `product`, `category`, `homepage`, `shop_settings` và các slices `hero_banner`, `featured_collection`, `lookbook`, `brand_story` lên Prismic CMS.

Hoặc nếu bạn muốn dùng giao diện Slice Machine UI:
```bash
npm run slicemachine
```

---

## ☁️ Hướng dẫn Deploy lên Vercel

1. Đẩy code lên GitHub / GitLab / Bitbucket.
2. Truy cập [Vercel](https://vercel.com) -> **Add New Project** -> Chọn repo `shop-vuong`.
3. Trong phần **Environment Variables**, điền:
   - `NEXT_PUBLIC_PRISMIC_ENVIRONMENT`: `hub-cms`
   - `PRISMIC_REPOSITORY_NAME`: `hub-cms`
   - `PRISMIC_CUSTOM_TYPES_API_TOKEN`: *(nếu cần)*
   - `PRISMIC_ACCESS_TOKEN`: *(nếu repo Prismic để private)*
   - `NEXT_PUBLIC_SITE_URL`: Domain Vercel của bạn (ví dụ `https://shop-vuong.vercel.app`)
4. Bấm **Deploy**. Project sẽ tự động build và online trong vòng 1-2 phút!
