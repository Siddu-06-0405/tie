import { Link } from "react-router-dom";

const Home = () => {
  const branches = [
    { src: "/BS.webp", slug: "bs" },
    { src: "/CIVIL.webp", slug: "civil" },
    { src: "/ECE.webp", slug: "ece" },
    { src: "/CSE-ISE.webp", slug: "cse-and-ise" },
    { src: "/MECH.webp", slug: "mech" },
    { src: "/MATH.webp", slug: "math" },
    { src: "/EEE.webp", slug: "eee" },
  ];

  return (
    <div>
      <div className="flex justify-center text-3xl font-bold p-26 bg-[#f2f5f7] text-[#192a3d] text-nowrap">
        VTU Notes Categories
      </div>
      <br /><br />
      <br />
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 p-4 bg-white">
        {branches.map((branch, index) => (
          <div key={index} className="flex justify-center">
            <Link to={`/branch/${branch.slug}`}>
              <img
                src={branch.src}
                alt={`Branch ${branch.slug}`}
                loading="lazy"
                width={330}
                height="auto"
                className="shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        ))}
      </div>
      <br /><br />
    </div>
  );
};

export default Home;
