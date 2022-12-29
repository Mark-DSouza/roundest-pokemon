// export default function Home() {
//   return (
//     <div className="flex h-screen w-screen flex-col items-center justify-center">
//       <div className="text-center text-2xl">Which pokémon is rounder?</div>
//       <div className="p-2" />
//       <div className="flex max-w-2xl items-center justify-between rounded border p-8">
//         <div className="h-16 w-16 bg-pink-400"></div>
//         <div className="p-8">VS</div>
//         <div className="h-16 w-16 bg-emerald-300"></div>
//       </div>
//     </div>
//   );
// }

import { trpc } from "../utils/trpc";

export default function IndexPage() {
  const hello = trpc.hello.useQuery({ text: "Mark" });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  );
}
