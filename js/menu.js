// Seleciona o botão que abre o menu através do seletor de ID "#open-menu"
const openMenu = document.querySelector("#open-menu");
// Seleciona o botão que fecha o menu através do seletor de ID "#close-menu"
const closeMenu = document.querySelector("#close-menu");
// Seleciona o elemento <aside> (geralmente usado para menus laterais ou seções complementares)
const aside = document.querySelector("aside");
// Adiciona um ouvinte de evento ao botão "openMenu" para capturar o clique
openMenu.addEventListener("click", () => {
// Quando o botão "openMenu" é clicado, adiciona a classe "aside-visible" ao elemento <aside>
// Essa classe pode ser usada para exibir o menu lateral (por exemplo, aplicando estilos CSS)
    aside.classList.add("aside-visible");
})
// Adiciona um ouvinte de evento ao botão "closeMenu" para capturar o clique
closeMenu.addEventListener("click", () => {
// Quando o botão "closeMenu" é clicado, remove a classe "aside-visible" do elemento <aside>
// Isso pode ser usado para esconder o menu lateral
    aside.classList.remove("aside-visible");
})