# VƯƠNG SHOP — Thời Trang May Đo Tối Giản (Minimalist Clothing Atelier)

Website trưng bày và giới thiệu trang phục may đo phong cách tối giản cho **VƯƠNG SHOP**, sử dụng **Next.js** (tối ưu deploy Vercel), **Vanilla CSS**, kết nối **Headless Prismic CMS** (`hub-cms.prismic.io`).

---

## 📸 Bảng Thông Số Kích Thước Ảnh Chuẩn (Image Specifications)

Admin nên chuẩn bị hình ảnh theo đúng tỉ lệ và kích thước khuyến nghị bên dưới để ảnh hiển thị sắc nét, đồng đều và tối ưu tốc độ tải trang:

| Vị trí hiển thị | Tỉ lệ ảnh | Kích thước khuyến nghị | Định dạng tối ưu | Ghi chú |
| :--- | :---: | :---: | :---: | :--- |
| **Ảnh đại diện sản phẩm** (`featured_image`) | **3:4** (Dọc) | **900 x 1200 px** *(tối thiểu 600 x 800 px)* | JPG / WebP | Khung hình người mẫu chụp đứng, chuẩn lookbook thời trang |
| **Ảnh theo màu sắc** (`color_image`) | **3:4** (Dọc) | **900 x 1200 px** *(tối thiểu 600 x 800 px)* | JPG / WebP | Ảnh chụp người mẫu mặc trang phục theo từng màu cụ thể |
| **Album ảnh chi tiết sản phẩm** (`gallery`) | **3:4** (Dọc) | **900 x 1200 px** *(tối thiểu 600 x 800 px)* | JPG / WebP | Các góc chụp cận vải, chi tiết cổ áo, đường may, lưng áo |
| **Ảnh Bảng size sản phẩm** (`size_chart_image`) | Ngang / Dọc | **800 x 600 px** *(hoặc tùy chỉnh)* | PNG / JPG | Hiển thị bảng số đo S/M/L rõ ràng phía trên mô tả |
| **Ảnh Banner dưới Topbar** (`top_banner`) | **16:9** hoặc **21:9** | **1920 x 480 px** *(tối thiểu 1200 x 300 px)* | JPG / WebP | Banner quảng bá bộ sưu tập mới (có sẵn ảnh sample dự phòng) |
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
   - **Phân loại màu sắc (Color Variations)**: Bấm **Add an item** để thêm từng màu sắc cho sản phẩm:
     - *Tên màu:* Nhập tên màu (Trắng, Đen, Kem, Be, Xanh mint, Hồng pastel...).
     - *Mã màu (Hex):* Bấm vào ô chọn màu để chọn màu trực quan (ví dụ: Trắng `#ffffff`, Đen `#111111`, Be `#e8dfd8`).
     - *Ảnh theo màu (`color_image`):* **Upload ảnh sản phẩm chụp với màu này (chuẩn tỉ lệ 3:4)**.  
       👉 **Tính năng đổi ảnh thông minh:** Khi khách hàng nhấp vào chấm màu ngoài thẻ sản phẩm ở trang chủ hoặc nhấp chọn màu trong trang chi tiết, **ảnh sản phẩm sẽ lập tức đổi sang đúng ảnh của màu đó**!  
       *(Nếu sản phẩm chỉ có 1 màu hoặc chưa có ảnh riêng cho từng màu thì có thể bỏ trống ô ảnh này).*
   - **Ảnh Bảng Size (`size_chart_image`)**: Bấm chọn/upload ảnh bảng quy đổi kích cỡ (số đo vòng 1, 2, 3 tương ứng với size S, M, L). Bảng size sẽ tự động hiển thị ngay phía trên phần mô tả trang phục.
   - **Còn hàng**: Mặc định là `true` (còn hàng). Tắt đi nếu đã hết hàng hoặc chuyển sang nhận đặt may (Pre-order).
   - **Ảnh đại diện (Tỉ lệ 3:4)**: Bấm chọn và upload file ảnh đứng (kích thước khuyên dùng **900 x 1200 px**).
   - **Album ảnh sản phẩm**: Bấm nút **Add an item** để thêm từng ảnh chụp các góc độ khác nhau của trang phục (cận chất vải, mặt sau, góc nghiêng,...).
   - **Mô tả sản phẩm**: Nhập mô tả kiểu dáng, chất liệu vải bằng tiếng Việt. Phần mô tả ngoài web được thiết kế gọn gàng, tự động có nút **"Xem thêm... / Thu gọn"** giúp trang phục luôn thanh lịch.
