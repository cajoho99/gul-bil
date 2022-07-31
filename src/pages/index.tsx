import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const HomeContents = () => {
  const { data } = useSession();
  const createGameMutation = trpc.useMutation(["game.create"]);

  if (!data) {
    return <button onClick={() => signIn()}>Logga in</button>;
  }

  return (
    <>
      <div>Hej {data.user?.name}!</div>
      <button onClick={() => createGameMutation.mutate()}>Create Game</button>
      <button onClick={() => signOut()}>Logga ut</button>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gul Bil</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeContents />
    </>
  );
};

export default Home;