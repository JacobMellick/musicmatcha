import Header from "@/components/layout/Header";

const Layout: React.ComponentType<React.PropsWithChildren<unknown>> = ({
  children,
}) => (
  <div className="flex min-h-screen flex-col bg-white">
    <Header />
    <div className="z-0 flex grow flex-col py-6">
      <div className="z-0 flex grow flex-col">{children}</div>
    </div>
  </div>
);

export default Layout;
