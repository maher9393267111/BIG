import { FaRegComment } from "react-icons/fa";
import { BsHeart } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { Popover } from "antd";
import {FaHeart} from 'react-icons/fa';
const FunctionButtons = ({  likedPost,hasLiked }) => {
  return (
    <div>
      <div>
        {/* --flex icons---- */}

        <div className=" flex justify-between w-[77%] mx-auto">
          <div>
            <p className="transition-all duration-500   hover:bg-[#CDF0EA] rounded-full text-center">
              <div className="w-12 h-12 hover:text-[#3AB4F2] ">
                <FaRegComment className="fill-current   transition-all duration-500 hover: text-3xl relative top-2 left-2" />
              </div>
            </p>
          </div>

          <div>
            <p className="transition-all duration-500   hover:bg-[#FEE3EC] rounded-full text-center">
              <div className="w-12 h-12 hover:text-[#FF869E] ">
                {!hasLiked ? 
                ( 
                <BsHeart
                  onClick={likedPost}
                  className="fill-current   transition-all duration-500 hover: text-3xl relative top-2 left-2 font-bold"
                />
  ) : (

    <div>
         <FaHeart
                  onClick={likedPost}
                  className="fill-current   transition-all duration-500 hover: text-3xl relative top-2 left-2 font-bold"
                />

    </div>
  )}
              </div>
            </p>
          </div>

          <div>
            <p className="transition-all duration-500   hover:bg-[#CDF0EA] rounded-full text-center">
              <div className="w-12 h-12 hover:text-green-400 relative  ">
                <AiOutlineRetweet className="fill-current   transition-all duration-500 hover: text-3xl relative top-2 left-2" />
              </div>
            </p>
          </div>
        </div>
      </div>
      <hr className="mt-2" />
    </div>
  );
};

export default FunctionButtons;
