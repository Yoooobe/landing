const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "yoobe-admin-secret-key-2025",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "yoobe2025";

function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  res.redirect("/admin/login");
}

// --- Auth ---

app.get("/admin/login", (req, res) => {
  res.sendFile(path.join(__dirname, "admin", "login.html"));
});

app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.authenticated = true;
    req.session.username = username;
    return res.json({ success: true, redirect: "/admin" });
  }
  res.status(401).json({ success: false, message: "Credenciais inválidas" });
});

app.get("/admin/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/admin/login");
});

app.get("/admin/session", requireAuth, (req, res) => {
  res.json({ authenticated: true, username: req.session.username });
});

// --- Admin panel ---

app.get("/admin", requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, "admin", "editor.html"));
});

// --- Backup helper ---

function createBackup() {
  const backupDir = path.join(__dirname, "backups");
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  fs.copyFileSync(
    path.join(__dirname, "index.html"),
    path.join(backupDir, `index_${ts}.html`)
  );
}

// --- API: raw HTML ---

app.get("/api/landing", requireAuth, (req, res) => {
  try {
    const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");
    res.json({ success: true, html });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/landing", requireAuth, (req, res) => {
  try {
    const { html } = req.body;
    if (!html) return res.status(400).json({ success: false, message: "HTML vazio" });
    createBackup();
    fs.writeFileSync(path.join(__dirname, "index.html"), html, "utf-8");
    res.json({ success: true, message: "Página salva com sucesso!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- API: structured content ---

app.get("/api/content", requireAuth, (req, res) => {
  try {
    const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");
    res.json({ success: true, content: parseAllContent(html) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/content", requireAuth, (req, res) => {
  try {
    const { section, field, value } = req.body;
    let html = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");
    createBackup();
    html = updateContent(html, section, field, value);
    fs.writeFileSync(path.join(__dirname, "index.html"), html, "utf-8");
    res.json({ success: true, message: "Conteúdo atualizado!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- API: backups ---

app.get("/api/backups", requireAuth, (req, res) => {
  try {
    const dir = path.join(__dirname, "backups");
    if (!fs.existsSync(dir)) return res.json({ success: true, backups: [] });
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".html")).sort().reverse().slice(0, 30);
    const backups = files.map(f => {
      const st = fs.statSync(path.join(dir, f));
      return { name: f, size: st.size, date: st.mtime };
    });
    res.json({ success: true, backups });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/backups/restore", requireAuth, (req, res) => {
  try {
    const { name } = req.body;
    const bp = path.join(__dirname, "backups", name);
    if (!fs.existsSync(bp)) return res.status(404).json({ success: false, message: "Backup não encontrado" });
    createBackup();
    fs.copyFileSync(bp, path.join(__dirname, "index.html"));
    res.json({ success: true, message: "Backup restaurado com sucesso!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- API: client logos ---

app.get("/api/clients", requireAuth, (req, res) => {
  try {
    const dir = path.join(__dirname, "clients");
    if (!fs.existsSync(dir)) return res.json({ success: true, clients: [] });
    const files = fs.readdirSync(dir).filter(f => /\.(png|jpg|jpeg|svg|webp)$/i.test(f));
    res.json({ success: true, clients: files.map(f => ({ filename: f, path: `clients/${f}` })) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/upload-logo", requireAuth, (req, res) => {
  try {
    const { filename, data } = req.body;
    if (!filename || !data) return res.status(400).json({ success: false, message: "Dados faltando" });
    const dir = path.join(__dirname, "clients");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const base64Data = data.replace(/^data:image\/[^;]+;base64,/, "");
    fs.writeFileSync(path.join(dir, filename), base64Data, "base64");
    res.json({ success: true, message: "Logo enviada!", path: `clients/${filename}` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete("/api/clients/:filename", requireAuth, (req, res) => {
  try {
    const fp = path.join(__dirname, "clients", req.params.filename);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
    res.json({ success: true, message: "Logo removida!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- Content parsing ---

function parseAllContent(html) {
  const c = {};

  const t = html.match(/<title>(.*?)<\/title>/);
  c.pageTitle = t ? t[1] : "";

  const badge = html.match(/<div class="status-badge">\s*<span>([\s\S]*?)<\/span>/);
  c.statusBadge = badge ? badge[1].trim() : "";

  const h1 = html.match(/<section class="hero">[\s\S]*?<h1>([\s\S]*?)<\/h1>/);
  c.heroTitle = h1 ? h1[1].trim() : "";

  const sub = html.match(/<p class="subtitle">\s*([\s\S]*?)\s*<\/p>/);
  c.heroSubtitle = sub ? sub[1].trim() : "";

  c.services = [];
  const svcRe = /<div class="servico-card">\s*<div class="servico-title">(.*?)<\/div>\s*<div class="servico-desc">\s*([\s\S]*?)\s*<\/div>\s*<\/div>/g;
  let sm;
  while ((sm = svcRe.exec(html)) !== null) {
    c.services.push({ title: sm[1].trim(), desc: sm[2].trim() });
  }

  c.infoCards = [];
  const infoRe = /<div class="info-card"[^>]*>\s*<h3>(.*?)<\/h3>\s*<p>\s*([\s\S]*?)\s*<\/p>\s*<\/div>/g;
  let im;
  while ((im = infoRe.exec(html)) !== null) {
    c.infoCards.push({ title: im[1].trim(), desc: im[2].trim() });
  }

  const spTitle = html.match(/<div class="spoiler-header"[\s\S]*?<span>(.*?)<\/span>\s*<span>(.*?)<\/span>/);
  c.spoilerIcon = spTitle ? spTitle[1].trim() : "";
  c.spoilerTitle = spTitle ? spTitle[2].trim() : "";

  c.spoilerCards = [];
  const scRe = /<div class="spoiler-card">\s*<strong>(.*?)<\/strong>\s*<span>(.*?)<\/span>\s*<\/div>/g;
  let scm;
  while ((scm = scRe.exec(html)) !== null) {
    c.spoilerCards.push({ title: scm[1].trim(), desc: scm[2].trim() });
  }

  const clTitle = html.match(/<div class="clients-box">\s*<h2>(.*?)<\/h2>/);
  c.clientsTitle = clTitle ? clTitle[1].trim() : "";
  const clDesc = html.match(/<div class="clients-box">[\s\S]*?<p>\s*([\s\S]*?)\s*<\/p>/);
  c.clientsDesc = clDesc ? clDesc[1].trim() : "";

  c.clientLogos = [];
  const clRe = /<div class="logo-card"[^>]*title="(.*?)">\s*<img src="(.*?)" alt="(.*?)"/g;
  let clm;
  while ((clm = clRe.exec(html)) !== null) {
    c.clientLogos.push({ name: clm[1].trim(), src: clm[2].trim(), alt: clm[3].trim() });
  }

  c.demoLink = "";
  c.whatsappLink = "";
  const ctaBlock = html.match(/<div class="cta-stack">([\s\S]*?)<\/div>/);
  if (ctaBlock) {
    const ctaLinks = [...ctaBlock[1].matchAll(/href="([^"]*)"/g)];
    if (ctaLinks[0]) c.demoLink = ctaLinks[0][1];
    if (ctaLinks[1]) c.whatsappLink = ctaLinks[1][1];
  }

  const ft = html.match(/<p class="footer-text">([\s\S]*?)<\/p>/);
  c.footerText = ft ? ft[1].trim() : "";

  return c;
}

// --- Content update ---

function updateContent(html, section, field, value) {
  const key = `${section}.${field}`;
  switch (key) {
    case "page.title":
      html = html.replace(/(<title>)(.*?)(<\/title>)/, `$1${value}$3`);
      break;
    case "hero.badge":
      html = html.replace(/(<div class="status-badge">\s*<span>)([\s\S]*?)(<\/span>)/, `$1${value}$3`);
      break;
    case "hero.title":
      html = html.replace(/(<section class="hero">[\s\S]*?<h1>)([\s\S]*?)(<\/h1>)/, `$1${value}$3`);
      break;
    case "hero.subtitle":
      html = html.replace(/(<p class="subtitle">)\s*([\s\S]*?)\s*(<\/p>)/, `$1\n        ${value}\n      $3`);
      break;
    case "footer.text":
      html = html.replace(/(<p class="footer-text">)([\s\S]*?)(<\/p>)/, `$1${value}$3`);
      break;
    case "clients.title":
      html = html.replace(/(<div class="clients-box">\s*<h2>)(.*?)(<\/h2>)/, `$1${value}$3`);
      break;
    case "clients.desc":
      html = html.replace(/(<div class="clients-box">[\s\S]*?<p>)\s*([\s\S]*?)\s*(<\/p>)/, `$1\n          ${value}\n        $3`);
      break;
    case "cta.demo": {
      const ctaM = html.match(/<div class="cta-stack">([\s\S]*?)<\/div>/);
      if (ctaM) {
        let ctaInner = ctaM[1];
        let count = 0;
        ctaInner = ctaInner.replace(/href="([^"]*)"/g, (m, url) => {
          if (count++ === 0) return `href="${value}"`;
          return m;
        });
        html = html.replace(ctaM[1], ctaInner);
      }
      break;
    }
    case "cta.whatsapp": {
      const ctaM = html.match(/<div class="cta-stack">([\s\S]*?)<\/div>/);
      if (ctaM) {
        let ctaInner = ctaM[1];
        let count = 0;
        ctaInner = ctaInner.replace(/href="([^"]*)"/g, (m, url) => {
          if (count++ === 1) return `href="${value}"`;
          return m;
        });
        html = html.replace(ctaM[1], ctaInner);
      }
      break;
    }
    case "spoiler.title":
      html = html.replace(
        /(<div class="spoiler-header"[\s\S]*?<span>[\s\S]*?<\/span>\s*<span>)(.*?)(<\/span>)/,
        `$1${value}$3`
      );
      break;
    default:
      if (section === "service") {
        const idx = parseInt(field, 10);
        const subfield = value.subfield;
        const val = value.value;
        let count = 0;
        if (subfield === "title") {
          html = html.replace(/<div class="servico-title">(.*?)<\/div>/g, (m) => {
            if (count++ === idx) return `<div class="servico-title">${val}</div>`;
            return m;
          });
        } else if (subfield === "desc") {
          html = html.replace(/<div class="servico-desc">\s*([\s\S]*?)\s*<\/div>/g, (m) => {
            if (count++ === idx) return `<div class="servico-desc">\n            ${val}\n          </div>`;
            return m;
          });
        }
      }
      if (section === "info") {
        const idx = parseInt(field, 10);
        const subfield = value.subfield;
        const val = value.value;
        let count = 0;
        const infoBlockRe = /<div class="info-card"([^>]*)>\s*<h3>(.*?)<\/h3>\s*<p>\s*([\s\S]*?)\s*<\/p>\s*<\/div>/g;
        html = html.replace(infoBlockRe, (m, attrs, title, desc) => {
          if (count++ === idx) {
            const newTitle = subfield === "title" ? val : title;
            const newDesc = subfield === "desc" ? val : desc;
            return `<div class="info-card"${attrs}>\n        <h3>${newTitle}</h3>\n        <p>\n          ${newDesc}\n        </p>\n      </div>`;
          }
          return m;
        });
      }
      if (section === "spoilercard") {
        const idx = parseInt(field, 10);
        const subfield = value.subfield;
        const val = value.value;
        let count = 0;
        html = html.replace(/<div class="spoiler-card">\s*<strong>(.*?)<\/strong>\s*<span>(.*?)<\/span>\s*<\/div>/g, (m, title, desc) => {
          if (count++ === idx) {
            const newTitle = subfield === "title" ? val : title;
            const newDesc = subfield === "desc" ? val : desc;
            return `<div class="spoiler-card">\n              <strong>${newTitle}</strong>\n              <span>${newDesc}</span>\n            </div>`;
          }
          return m;
        });
      }
      break;
  }
  return html;
}

// --- Landing page route ---

app.get("/landing", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/landing/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// --- Static assets ---

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Yoobe server rodando em http://localhost:${PORT}`);
  console.log(`Landing Page: http://localhost:${PORT}/landing/`);
  console.log(`Admin/Editor: http://localhost:${PORT}/admin`);
  console.log(`Login: http://localhost:${PORT}/admin/login`);
});
