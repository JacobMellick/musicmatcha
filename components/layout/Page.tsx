import Head from "next/head";
import { DEFAULT_TITLE } from "@/lib/constants";

type HeadProps = {
  title?: string;
};

const PageHead = ({ title: defaultTitle }: HeadProps) => {
  const title = DEFAULT_TITLE;

  return (
    <Head>
      <title key="title">{title}</title>
      <meta
        key="og:title"
        name="og:title"
        property="og:title"
        content={title}
      />
    </Head>
  );
};

type Props = {
  title?: string;
  children: React.ReactNode;
};

const Page = ({ title, children }: Props): JSX.Element => {
  return (
    <>
      <PageHead title={title} />
      <main className="relative">
        <div>{children}</div>
      </main>
    </>
  );
};

export default Page;
