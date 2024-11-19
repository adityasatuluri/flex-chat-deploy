import Lottie from "react-lottie";
import Diamond from "@/assets/Diamond-GIF.gif";
import Background from "@/assets/flogo-short.svg";
import { animationDefaultOptions } from "@/lib/utils";

function EmptyChatContainer() {
  return (
    <>
      <div className="flex-1 md:bg-[#121312] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
        <img src={Diamond} style={{ height: "200px" }} />
        {/*<Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOptions}
      />*/}
        <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
          <h3 className="poppins-medium">
            Hi <span className="text-[#00BB00]">!</span> Welcome to
            <span className="text-[#00BB00]"> FlexChat</span> Chat App{" "}
            <span className="text-[#00BB00]">.</span>
          </h3>
        </div>
      </div>
      {/*<div className="flex w-full h-100 bg-[#121312]">
        <div
          className="flex-1 md:bg-[#121312] z-1000 md:flex flex-col justify-center items-center hidden duration-1000 transition-all"
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: "800px",
            opacity: "50%",
          }}
        ></div>
      </div> */}
    </>
  );
}

export default EmptyChatContainer;
