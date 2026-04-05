const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

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
  if (req.session && req.session.authenticated) {
    return next();
  }
  res.redirect("/admin/login");
}

// --- Auth routes ---

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

// --- API: read landing page content ---

app.get("/api/landing", requireAuth, (req, res) => {
  try {
    const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");
    res.json({ success: true, html });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- API: save landing page content ---

app.post("/api/landing", requireAuth, (req, res) => {
  try {
    const { html } = req.body;
    if (!html) {
      return res.status(400).json({ success: false, message: "HTML vazio" });
    }
    const backupDir = path.join(__dirname, "backups");
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    fs.copyFileSync(
      path.join(__dirname, "index.html"),
      path.join(backupDir, `index_${timestamp}.html`)
    );
    fs.writeFileSync(path.join(__dirname, "index.html"), html, "utf-8");
    res.json({ success: true, message: "Página salva com sucesso!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- API: structured content read/write ---

app.get("/api/content", requireAuth, (req, res) => {
  try {
    const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");
    const content = parseContent(html);
    res.json({ success: true, content });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/api/content", requireAuth, (req, res) => {
  try {
    const { section, field, value } = req.body;
    let html = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");

    const backupDir = path.join(__dirname, "backups");
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    fs.copyFileSync(
      path.join(__dirname, "index.html"),
      path.join(backupDir, `index_${timestamp}.html`)
    );

    html = updateContent(html, section, field, value);
    fs.writeFileSync(path.join(__dirname, "index.html"), html, "utf-8");
    res.json({ success: true, message: "Conteúdo atualizado!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- API: list backups ---

app.get("/api/backups", requireAuth, (req, res) => {
  try {
    const backupDir = path.join(__dirname, "backups");
    if (!fs.existsSync(backupDir)) {
      return res.json({ success: true, backups: [] });
    }
    const files = fs
      .readdirSync(backupDir)
      .filter((f) => f.endsWith(".html"))
      .sort()
      .reverse()
      .slice(0, 20);
    const backups = files.map((f) => ({
      name: f,
      size: fs.statSync(path.join(backupDir, f)).size,
      date: fs.statSync(path.join(backupDir, f)).mtime,
    }));
    res.json({ success: true, backups });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- API: restore backup ---

app.post("/api/backups/restore", requireAuth, (req, res) => {
  try {
    const { name } = req.body;
    const backupPath = path.join(__dirname, "backups", name);
    if (!fs.existsSync(backupPath)) {
      return res
        .status(404)
        .json({ success: false, message: "Backup não encontrado" });
    }
    const backupDir = path.join(__dirname, "backups");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    fs.copyFileSync(
      path.join(__dirname, "index.html"),
      path.join(backupDir, `index_pre-restore_${timestamp}.html`)
    );
    fs.copyFileSync(backupPath, path.join(__dirname, "index.html"));
    res.json({ success: true, message: "Backup restaurado com sucesso!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- API: upload client logo ---

app.post("/api/upload-logo", requireAuth, (req, res) => {
  try {
    const { filename, data } = req.body;
    if (!filename || !data) {
      return res.status(400).json({ success: false, message: "Dados faltando" });
    }
    const clientsDir = path.join(__dirname, "clients");
    if (!fs.existsSync(clientsDir)) fs.mkdirSync(clientsDir);

    const base64Data = data.replace(/^data:image\/\w+;base64,/, "");
    fs.writeFileSync(path.join(clientsDir, filename), base64Data, "base64");
    res.json({
      success: true,
      message: "Logo enviada!",
      path: `clients/${filename}`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- Content parsing helpers ---

function parseContent(html) {
  const content = {};

  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  content.pageTitle = titleMatch ? titleMatch[1] : "";

  const h1Match = html.match(
    /<section class="hero">[\s\S]*?<h1>([\s\S]*?)<\/h1>/
  );
  content.heroTitle = h1Match ? h1Match[1].trim() : "";

  const subtitleMatch = html.match(
    /<p class="subtitle">\s*([\s\S]*?)\s*<\/p>/
  );
  content.heroSubtitle = subtitleMatch ? subtitleMatch[1].trim() : "";

  const badgeMatch = html.match(
    /<div class="status-badge">\s*<span>([\s\S]*?)<\/span>/
  );
  content.statusBadge = badgeMatch ? badgeMatch[1].trim() : "";

  const footerMatch = html.match(
    /<p class="footer-text">([\s\S]*?)<\/p>/
  );
  content.footerText = footerMatch ? footerMatch[1].trim() : "";

  return content;
}

function updateContent(html, section, field, value) {
  switch (`${section}.${field}`) {
    case "hero.title":
      html = html.replace(
        /(<section class="hero">[\s\S]*?<h1>)([\s\S]*?)(<\/h1>)/,
        `$1${value}$3`
      );
      break;
    case "hero.subtitle":
      html = html.replace(
        /(<p class="subtitle">)\s*([\s\S]*?)\s*(<\/p>)/,
        `$1\n        ${value}\n      $3`
      );
      break;
    case "hero.badge":
      html = html.replace(
        /(<div class="status-badge">\s*<span>)([\s\S]*?)(<\/span>)/,
        `$1${value}$3`
      );
      break;
    case "page.title":
      html = html.replace(
        /(<title>)(.*?)(<\/title>)/,
        `$1${value}$3`
      );
      break;
    case "footer.text":
      html = html.replace(
        /(<p class="footer-text">)([\s\S]*?)(<\/p>)/,
        `$1${value}$3`
      );
      break;
  }
  return html;
}

// --- Static files (landing page) ---

app.use(express.static(__dirname, { index: "index.html" }));

app.listen(PORT, () => {
  console.log(`Yoobe server rodando em http://localhost:${PORT}`);
  console.log(`Admin/Editor: http://localhost:${PORT}/admin`);
  console.log(`Login: http://localhost:${PORT}/admin/login`);
});
