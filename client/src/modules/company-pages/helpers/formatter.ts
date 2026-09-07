export const pageHtml = function (html: string, css: string) {
  return `
<!doctype html>
<html>
  <head>
    <style>${css}</style>
  </head>
  <body>${html}</body>
</html>`;
}

export const resolvePageMarkup = function (editor: any, page: any) {
  editor.Pages.select(page);
  const root = editor.getWrapper();
  const html = root.toHTML();
  const css = editor.getCss()
  return {
    page: page.getName?.() ?? page.get('name'),
    html: pageHtml(html, css),
    // css: css,
    // complete: pageHtml(html, css)
  };
}