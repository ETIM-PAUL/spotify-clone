import React, { useEffect, useRef } from "react";
import { useSpotify } from "../../context/SpotifyContext";
import { colors } from "../../utils/globalConstants";

const Category = ({ ...props }) => {
  const { dispatch } = useSpotify();
  const categoryRef = useRef();
  const { id, name } = props;
  const showCategoryItems = () => {
    props.setShowCategory(true);
    const selectedCategory = {
      id: id,
      name: name,
    };
    dispatch({ type: "setCategory", payload: selectedCategory });
  };
  useEffect(() => {
    if (categoryRef.current === undefined) {
      return;
    }

    for (let index = 0; index < colors.length; index++) {
      categoryRef.current.style.backgroundColor = colors[props.index];
    }
  }, [props.index]);

  return (
    <div
      className="rounded-[10px] bg-[blue] overflow-hidden grid gap-8 category flex-1 hover:cursor-pointer"
      ref={categoryRef}
      onClick={() => showCategoryItems()}
    >
      <div className="pt-1 h-[60px] flex">
        <span className=" font-sans text-[25px] font-bold category__title">
          {props.name}
        </span>
      </div>
      <div className=" flex justify-end justify-items-end">
        <img
          src={props.icons[0].url}
          alt="category"
          width={props.iconWidth}
          height={100}
          className="rounded-lg transform"
        />
      </div>
    </div>
  );
};

export default Category;
