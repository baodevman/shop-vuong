# VƯƠNG SHOP — Thời Trang May Đo Tối Giản (Minimalist Clothing Atelier)

Website trưng bày và giới thiệu trang phục may đo phong cách tối giản cho **VƯƠNG SHOP**, sử dụng **Next.js** (tối ưu deploy Vercel), **Vanilla CSS**, kết nối **Headless Prismic CMS** (`hub-cms.prismic.io`).

---

## 📸 Bảng Thông Số Kích Thước Ảnh Chuẩn (Image Specifications)

Admin nên chuẩn bị hình ảnh theo đúng tỉ lệ và kích thước khuyến nghị bên dưới để ảnh hiển thị sắc nét, đồng đều và tối ưu tốc độ tải trang:

| Vị trí hiển thị | Tỉ lệ ảnh | Kích thước khuyến nghị | Định dạng tối ưu | Ghi chú |
| :--- | :---: | :---: | :---: | :--- |
| **Ảnh đại diện sản phẩm** (`featured_image`) | **3:4** (Dọc) | **900 x 1200 px** *(tối thiểu 600 x 800 px)* | JPG / WebP | Khung hình người mẫu chụp đứng, chuẩn lookbook thời trang |
| **Album ảnh chi tiết sản phẩm** (`gallery`) | **3:4** (Dọc) | **900 x 1200 px** *(tối thiểu 600 x 800 px)* | JPG / WebP | Các góc chụp cận vải, chi tiết cổ áo, đường may, lưng áo |
| **Ảnh Bảng size sản phẩm** (`size_chart_image`) | Ngang / Dọc | **800 x 600 px** *(hoặc tùy chỉnh)* | PNG / JPG | Hiển thị bảng số đo S/M/L rõ ràng phía trên mô tả |
| **Ảnh Banner dưới Topbar** (`top_banner`) | **16:9** hoặc **21:9** | **1920 x 480 px** *(tối thiểu 1200 x 300 px)* | JPG / WebP | Banner quảng bá bộ sưu tập mới ngay dưới header |
| **Logo thương hiệu** (`logo`) | Ngang | **300 x 80 px** *(hoặc SVG)* | PNG trong suốt / SVG | Nền trong suốt để hiển thị hài hòa trên topbar |
| **Favicon tab trình duyệt** (`favicon`) | **1:1** (Vuông) | **64 x 64 px** *(hoặc 32 x 32 px)* | PNG / ICO | Icon hiển thị trên tab trình duyệt |
| **Ảnh chia sẻ mạng xã hội** (`og_image`) | **1.91:1** (Ngang) | **1200 x 630 px** | JPG / PNG | Ảnh xem trước khi gửi link qua Zalo, Facebook, iMessage |

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
   - **Giá bán (VND)**: Nhập số tiền VND (ví dụ: `580000` → hiển thị: `580.000đ`).
   - **Giá bán (USD)**: Nhập số tiền USD tương ứng (ví dụ: `24` → hiển thị: `$24 USD`).
   - **Giá gốc (VND & USD - tuỳ chọn)**: Nhập nếu sản phẩm đang có giá khuyến mãi để web tự gạch ngang giá gốc.
   - **Huy hiệu**: Nhập tag nổi bật như `Mới`, `Bán chạy`, `Giới hạn` (hoặc để trống nếu là sản phẩm thường).
   - **Phân loại màu sắc (Color Variations)**: Bấm **Add an item** để thêm các màu sắc cho sản phẩm:
     - *Tên màu:* Nhập tên màu (Trắng, Đen, Kem, Be, Hồng nhạt...).
     - *Mã màu (Hex):* Bấm vào ô chọn màu để chọn màu tương ứng (ví dụ: trắng `#ffffff`, đen `#111111`, be `#e8dfd8`).
     - *Ảnh theo màu (`color_image`):* Upload ảnh sản phẩm chụp theo màu này (tỉ lệ 3:4). Khi khách nhấp vào chấm màu ở danh sách card hoặc trong trang chi tiết, ảnh tương ứng của màu đó sẽ tự động hiển thị ra ngay!
     - Có thể thêm nhiều màu hoặc chỉ 1 màu tuỳ thích. Các ô tròn màu sẽ tự động hiển thị bên phải tên sản phẩm ở danh sách và bên dưới phần giá ở trang chi tiết!
   - **Ảnh Bảng Size**: Bấm chọn ảnh bảng size (số đo ngực/eo/mông) để hiển thị trực tiếp cho khách xem ngay phía trên mô tả.
   - **Còn hàng**: Mặc định là `true` (còn hàng). Tắt đi nếu đã hết hàng.
   - **Ảnh đại diện (Tỉ lệ 3:4)**: Bấm chọn và upload file ảnh đứng (kích thước khuyên dùng **900 x 1200 px**).
   - **Album ảnh sản phẩm**: Bấm nút **Add an item** để thêm từng ảnh chụp các góc độ khác nhau của trang phục (cận chất vải, mặt sau, góc nghiêng,...).
   - **Mô tả sản phẩm**: Nhập mô tả kiểu dáng, chất liệu vải bằng tiếng Việt. Ngoài web có nút "Xem thêm / Thu gọn" tự động giúp trang luôn gọn gàng.
