import { PropsWithChildren, useState } from "react";

import { trpc } from "../utils/trpc";
import { getOptionsForVote } from "../utils/getRandomPokemon";
import { AppRouter } from "../backend/routers";

import type { inferRouterOutputs } from "@trpc/server";

const btn =
  "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

export default function Home() {
  const [pokemonIds, setPokemonIds] = useState(() => getOptionsForVote());
  const { firstId, secondId } = pokemonIds;
  const firstPokemon = trpc.getPokemonById.useQuery({
    id: firstId,
  });
  const secondPokemon = trpc.getPokemonById.useQuery({
    id: secondId,
  });

  const voteForRoundest = (selected: number) => {
    // todo: fire mutation to persist changes
    setPokemonIds(() => getOptionsForVote());
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="text-center text-2xl">Which pokémon is rounder?</div>
      <div className="p-2" />
      <div className="flex max-w-2xl items-center justify-between rounded border p-8">
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
            <>
              <PokemonListing
                pokemon={firstPokemon.data}
                vote={() => voteForRoundest(firstId)}
              />
              <div className="p-8">VS</div>
              <PokemonListing
                pokemon={secondPokemon.data}
                vote={() => voteForRoundest(secondId)}
              />
            </>
          )}
        <div className="p-2" />
      </div>
    </div>
  );
}

type PokemonFromServer = inferRouterOutputs<AppRouter>["getPokemonById"];

const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = ({ pokemon, vote }) => {
  return (
    <div className="flex  flex-col items-center">
      <img
        src={pokemon.sprites.front_default ?? ""}
        alt="First Pokemon"
        className="h-64 w-64"
      />
      <div className="-mt-8 text-center text-xl capitalize">{pokemon.name}</div>
      <button className={btn} onClick={vote}>
        Rounder
      </button>
    </div>
  );
};
