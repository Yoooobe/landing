# 🎨 Como Substituir a Logo na Landing Page

## 📋 Opção 1: Logo em formato SVG (Recomendado)

Se você tem a logo em formato SVG, substitua o código SVG dentro do arquivo `index.html`:

### Localização no código:
Procure por esta seção (linha ~140-155):

```html
<svg
  class="logo-symbol"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <!-- Código SVG atual aqui -->
</svg>
```

### Como fazer:
1. Abra sua logo SVG em um editor de texto
2. Copie todo o conteúdo do SVG
3. Cole no lugar do SVG atual no `index.html`
4. Ajuste o `viewBox` se necessário para manter as proporções

---

## 📋 Opção 2: Logo em formato PNG/JPG

Se você tem a logo em formato de imagem (PNG, JPG), siga estes passos:

### 1. Fazer upload da imagem para o bucket:

```bash
gsutil cp logo.png gs://yoobe.co/
```

### 2. Tornar a imagem pública:

```bash
gsutil acl ch -u AllUsers:R gs://yoobe.co/logo.png
```

### 3. Substituir o SVG por uma tag `<img>`:

No arquivo `index.html`, substitua o SVG por:

```html
<div class="logo-circle">
  <img 
    src="https://storage.googleapis.com/yoobe.co/logo.png" 
    alt="Yoobe Logo" 
    style="width: 28px; height: 28px; object-fit: contain;"
  />
</div>
```

**OU** se preferir usar a URL do Load Balancer:

```html
<div class="logo-circle">
  <img 
    src="https://yoobe.co/logo.png" 
    alt="Yoobe Logo" 
    style="width: 28px; height: 28px; object-fit: contain;"
  />
</div>
```

---

## 📋 Opção 3: Logo via URL Externa

Se a logo está hospedada em outro lugar, use diretamente a URL:

```html
<div class="logo-circle">
  <img 
    src="https://exemplo.com/logo.png" 
    alt="Yoobe Logo" 
    style="width: 28px; height: 28px; object-fit: contain;"
  />
</div>
```

---

## 🎨 Ajustes de Estilo (Opcional)

Se precisar ajustar o tamanho ou estilo da logo, modifique o CSS:

```css
.logo-circle {
  width: 48px;  /* Ajuste a largura */
  height: 48px; /* Ajuste a altura */
  border-radius: 12px; /* Ajuste o arredondamento */
  background: var(--primary); /* Ou remova para logo com fundo transparente */
}

.logo-symbol,
.logo-circle img {
  width: 28px;  /* Ajuste o tamanho da logo */
  height: 28px;
}
```

---

## 📝 Depois de Substituir

1. **Teste localmente:** Abra o `index.html` no navegador para ver como ficou
2. **Commit e push:**
   ```bash
   git add index.html
   git commit -m "Atualiza logo da landing page"
   git push origin main
   ```
3. **Aguarde o deploy automático** (via GitHub Actions)
4. **Invalide o cache do CDN** se necessário:
   - Load Balancer → Cache invalidation → `/*`

---

## ✅ Checklist

- [ ] Logo substituída no código
- [ ] Tamanho ajustado corretamente
- [ ] Testado localmente
- [ ] Commit e push realizados
- [ ] Cache do CDN invalidado (se necessário)
- [ ] Testado no site em produção

---

**Nota:** Se você enviar a logo, posso fazer a substituição automaticamente para você!
