# VƯƠNG SHOP — Thời Trang May Đo Tối Giản (Minimalist Clothing Atelier)

Website trưng bày và giới thiệu trang phục may đo phong cách tối giản cho **VƯƠNG SHOP**, sử dụng **Next.js** (tối ưu deploy Vercel), **Vanilla CSS**, kết nối **Headless Prismic CMS** (`hub-cms.prismic.io`).

---

## 📸 Bảng Thông Số Kích Thước Ảnh Chuẩn (Image Specifications)

Admin nên chuẩn bị hình ảnh theo đúng tỉ lệ và kích thước khuyến nghị bên dưới để ảnh hiển thị sắc nét, đồng đều và tối ưu tốc độ tải trang:

| Vị trí hiển thị | Tỉ lệ ảnh | Kích thước khuyến nghị | Định dạng tối ưu | Ghi chú |
| :--- | :---: | :---: | :---: | :--- |
| **Ảnh đại diện sản phẩm** (`featured_image`) | **3:4** (Dọc) | **900 x 1200 px** *(tối thiểu 600 x 800 px)* | JPG / WebP | Khung hình người mẫu chụp đứng, chuẩn lookbook thời trang |
| **Album ảnh chi tiết sản phẩm** (`gallery`) | **3:4** (Dọc) | **900 x 1200 px** *(tối thiểu 600 x 800 px)* | JPG / WebP | Các góc chụp cận vải, chi tiết cổ áo, đường may, lưng áo |
| **Logo thương hiệu** (`logo`) | Ngang | **300 x 80 px** *(hoặc SVG)* | PNG trong suốt / SVG | Nền trong suốt để hiển thị hài hòa trên nền trắng |
| **Favicon tab trình duyệt** (`favicon`) | **1:1** (Vuông) | **64 x 64 px** *(hoặc 32 x 32 px)* | PNG / ICO | Icon hiển thị trên tab trình duyệt |
| **Ảnh chia sẻ mạng xã hội** (`og_image`) | **1.91:1** (Ngang) | **1200 x 630 px** | JPG / PNG | Ảnh xem trước khi gửi link qua Zalo, Facebook, iMessage |
| **Ảnh bìa Hero Banner** (`hero_image`) | **16:9** (Ngang rộng) | **1920 x 1080 px** | JPG / WebP | Ảnh banner ngang mở đầu trang chủ |

