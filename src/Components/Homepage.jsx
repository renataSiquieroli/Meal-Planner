import { useState, useEffect } from "react";
import Hero from "./Hero";
import Spinner from "./Spinner";
import BannerImg from "./BannerImg";

function Homepage() {
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isloading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, []);
  return (
    <>
      {" "}
      {isloading ? (
        <div id="cover-spin">
          <Spinner />
        </div>
      ) : (
        <div>
          <Hero />
          <BannerImg />
          {/* <SearchPage /> */}
        </div>
      )}
    </>
  );
}

export default Homepage;
