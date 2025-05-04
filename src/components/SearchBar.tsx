
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { PokemonTypeOption } from "@/types/pokemon";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  typeFilter: PokemonTypeOption;
  setTypeFilter: (type: PokemonTypeOption) => void;
}

const typeOptions: { value: PokemonTypeOption; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "normal", label: "Normal" },
  { value: "fire", label: "Fire" },
  { value: "water", label: "Water" },
  { value: "electric", label: "Electric" },
  { value: "grass", label: "Grass" },
  { value: "ice", label: "Ice" },
  { value: "fighting", label: "Fighting" },
  { value: "poison", label: "Poison" },
  { value: "ground", label: "Ground" },
  { value: "flying", label: "Flying" },
  { value: "psychic", label: "Psychic" },
  { value: "bug", label: "Bug" },
  { value: "rock", label: "Rock" },
  { value: "ghost", label: "Ghost" },
  { value: "dragon", label: "Dragon" },
  { value: "dark", label: "Dark" },
  { value: "steel", label: "Steel" },
  { value: "fairy", label: "Fairy" },
];

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl mx-auto mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search Pokémon by name..."
          className="pl-9 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Select 
        value={typeFilter} 
        onValueChange={(value) => setTypeFilter(value as PokemonTypeOption)}
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          {typeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBar;
