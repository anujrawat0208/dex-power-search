
import { useQuery } from "@tanstack/react-query";
import { Pokemon, PokemonListResponse } from "@/types/pokemon";

const POKEMON_API_URL = "https://pokeapi.co/api/v2";

async function fetchPokemonList(limit: number = 150): Promise<PokemonListResponse> {
  const response = await fetch(`${POKEMON_API_URL}/pokemon?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }
  return response.json();
}

async function fetchPokemonDetails(url: string): Promise<Pokemon> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon details from ${url}`);
  }
  return response.json();
}

export function usePokemon() {
  const { data: pokemonList, isLoading: isListLoading, error: listError } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: () => fetchPokemonList(),
  });

  const { data: pokemonDetails, isLoading: isDetailsLoading, error: detailsError } = useQuery({
    queryKey: ["pokemonDetails", pokemonList],
    queryFn: async () => {
      if (!pokemonList) return [];
      
      const detailsPromises = pokemonList.results.map((pokemon) => 
        fetchPokemonDetails(pokemon.url)
      );
      
      return Promise.all(detailsPromises);
    },
    enabled: !!pokemonList,
  });

  return {
    pokemonList,
    pokemonDetails,
    isLoading: isListLoading || isDetailsLoading,
    error: listError || detailsError,
  };
}
