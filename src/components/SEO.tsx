import Head from "next/head";

export function SEO() {
  const meta = {
    title: "PKPM",
    description: "Ticketing system",
    image: ".",
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
