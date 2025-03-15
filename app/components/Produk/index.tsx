import "./style.css";

const Produk = () => {
  const dataProduk = [
    {
      id: 1,
      image: "/img/r1.jpg",
      title: "Produk A",
      price: "Rp 100.000",
      store: "Toko Alpha",
    },
    {
      id: 2,
      image: "/img/r1.jpg",
      title: "Produk B",
      price: "Rp 150.000",
      store: "Toko Beta",
    },
    {
      id: 3,
      image: "/img/r1.jpg",
      title: "Produk C",
      price: "Rp 200.000",
      store: "Toko Gamma",
    },
    {
      id: 4,
      image: "/img/r1.jpg",
      title: "Produk D",
      price: "Rp 250.000",
      store: "Toko Delta",
    },
    {
      id: 5,
      image: "/img/r1.jpg",
      title: "Produk E",
      price: "Rp 300.000",
      store: "Toko Epsilon",
    },
    {
      id: 6,
      image: "/img/r1.jpg",
      title: "Produk F",
      price: "Rp 350.000",
      store: "Toko Zeta",
    },
  ];

  return (
    <>
      <div className="produk w-335 h-80 mt-5 mx-auto">
        <div className="bg-white w-full h-10">
          <h1 className="text-xl font-bold mt-2 ml-5">Rekomendasi : </h1>
        </div>
        <div className="bg-white w-full h-68 mt-2 gap-5 justify-center flex grid grid-cols-6">
          {dataProduk.map((produk) => (
            <div
              className="rekomendasi-box w-45 w-1/6 bg-white mx-auto rounded-xl"
              key={produk.id}
            >
              <img
                src={produk.image}
                alt={produk.title}
                className="w-full h-42 object-cover rounded-t-xl"
              />
              <div className="p-2">
                <h2 className="text-center text-sm font-semibold">
                  {produk.title}
                </h2>
                <p className="text-center text-red-500 text-sm font-bold">
                  {produk.price}
                </p>
                <p className="text-center text-gray-500 text-xs">
                  {produk.store}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Produk;
