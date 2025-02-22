// Seleciona os elementos do DOM necessários
const pokemon_image = document.querySelector(".pokemon-image"); // Imagem do Pokémon
const form = document.getElementById("form"); // Formulário de busca
const pokemon_input = document.getElementById("input-pokemon"); // Campo de entrada para buscar Pokémon
const pokemon_name = document.getElementById("pokemon-name"); // Nome do Pokémon
const pokemon_number = document.getElementById("pokemon-number"); // Número do Pokémon na Pokédex
const btn_next = document.getElementById("btn-next"); // Botão para o próximo Pokémon
const btn_prev = document.getElementById("btn-prev"); // Botão para o Pokémon anterior

// Variável para armazenar o ID do Pokémon atual
let id_search = 0;

// Adiciona um evento de submit ao formulário
form.addEventListener("submit", show_pokemon);  

// Função assíncrona para buscar os dados do Pokémon na API
async function fetch_pokemon (pokemon) {
    try {
        // Faz a requisição à API do Pokémon
        const api_response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        
        // Se a resposta não for bem-sucedida, lança um erro
        if (!api_response.ok) {
            throw new Error("Pokemon not found");
        }

        // Converte a resposta em JSON
        const data = await api_response.json();
        return data;
    } catch (error) {

        console.log(error);
        id_search = 0;
        return null;
    }
}

// Função para exibir os dados do Pokémon na tela
function search_pokemon(data) {
    
    pokemon_name.textContent = data.name;
    pokemon_number.textContent = data.id;
    id_search = data.id;
    pokemon_image.style.display = "block";
    pokemon_image.src = data.sprites.front_default;
}

// Função para exibir uma mensagem de erro quando o Pokémon não for encontrado
function error_menssager() {
    pokemon_image.style.display = "none";
    pokemon_input.value = "";
    pokemon_number.textContent = "";
    pokemon_name.textContent = "Not found";
}

// Função assíncrona para exibir um Pokémon ao buscar no formulário
async function show_pokemon(event) {
    event.preventDefault(); // Evita que a página recarregue ao enviar o formulário

    // Busca os dados do Pokémon digitado
    const data = await fetch_pokemon(pokemon_input.value);

    // Se os dados forem encontrados, exibe na tela, caso contrário, mostra erro
    if (data) {
        search_pokemon(data);
        pokemon_input.value = "";
    } else {
        error_menssager();
    }
}

// Adiciona evento ao botão next
btn_next.addEventListener("click", next_pokemon);

// Função assíncrona para buscar e exibir o próximo Pokémon na Pokédex
async function next_pokemon(event) {
    event.preventDefault(); // Evita ação padrão do botão

    // Limita a busca para não ultrapassar o ID 1025 (limite de Pokémon)
    if (id_search == 1025) {
        return;
    }

    id_search++; // Incrementa o ID para buscar o próximo Pokémon
    const data = await fetch_pokemon(id_search);
    search_pokemon(data);
}

// Adiciona evento ao botão prev
btn_prev.addEventListener("click", prev_pokemon);

// Função assíncrona para buscar e exibir o Pokémon anterior na Pokédex
async function prev_pokemon(event) {
    event.preventDefault(); // Evita ação padrão do botão
    
    // Se já estiver no primeiro Pokémon, não faz nada
    if (id_search <= 1) {
        return;
    } 
    
    id_search--; // Decrementa o ID para buscar o Pokémon anterior
    const data = await fetch_pokemon(id_search);
    search_pokemon(data);
}
