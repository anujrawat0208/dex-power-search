
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePokemon } from "@/hooks/usePokemon";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import PokemonGrid from "@/components/PokemonGrid";
import { PokemonTypeOption } from "@/types/pokemon";

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<PokemonTypeOption>("all");
  const { pokemonDetails, isLoading, error } = usePokemon();
  const { toast } = useToast();

  React.useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load Pokémon data. Please try again later.",
        variant: "destructive",
      });
      console.error(error);
    }
  }, [error, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Search for Pokémon
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Explore the original 150 Pokémon from the Kanto region
          </p>

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />

          <PokemonGrid
            pokemon={pokemonDetails || []}
            isLoading={isLoading}
            searchQuery={searchQuery}
            typeFilter={typeFilter}
          />
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Data provided by <a href="https://pokeapi.co/" className="underline hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">PokéAPI</a></p>
      </footer>
    </div>
  );
};

export default Index;
