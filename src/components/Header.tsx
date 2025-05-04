
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto py-4 px-4 flex justify-center items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Pokédex Power Search</h1>
      </div>
    </header>
  );
};

export default Header;
