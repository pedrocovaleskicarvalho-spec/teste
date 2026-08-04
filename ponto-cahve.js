/*
  transicao.js
  Inclua este arquivo em TODAS as páginas que participam da troca
  (login.html e cadastro.html), logo antes do </body>:
 
  <script src="transicao.js"></script>
 
  E troque os onclick dos botões de:
    onclick="window.location='login.html'"
  para:
    onclick="irPara('login.html')"
 
  Também é necessário adicionar o CSS do arquivo transicao.css
  (ou colar o bloco equivalente no seu cadastro.css / login.css).
*/
 
// Fade-in ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('pagina-visivel');
});
 
// Fade-out antes de navegar para a próxima página
function irPara(destino) {
  document.body.classList.add('pagina-saindo');
  document.body.classList.remove('pagina-visivel');
 
  // espera a transição CSS terminar antes de trocar de página
  setTimeout(() => {
    window.location = destino;
  }, 250); // deve bater com o "transition" do CSS
}
 