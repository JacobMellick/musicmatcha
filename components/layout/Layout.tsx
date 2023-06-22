const Layout: React.ComponentType<React.PropsWithChildren<unknown>> = ({
  children,
}) => (
  <div className="flex min-h-screen flex-col bg-white">
    <div className="z-0 flex grow flex-col">{children}</div>
  </div>
);

export default Layout;
