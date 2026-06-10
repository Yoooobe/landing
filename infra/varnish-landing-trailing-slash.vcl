# Snippet VCL — redirect exact /landing → /landing/ (301)
# Incluir no vcl_recv do Varnish ANTES do pass à origem GitHub Pages.
# Respostas de produção mostram via: varnish + server: GitHub.com

sub vcl_recv {
    if (req.http.host == "plataforma.4unik.com.br" && req.url == "/landing") {
        return (synth(301, "Redirect"));
    }
}

sub vcl_synth {
    if (resp.status == 301 && resp.reason == "Redirect") {
        set resp.http.Location = "https://plataforma.4unik.com.br/landing/";
        set resp.status = 301;
        return (deliver);
    }
}
