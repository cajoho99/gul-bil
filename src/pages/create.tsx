import { useState } from "react";
import { trpc } from "../utils/trpc";

const CreateGame = () => {
  const [email, setEmail] = useState("");
  const createGameMutation = trpc.useMutation(["game.create"]);

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <input
        type="email"
        name="invite"
        id="invite"
        value={email}
        placeholder="enter email"
        onChange={(e) => {
          setEmail(e.target.value);
          console.log(email);
        }}
        className="border text-black w-11/12 p-3 rounded md:w-2/3 lg:w-1/2"
      />
      <div className="h-5" />
      <button
        className="bg-neutral-700 px-4 py-2 rounded"
        onClick={() => {
          createGameMutation.mutate({ email });
        }}
      >
        Create Game
      </button>
    </div>
  );
};

export default CreateGame;
