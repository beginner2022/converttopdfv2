/* =========================================================
   PDF Toolkit — site registry + nav/footer renderer
   ---------------------------------------------------------
   TO ADD A NEW TOOL OR PAGE LATER:
   just add one object to the SITE_PAGES array below.
   Every page that includes this script (via <div id="site-nav">
   and <div id="site-footer">) will pick it up automatically —
   no need to hand-edit nav HTML on every page again.
========================================================= */

const SITE_PAGES = [
  { id:"home",      label:"Home",                  href:"/index.html",                      group:"main" },
  { id:"photo",      label:"Photo Resize Tool",      href:"/tools/photo-resize-to-kb.html",   group:"tools" },
  { id:"signature",  label:"Signature Resize Tool",  href:"/tools/signature-resize.html",     group:"tools" },
  { id:"compress",   label:"PDF Compressor",         href:"/tools/pdf-compress.html",         group:"tools" },
  { id:"neet",       label:"NEET Photo Size",        href:"/neet-photo-size-2027.html",       group:"exam" },
  { id:"ssc",        label:"SSC Photo Size",         href:"/ssc-photo-size-2027.html",        group:"exam" },
  { id:"jee",        label:"JEE Photo Size",         href:"/jee-photo-size-2027.html",        group:"exam" }
  // Example of how a future tool gets added — just uncomment and fill in:
  // { id:"watermark-tool", label:"Watermark Tool", href:"/tools/watermark.html", group:"tools" },
];

function renderSiteNav(currentId){

  const nav = document.getElementById("site-nav");
  if(!nav) return;

  const groupLabel = { main:"", tools:"Tools", exam:"Exam photo size" };
  const groups = {};

  SITE_PAGES.forEach(p=>{
    groups[p.group] = groups[p.group] || [];
    groups[p.group].push(p);
  });

  let html = '<div class="site-nav-inner">';

  Object.keys(groups).forEach((g, gi)=>{
    if(gi > 0) html += '<span class="site-nav-sep">·</span>';
    html += '<span class="site-nav-group">';
    groups[g].forEach(p=>{
      const current = p.id === currentId ? ' aria-current="page"' : '';
      html += `<a href="${p.href}"${current}>${p.label}</a>`;
    });
    html += '</span>';
  });

  html += '</div>';
  nav.innerHTML = html;
  nav.className = "site-nav";
}

function renderSiteFooter(){

  const footer = document.getElementById("site-footer");
  if(!footer) return;

  let links = SITE_PAGES.map(p=>`<a href="${p.href}">${p.label}</a>`).join("");

  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-links">${links}</div>
    <p>PDF Toolkit — files are processed in your browser and are never uploaded to a server.</p>
  `;
}
