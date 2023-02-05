import Head from "next/head";
import { Inter } from "@next/font/google";
import Layout from "@/Layout";
import Hero from "@/components/Hero";
import Service from "@/components/Service";
// import Usage from "@/components/Usage"
import Contact from "@/components/Contact";
import { Usage } from "@/components/Usage/Usage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <>
          <Hero />
          {/* <Service /> */}

          <Usage />
          <Contact />
        </>
      </Layout>
    </>
  );
}
