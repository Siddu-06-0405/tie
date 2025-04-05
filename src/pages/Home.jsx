const Home = () => {
  const images = [
    "/BS.webp",
    "/CIVIL.webp",
    "/ECE.webp",
    "/CSE-ISE.webp",
    "/MECH.webp",
    "/MATH.webp",
    "/EEE.webp",
  ];

  return (
    <div>
        <div className="flex justify-center text-3xl font-bold p-26 bg-[#f2f5f7] text-[#192a3d] text-nowrap">
            VTU Notes Categories
        </div>
        <br /><br />
        <br />
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 p-4 bg-white">
          {images.map((src, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={src}
                alt={`Image ${index + 1}`}
                loading="lazy"
                width={330}
                height="auto"
                className="shadow-md
                cursor-pointer"
              />
            </div>
          ))}
        </div>
        <br /><br />
    </div>
  );
};

export default Home;
