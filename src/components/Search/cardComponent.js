import React from "react";
import { ImPlay3 } from "react-icons/im";

const CardComponent = ({ ...props }) => {
  const roundedImages = "rounded-[50%] w-40 h-40 bg-cover group-shadow-2xl";
  const squareImages = " w-40 h-40 bg-cover group-shadow-2xl";
  return (
    <div className="group isolate flex-1 hover:bg-[#222222] hover:cursor-pointer rounded-[10px] bg-[#181818] flex justify-center">
      <div className="block  px-4">
        <div className="mt-4 mb-3 object-fill">
          <div
            className={props.type === "artist" ? roundedImages : squareImages}
            style={{
              backgroundImage: `url(${props.image[0]?.url})`,
            }}
          >
            {props.type === "shows" || props.type === "episodes" ? null : (
              <div className="w-[45px] h-[45px] rounded-[50%] bg-[#1ad760] hidden  absolute bottom-32 ml-[6.5rem] group-hover:flex  items-center justify-center hover:w-[47px] hover:h-[47px] ">
                <ImPlay3 className="text-black text-[25px] ml-[4px] " />
              </div>
            )}
          </div>
        </div>

        <div className="mb-8 font-sans font-bold grid gap-2">
          <p className="text-white truncate">{props.name}</p>
          <p className="text-[gray] text-[13px] capitalize font-medium font-sans">
            {props.type}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
