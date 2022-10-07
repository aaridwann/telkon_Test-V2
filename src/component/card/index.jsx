import Image from "next/image";
import React from "react";

function CardComponent({ name, avatar }) {
  return (
    <div className=" cursor-pointer shadow-xl min-w-[200px] relative h-52 flex items-center justify-center  rounded-2xl  overflow-hidden bg-gray-100">
      <Image layout='fill' width={400} height={400} className=" h-full flex items-center justify-center " src={avatar} />
      <div className="absolute bg-black/0 duration-300  hover:bg-black/50 w-full h-full flex items-center justify-center ">
        <p className=" ">{name.toUpperCase()}</p>
      </div>
    </div>
  );
}

export default CardComponent;
