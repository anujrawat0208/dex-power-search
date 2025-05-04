
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pokemon } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, "0")}`;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <div className="bg-muted p-4 flex justify-center">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
          alt={`${pokemon.name} sprite`}
          className="h-36 w-36 object-contain"
          loading="lazy"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold truncate">
            {capitalizeFirstLetter(pokemon.name)}
          </h3>
          <span className="text-sm font-mono text-muted-foreground">
            {formatPokemonId(pokemon.id)}
          </span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {pokemon.types.map((typeInfo, index) => (
            <span
              key={index}
              className={`type-badge type-${typeInfo.type.name}`}
            >
              {capitalizeFirstLetter(typeInfo.type.name)}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
