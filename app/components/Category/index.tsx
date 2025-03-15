import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import "./style.css";

const Category = () => {
  return (
    <>
      <div className="category w-335 h-80 bg-gradient-to-b from-blue-500 to-blue-200 rounded-xl mt-5 mx-auto justify-center flex">
        <h1 className="font-bold text-2xl text-white">Ini Category</h1>
      </div>
    </>
  );
};

export default Category;
