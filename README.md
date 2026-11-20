# 3D Gallery (GitHub Pages)

1. Put your `.glb` files in `models/` (max 12 are shown).
2. Edit `js/models.js`: site name, contact (WhatsApp/email) and one block per model.
3. Push to GitHub → Settings → Pages → Deploy from branch `main` / root.

Test locally: `python -m http.server` then open http://localhost:8000
(opening index.html directly may block GLB loading in some browsers).

Tips: keep each GLB under ~10 MB (Draco/meshopt + 2K textures). Optional `poster: "models/x.jpg"` per item shows an image while loading.