4. Bấm nút **Save** ở góc trên bên phải, sau đó bấm **Publish** để đưa sản phẩm lên website ngay lập tức.

---

### 2. Cài đặt Thông tin Shop, Topbar, Banner & SEO (`shop_settings`)

1. Vào **Documents** → tìm và mở tài liệu **`Cài đặt Cửa Hàng & SEO / Shop Settings`** (tài liệu này chỉ có 1 bản duy nhất).
2. **Tab `General`:**
   - **Tên shop**: Ví dụ `VƯƠNG SHOP`.
   - **Logo thương hiệu**: Upload ảnh logo. Kích thước hiển thị đã được tối ưu co giãn tự động theo file ảnh gốc của admin (chiều cao tối đa 54px, chiều rộng tối đa 240px, chống vỡ layout).
   - **Khẩu hiệu / Slogan**: Câu slogan của tiệm (ví dụ: *Thời trang may đo tối giản tông trắng*).
   - **Hotline**: Số điện thoại liên hệ (ví dụ: `0988 123 456`). Trên Topbar sẽ có icon điện thoại phẳng, khách bấm vào là mở ứng dụng gọi trực tiếp!
   - **Link Google Maps chỉ đường**: Dán link Google Maps địa chỉ shop. Trên Topbar sẽ có icon Maps, khách bấm vào là mở bản đồ chỉ đường trực tiếp đến shop!
   - **Link Facebook / Fanpage**: Nhập link fanpage của tiệm (ví dụ: `https://facebook.com/mamasg.atelier`).  
     👉 **Tự động tạo link Bong bóng Chat Messenger:** Hệ thống sẽ **tự động phân tích** link Facebook bạn nhập và chuyển đổi thành link `https://m.me/mamasg.atelier`. Khách hàng nhấp vào bong bóng chat Messenger ở góc dưới bên phải màn hình sẽ được đưa thẳng tới hộp thoại chat với shop!
   - **Link Messenger (Tùy chọn)**: Nếu muốn chỉ định một link chat Messenger khác, admin có thể nhập tại đây (nếu để trống, web tự lấy từ Link Facebook ở trên).
   - **Link Instagram, Shopee**: Dán đường link các trang mạng xã hội và gian hàng Shopee của shop.
   - **Địa chỉ cửa hàng**: Nhập địa chỉ tiếng Việt.
   - **Ảnh Banner dưới Topbar (`top_banner`)**: Upload ảnh banner ngang (khuyên dùng 1920x480px, tỉ lệ 16:9 đến 21:9) để quảng bá bộ sưu tập mới.  
     > ✨ **Cơ chế Banner mẫu thông minh:** Nếu admin chưa upload banner (hoặc để trống), website sẽ tự động hiển thị banner mẫu thời trang sang trọng. Khi admin upload banner riêng của shop, website sẽ tự động thay thế ngay lập tức!
   - **Link click Banner (`top_banner_link`)**: Nhập đường link khi khách bấm vào banner (ví dụ: `/category/dam-dai`, link sản phẩm hoặc bài viết).
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
NEXT_PUBLIC_GA_ID=G-3ZSZF8E3W0
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

## 📊 Hướng Dẫn Xem Thống Kê Google Analytics 4 (GA4)

Website đã tích hợp sẵn mã theo dõi **`G-3ZSZF8E3W0`** với đầy đủ các sự kiện tự động:

1. **Xem trang / Sản phẩm nào được xem nhiều nhất & lâu nhất:**
   - Đăng nhập vào [analytics.google.com](https://analytics.google.com/).
   - Vào menu bên trái: **Reports (Báo cáo)** → **Engagement (Mức độ tương tác)** → **Pages and screens (Trang và màn hình)**.
   - Cột **Views**: Thống kê số lượt xem của từng trang sản phẩm (ví dụ: `/product/dam-ngan-linen`, `/product/set-bo...`).
   - Cột **Average engagement time**: Thống kê thời gian xem trung bình (cho biết khách xem trang phục nào lâu nhất tính theo phút / giây).

2. **Xem khách thích dùng kênh liên hệ & liên kết nào nhất:**
   - Vào **Reports** → **Engagement** → **Events (Sự kiện)**.
   - Thống kê chi tiết các lượt click:
     - `click_hotline`: Số lượt bấm nút gọi điện thoại.
     - `click_messenger`: Số lượt bấm vào bong bóng chat Messenger.
     - `click_maps`: Số lượt bấm xem vị trí cửa hàng trên Google Maps.
     - `click_shopee`: Số lượt bấm nút sang Shopee mua hàng.
     - `click_facebook` / `click_instagram`: Số lượt bấm xem mạng xã hội.

3. **Xem tỷ lệ khách chọn tiếng Việt hay tiếng Anh:**
   - Trong bảng **Events (Sự kiện)**, nhấp vào sự kiện `change_language` để xem số lượt khách chuyển sang tiếng Việt (`vi`) hoặc tiếng Anh (`en`).
   - Hoặc xem tại mục **User attributes (Đặc điểm người dùng)** → **Tech (Công nghệ)** để xem ngôn ngữ thiết bị của khách truy cập.

---

## 🎨 Điểm Nhấn Thiết Kế & Tính Năng Nổi Bật

- **Tông trắng chủ đạo & Đường nét tối giản**: Viền mỏng 1px (`#eeeeee`), bo góc nhẹ 2-4px, không đổ bóng thô ráp.
- **Topbar & Header cao cấp**:
  - Logo to rõ, kích thước tự động co giãn theo file upload của admin.
  - Tích hợp đầy đủ icon Hotline gọi điện trực tiếp, icon Google Maps chỉ đường, icon Shopee, Facebook, Instagram và nút đổi ngôn ngữ VI/EN.
- **Top Banner linh hoạt**:
  - Tự động hiển thị banner mẫu cao cấp nếu admin chưa upload ảnh.
  - Cho phép admin tự upload banner mới từ Prismic và gắn link chuyển hướng khi click.
- **Catalog tinh gọn & Tối ưu chuyển đổi**:
  - Thu gọn khoảng cách giữa các card sản phẩm, card to hơn và nổi bật hơn.
  - Bỏ search và lọc giá rườm rà.
  - Bộ chọn Sắp xếp (Mới nhất, Giá thấp đến cao, Giá cao đến thấp) nằm ngang hàng với menu danh mục bên phải ngoài cùng.
  - Cố định 20 sản phẩm/trang, tự động phân trang khi có nhiều sản phẩm.
- **Phân loại màu sắc thông minh (Color Variations)**:
  - Các ô tròn màu kích thước to 22px rõ nét hiển thị ngay bên phải tên sản phẩm.
  - **Click vào từng màu sẽ đổi ngay ảnh tương ứng** của màu đó cả ở danh sách ngoài trang chủ lẫn trong chi tiết.
- **Trang Chi Tiết Sản Phẩm nâng cấp**:
  - Khung ảnh chi tiết cố định chuẩn tỉ lệ 3:4, đồng nhất kích thước cho mọi sản phẩm.
  - Cụm lựa chọn màu sắc được bố trí ngay bên dưới phần giá bán với tên màu hiển thị rõ ràng.
  - Thêm khu vực hiển thị **Bảng Size** ngay trên mô tả sản phẩm.
  - Mô tả sản phẩm thu gọn có nút "Xem thêm... / Thu gọn" tiện lợi.
  - Nút **"Mua trên Shopee"** đổi sang tone đen tối giản (#111111) sang trọng đồng bộ với màu sắc thương hiệu.
  - Mục **"Sản phẩm khác"** hiển thị 10 sản phẩm với thanh cuộn ngang mượt mà.
- **Footer tối giản**: Bỏ các thông tin rườm rà, chỉ giữ lại duy nhất dòng bản quyền ở đáy trang.
- **Hiệu ứng chuyển trang mượt mà**: Lớp phủ làm mờ toàn màn hình kết hợp vòng xoay tròn loading circle tinh tế.