> 💡 **Mẹo tối ưu:** Sử dụng các công cụ như [TinyPNG](https://tinypng.com/) hoặc xuất định dạng **WebP** trước khi upload lên Prismic để trang web mở nhanh tức thì.

---

## 📝 Hướng Dẫn Quản Trị & Đăng Bài Trên Prismic CMS

> **Địa chỉ trang quản trị:** `https://hub-cms.prismic.io`  
> **Lưu ý quan trọng:** Admin **chỉ cần nhập 100% tiếng Việt**. Khi khách hàng bấm chọn `EN` ngoài website, hệ thống sẽ **tự động dịch sang tiếng Anh** mà admin không cần nhập bất kỳ nội dung tiếng Anh nào.

### 1. Cách đăng một Sản Phẩm mới (`product`)

1. Đăng nhập vào `hub-cms.prismic.io` → chọn mục **Documents** trên menu bên trái.
2. Bấm nút **Create new** ở góc trên bên phải → chọn loại tài liệu **`Sản phẩm Quần Áo / Clothing Product`**.
3. Điền các trường thông tin theo hướng dẫn:
   - **URL Slug**: Nhập mã định danh viết thường, không dấu, cách nhau bởi dấu gạch ngang.  
     *Ví dụ:* `dam-ngan-linen-co-vuong`, `set-bo-ao-sat-nach-linen`.
   - **Tên sản phẩm**: Nhập tên tiếng Việt có dấu.  
     *Ví dụ:* `Đầm Ngắn Linen Trắng Cổ Vuông`.
   - **Danh mục**: Chọn 1 trong 3 danh mục từ menu dropdown:
     - `dam-ngan` (Đầm ngắn)
     - `dam-dai` (Đầm dài)
     - `set-bo` (Set bộ)
   - **Giá bán (VND)**: Nhập số nguyên tiền Việt (không nhập chữ hay dấu chấm).  
     *Ví dụ:* `580000`. *(Website sẽ hiển thị: 580.000đ)*
   - **Giá bán (USD)**: Nhập số tiền đô la tương ứng để phục vụ khách nước ngoài.  
     *Ví dụ:* `24`. *(Website sẽ hiển thị: $24 USD)*
   - **Giá gốc (VND & USD - tuỳ chọn)**: Nhập nếu sản phẩm đang có giá khuyến mãi để web tự gạch ngang giá gốc.
   - **Huy hiệu**: Nhập tag nổi bật như `Mới`, `Bán chạy`, `Giới hạn` (hoặc để trống nếu là sản phẩm thường).
   - **Còn hàng**: Mặc định là `true` (còn hàng). Tắt đi nếu đã hết hàng.
   - **Ảnh đại diện (Tỉ lệ 3:4)**: Bấm chọn và upload file ảnh đứng (kích thước khuyên dùng **900 x 1200 px**).
   - **Album ảnh sản phẩm**: Bấm nút **Add an item** để thêm từng ảnh chụp các góc độ khác nhau của trang phục (cận chất vải, mặt sau, góc nghiêng,...).
   - **Mô tả sản phẩm**: Nhập mô tả kiểu dáng, đặc điểm nổi bật, chất liệu vải bằng tiếng Việt.
4. Bấm nút **Save** ở góc trên bên phải, sau đó bấm **Publish** để đưa sản phẩm lên website ngay lập tức.

---

### 2. Cài đặt Thông tin Shop & SEO (`shop_settings`)

1. Vào **Documents** → tìm và mở tài liệu **`Cài đặt Cửa Hàng & SEO / Shop Settings`** (tài liệu này chỉ có 1 bản duy nhất).
2. **Tab `General` (Thông tin liên hệ & Logo):**
   - **Tên shop**: Ví dụ `VƯƠNG SHOP`.
   - **Logo thương hiệu**: Upload ảnh logo file PNG nền trong suốt (nếu chưa upload, web sẽ tự hiển thị Text Logo thanh lịch).
   - **Khẩu hiệu / Slogan**: Câu slogan của tiệm (ví dụ: *Thời trang may đo tối giản tông trắng*).
   - **Hotline**: Số điện thoại liên hệ (ví dụ: `0988 123 456`).
   - **Link Facebook, Instagram, Shopee**: Dán đường link trang shop của bạn để khách bấm vào là mở trực tiếp.
   - **Địa chỉ cửa hàng**: Nhập địa chỉ tiếng Việt. *(Hệ thống tự dịch sang tiếng Anh cho khách quốc tế xem ở footer)*.
3. **Tab `SEO & Metadata` (Cấu hình Google Search & Tab web):**
   - **Tiêu đề web trên Tab (SEO)**: Tiêu đề hiển thị trên thanh tab của trình duyệt và kết quả Google Search.
   - **Mô tả Google (SEO)**: Đoạn văn ngắn 1-2 câu tóm tắt giới thiệu shop hiển thị trên Google.
   - **Favicon tab web**: Upload ảnh icon vuông nhỏ 64x64px để hiện icon shop trên tab trình duyệt.
   - **Ảnh chia sẻ link MXH**: Upload ảnh ngang tỉ lệ 1200x630px để khi gửi link web qua Zalo, Messenger, Facebook sẽ hiện ảnh bìa đại diện sang trọng.
   - **Từ khoá SEO**: Các từ khoá ngăn cách bằng dấu phẩy (ví dụ: *thời trang tối giản, đầm trắng, đầm linen, set bộ*).
4. Bấm **Save** → bấm **Publish**.

---

### 3. Cấu hình 3 Danh mục sản phẩm (`category`)

Website đã thiết lập sẵn 3 danh mục chính:
1. `dam-ngan` — Đầm ngắn
2. `dam-dai` — Đầm dài
3. `set-bo` — Set bộ

Nếu cần điều chỉnh tên hiển thị hoặc câu giới thiệu ngắn của từng danh mục, vào **Documents** → mở danh mục tương ứng → chỉnh sửa → bấm **Publish**.

---

## 💻 Hướng Dẫn Kỹ Thuật (Dành Cho Developer)

### Cài đặt môi trường
Tạo file `.env.local` ở thư mục gốc:
```env
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=hub-cms
PRISMIC_REPOSITORY_NAME=hub-cms
# Token Custom Types API để tự động sync schema (lấy tại Settings -> Permanent Access Tokens trên Prismic)
PRISMIC_CUSTOM_TYPES_API_TOKEN=your_token_here
```

### Các câu lệnh thường dùng
```bash
# 1. Chạy môi trường phát triển cục bộ
npm run dev

# 2. Kiểm tra biên dịch Next.js (TypeScript, Turbopack, SSR)
npm run build

# 3. Đẩy toàn bộ Custom Types và Slices mới nhất lên Prismic API
npm run prismic:push
```

---

## 🎨 Điểm Nhấn Thiết Kế & Tính Năng Nổi Bật

- **Tông trắng chủ đạo & Đường nét tối giản**: Viền mỏng 1px (`#eeeeee`), bo góc nhẹ 2-4px, không đổ bóng thô ráp.
- **Trải nghiệm lướt xem không gián đoạn (History-synced Modal)**:
  - Khi click vào sản phẩm ở trang danh mục, modal chi tiết bật lên tức thì không reload trang.
  - Đồng thời cập nhật URL thành `/product/[uid]` và **ghi vào lịch sử trình duyệt (Browser History)**, giúp người dùng dễ dàng tìm lại hôm sau hoặc copy URL chia sẻ cho bạn bè.
- **Tùy chọn hiển thị 10 / 20 / 30 sản phẩm**: Tự động lưu tham số query `?limit=...` trên URL để khi tải lại trang vẫn giữ nguyên lựa chọn của khách.
- **Responsive Mobile chuẩn mực**: Hiển thị **2 sản phẩm mỗi dòng** (`repeat(2, 1fr)`) đồng đều trên điện thoại cả ở trang danh mục lẫn phần sản phẩm gợi ý.
- **Hiệu ứng chuyển trang mượt mà**: Lớp phủ làm mờ toàn màn hình kết hợp vòng xoay tròn loading circle tinh tế.
