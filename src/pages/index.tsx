import { getOptionsForVote } from "../utils/getRandomPokemon";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { trpc } from "../utils/trpc";

export default function Home({
  firstId,
  secondId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const firstPokemon = trpc.getPokemonById.useQuery({ id: firstId });
  const secondPokemon = trpc.getPokemonById.useQuery({ id: secondId });

  if (!firstPokemon.data || !secondPokemon.data) return null;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="text-center text-2xl">Which pokémon is rounder?</div>
      <div className="p-2" />
      <div className="flex max-w-2xl items-center justify-between rounded border p-8">
        <div className="flex h-64 w-64 flex-col">
          <img
            src={firstPokemon.data.pokemon.sprites.front_default ?? ""}
            alt="First Pokemon"
            className="w-full"
          />
          <div className="-mt-8 text-center text-xl capitalize">
            {firstPokemon.data.pokemon.name}
          </div>
        </div>
        <div className="p-8">VS</div>
        <div className="flex h-64 w-64 flex-col">
          <img
            src={secondPokemon.data.pokemon.sprites.front_default ?? ""}
            alt="First Pokemon"
            className="w-full"
          />
          <div className="mt-[-2rem] text-center text-xl capitalize">
            {secondPokemon.data.pokemon.name}
          </div>
        </div>
        <div className="p-2" />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  firstId: number;
  secondId: number;
}> = async () => {
  const { firstId, secondId } = getOptionsForVote();
  return {
    props: {
      firstId,
      secondId,
    }, // will be passed to the page component as props
  };
};
