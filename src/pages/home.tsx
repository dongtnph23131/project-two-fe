import TheHeader from "@/components/layout/header";
import MyChat from "@/components/my-chat";
import SingleChat from "@/components/single-chat";
import { useState } from "react";

const HomePage = () => {
  const [fetchAgain, setFetchAgain] = useState<any>(false);
  return (
    <main className="flex h-full flex-col items-center justify-center p-4 md:px-12 py-16 gap-4">
      <TheHeader />
      <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
        <MyChat fetchAgain={fetchAgain} />
        <SingleChat setFetchAgain={setFetchAgain} fetchAgain={fetchAgain} />
      </div>
    </main>
  );
};

export default HomePage;
