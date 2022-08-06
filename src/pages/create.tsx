import { useState } from "react";
import { trpc } from "../utils/trpc";

const CreateGame = () => {
  const [email, setEmail] = useState("");
  const createGameMutation = trpc.useMutation(["game.create"]);

  return (
    <div>
      <input
        type="email"
        name="invite"
        id="invite"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          console.log(email);
        }}
        className="border"
      />
      <button
        onClick={() => {
          createGameMutation.mutate({ email });
          console.log(email);
        }}
      >
        Create Game
      </button>
    </div>
  );
};

export default CreateGame;
