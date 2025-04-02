import React from "react";

interface IMainLayoutProps {}

const MainLayout: React.FC<IMainLayoutProps> = (props) => {
  return <div>{(props as any)?.children}</div>;
};

export default MainLayout;
