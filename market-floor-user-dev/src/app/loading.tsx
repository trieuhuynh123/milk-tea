const Loading = () => {
  return (
    <div className="mx-auto max-w-[1200px] px-20 py-10">
      <div className="bg-secondary-200 animate-pulse w-1/2 h-[60px] mb-8"></div>
      <div className="w-full  grid grid-cols-4 gap-4">
        {Array(16)
          .fill(1)
          ?.map((item, index) => (
            <div
              key={`lodaing-${index}`}
              className="bg-secondary-600 animate-pulse w-full h-[360px]"
            ></div>
          ))}
      </div>
    </div>
  );
};

export default Loading;
