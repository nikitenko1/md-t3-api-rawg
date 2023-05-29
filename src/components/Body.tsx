interface IProps {
  children: React.ReactNode;
}

const Body = ({ children }: IProps) => {
  return (
    <div className="xs:pl-24 min-h-screen overflow-x-hidden py-4 pb-14 pl-20 pr-1 sm:pl-44 sm:pr-4 md:pl-60">
      {children}
    </div>
  );
};

export default Body;
