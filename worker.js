export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Exemplo: /video/video1.mp4
    if (pathname.startsWith('/video/')) {
      const filename = pathname.split('/video/')[1];

      // Buscar o db.json
      const res = await fetch("https://raw.githubusercontent.com/ravedante/cdnbrasil/main/db.json");
      const db = await res.json();

      const file_id = db[filename];
      if (!file_id) {
        return new Response("Vídeo não encontrado", { status: 404 });
      }

      // Redireciona para o link real do Telegram com player embutido
      const final_url = `https://api.telegram.org/bot7884145285:AAGCJVcrUONcvbGR1dAL4_vM-_VPEI9Hzjg/sendVideo?video=${file_id}`;

      return Response.redirect(final_url, 302);
    }

    // Padrão
    return new Response("Use o caminho /video/nome.mp4", { status: 200 });
  }
};
