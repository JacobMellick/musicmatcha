const Layout: React.ComponentType<React.PropsWithChildren<unknown>> = ({
  children,
}) => (
  <div className="flex min-h-screen flex-col">
    <div className="z-0 flex flex-col">{children}</div>
  </div>
);

export default Layout;