4. Bấm nút **Save** ở góc trên bên phải, sau đó bấm **Publish** để đưa sản phẩm lên website ngay lập tức.

---

### 2. Cài đặt Thông tin Shop, Topbar, Banner & SEO (`shop_settings`)

1. Vào **Documents** → tìm và mở tài liệu **`Cài đặt Cửa Hàng & SEO / Shop Settings`** (tài liệu này chỉ có 1 bản duy nhất).
2. **Tab `General`:**
   - **Tên shop**: Ví dụ `VƯƠNG SHOP`.
   - **Logo thương hiệu**: Upload ảnh logo (kích thước tùy chọn, hệ thống tự động tối ưu hiển thị đẹp mắt, không vỡ layout).
   - **Khẩu hiệu / Slogan**: Câu slogan của tiệm (ví dụ: *Thời trang may đo tối giản tông trắng*).
   - **Hotline**: Số điện thoại liên hệ (ví dụ: `0988 123 456`). Trên Topbar sẽ có icon điện thoại, khách bấm vào là mở ứng dụng gọi trực tiếp!
   - **Link Google Maps chỉ đường**: Dán link Google Maps địa chỉ shop. Trên Topbar sẽ có icon Maps chỉ đường trực tiếp đến shop!
   - **Link Facebook, Instagram, Shopee**: Dán đường link các trang mạng xã hội của shop.
   - **Địa chỉ cửa hàng**: Nhập địa chỉ tiếng Việt.
   - **Ảnh Banner dưới Topbar**: Upload ảnh banner ngang (1920x480px) để quảng bá bộ sưu tập mới ngay dưới header.
   - **Link click Banner**: Nhập đường link khi khách bấm vào banner (ví dụ: `/category/dam-dai` hoặc link bài viết).
3. **Tab `SEO & Metadata`:**
   - **Tiêu đề web trên Tab (SEO)**: Tiêu đề hiển thị trên thanh tab trình duyệt và Google Search.
   - **Mô tả Google (SEO)**: Đoạn văn ngắn 1-2 câu tóm tắt giới thiệu shop hiển thị trên Google.
   - **Favicon tab web**: Upload ảnh icon vuông nhỏ 64x64px.
   - **Ảnh chia sẻ link MXH**: Upload ảnh ngang tỉ lệ 1200x630px để khi gửi link web qua Zalo, Messenger, Facebook sẽ hiện ảnh bìa đại diện sang trọng.
   - **Từ khoá SEO**: Các từ khoá ngăn cách bằng dấu phẩy.
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
- **Topbar & Header cao cấp**:
  - Logo to rõ, kích thước tự động co giãn theo file upload của admin.
  - Tích hợp đầy đủ icon Hotline gọi điện trực tiếp, icon Google Maps chỉ đường, icon Shopee, Facebook, Instagram và nút đổi ngôn ngữ VI/EN.
- **Top Banner linh hoạt**: Cho phép admin upload banner khuyến mãi hoặc lookbook mới ngay bên dưới Topbar từ Prismic.
- **Catalog tinh gọn & Tối ưu chuyển đổi**:
  - Thu gọn khoảng cách giữa các card sản phẩm, card to hơn và nổi bật hơn.
  - Bỏ search và lọc giá rườm rà.
  - Bộ chọn Sắp xếp (Mới nhất, Giá thấp đến cao, Giá cao đến thấp) chuyển lên ngang hàng với menu danh mục bên phải ngoài cùng.
  - Cố định 20 sản phẩm/trang.
- **Phân loại màu sắc (Color Variations)**: Hiển thị các chấm màu tròn to rõ bên phải tên sản phẩm ở danh sách và bên dưới tên ở trang chi tiết.
- **Trang Chi Tiết Sản Phẩm nâng cấp**:
  - Bỏ danh mục phía trên title.
  - Khung ảnh chi tiết được cố định kích thước chuẩn 3:4, đồng bộ 100% giữa tất cả các sản phẩm (không còn tình trạng ảnh to ảnh nhỏ).
  - Thêm khu vực hiển thị **Bảng Size** ngay trên mô tả sản phẩm.
  - Mô tả sản phẩm thu gọn có nút "Xem thêm / Thu gọn" tiện lợi.
  - Mục **"Sản phẩm khác"** hiển thị 10 sản phẩm với thanh cuộn ngang mượt mà.
- **Footer tối giản**: Bỏ các thông tin rườm rà, chỉ giữ lại dòng bản quyền tinh tế ở đáy trang.
- **Hiệu ứng chuyển trang mượt mà**: Lớp phủ làm mờ toàn màn hình kết hợp vòng xoay tròn loading circle tinh tế.
