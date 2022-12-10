import Head from "next/head";

import { Registration } from "../components/registration";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hackathon 2022</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-white py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 className="text-4xl font-bold sm:text-center sm:text-6xl">
              {"{"}. 2022 .{"}"}
            </h1>

            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>

            <Registration />
          </div>
        </div>
      </main>
    </div>
  );
}
