import React from "react";
import Struct from "../../../components/frontend/Struct/Struct";
import Carousal from "../../../components/frontend/BannerCarousal/Carousal";
import img1 from "../../../assets/imgs/banner.jpg";

function Home() {
  const banners = [
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/3d1164a45e52e42e.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/830b0b3bff28e292.jpg?q=20",
    img1,
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/830b0b3bff28e292.jpg?q=20",
  ];
  return (
    <Struct>
      <div className="">
        <Carousal banners={banners} />
      </div>
    </Struct>
  );
}

export default Home;
