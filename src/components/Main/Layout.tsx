const Layout = ({ children }) => {
  return (
    <div className="py-12 px-4 sm:px-12 h-fit w-full flex justify-center items-center">
      <div className="md:w-[1200px] w-full   h-fit ">{children}</div>
    </div>
  );
};

export default Layout;
