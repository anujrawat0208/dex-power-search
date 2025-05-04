
import React from "react";
import PokemonCard from "./PokemonCard";
import { Pokemon, PokemonTypeOption } from "@/types/pokemon";
import { Skeleton } from "@/components/ui/skeleton";

interface PokemonGridProps {
  pokemon: Pokemon[];
  isLoading: boolean;
  searchQuery: string;
  typeFilter: PokemonTypeOption;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemon,
  isLoading,
  searchQuery,
  typeFilter,
}) => {
  // Filter pokemon based on search query and type filter
  const filteredPokemon = React.useMemo(() => {
    return pokemon.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType =
        typeFilter === "all" ||
        p.types.some((t) => t.type.name === typeFilter);
      return matchesSearch && matchesType;
    });
  }, [pokemon, searchQuery, typeFilter]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex flex-col">
            <Skeleton className="h-36 w-full" />
            <div className="mt-2 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredPokemon.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-muted-foreground">
          No Pokémon found matching your search
        </h3>
        <p className="mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredPokemon.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonGrid;
