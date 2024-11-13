import Loading from "@/assets/loading.gif";

const Loader = () => {
  return (
    <div className="loader">
      Loading...
      <img alt="Loading gif" src={Loading} />
    </div>
  );
};

export default Loader;
