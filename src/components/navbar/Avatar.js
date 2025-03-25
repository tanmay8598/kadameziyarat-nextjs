import React from "react";
import Image from "next/image";

const Avatar = () => {
  return (
    <img
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src="/avatar.png"
    />
  );
};

export default Avatar;
