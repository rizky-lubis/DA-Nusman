# Dhinakara Adventure (DA-Nusman)

Website UKM Pencinta Alam **Dhinakara Adventure** — Universitas Nusa Mandiri (kampus Jatiwaringin, Margonda, Rawamangun).

## Stack

- HTML statis + Tailwind CDN
- `css/style.css`, `js/data.js`, `js/main.js`
- Panel admin di `/admin` (konten disimpan di browser / export `data.js`)

## Jalankan lokal

Buka `index.html` di browser, atau pakai server lokal:

```bash
npx serve .
```

## Deploy ke Vercel

1. Push repo ini ke GitHub (sudah: `rizky-lubis/DA-Nusman`).
2. Di [vercel.com](https://vercel.com) → **Add New Project** → pilih repo ini.
3. Framework Preset: **Other**
4. Build Command: *kosong*
5. Output Directory: *kosong*
6. Deploy

Setelah deploy, situs publik dan admin tersedia di domain Vercel.

### Catatan admin

Perubahan di Admin disimpan di **localStorage** browser. Agar konten permanen untuk semua pengunjung:

1. Edit di Admin → **Simpan**
2. **Export data.js**
3. Ganti file `js/data.js` di repo
4. Commit & push (Vercel akan redeploy otomatis)

## Halaman

| File | Isi |
|------|-----|
| `index.html` | Beranda |
| `profil.html` | Profil & struktur BPH |
| `kegiatan.html` | Berita / kegiatan |
| `galeri.html` | Galeri |
| `diksar.html` | Pendidikan Dasar |
| `dikjut.html` | Pendidikan Lanjut |
| `kontak.html` | Kontak |
| `admin/` | CMS sederhana |

## Repo

https://github.com/rizky-lubis/DA-Nusman
