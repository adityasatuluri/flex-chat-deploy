import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { GET_ALL_MESSAGES_ROUTES, HOST } from "@/utils/constants";
import moment from "moment";
import { useEffect, useRef } from "react";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

const MessageContainer = () => {
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    selectedChatMessages,
    setSelectedChatMessages,
    setIsDownloading,
    setFileDownloadProgress,
  } = useAppStore();

  const [showImage, setShowImage] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_ALL_MESSAGES_ROUTES,
          { id: selectedChatData._id },
          { withCredentials: true }
        );
        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (selectedChatData._id) {
      if (selectedChatType === "contact") {
        getMessages();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|hic|heif)$/i;
    return imageRegex.test(filePath);
  };

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      // Changed 'messages' to 'message'
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-grey-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const downloadFile = async (url) => {
    setIsDownloading(true);
    setFileDownloadProgress(0);
    const response = await apiClient.get(`${HOST}${url}`, {
      responseType: "blob",
      onDownloadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        const percentCompleted = Math.round((loaded * 100) / total);
        setFileDownloadProgress(percentCompleted);
      },
    });
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
    setIsDownloading(false);
  };

  const renderDMMessages = (message) => {
    return (
      <div
        className={`${
          message.sender === selectedChatData._id
            ? "text-left rounded-tl-lg rounded-tr-lg rounded-bl-lg"
            : "text-right "
        } `}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#2a2b33/5] text-white/80 border-[#8417ff/50] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                : "bg-[#00ff04] bg-opacity-10 text-[#2a2b33/90] border-[#ffffff/20] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {message.content}
          </div>
        )}

        {message.messageType === "file" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#2a2b33/5] text-white/80 border-[#8417ff/50] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                : "bg-[#00ff04] bg-opacity-10 text-[#2a2b33/90] border-[#ffffff/20] rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {checkIfImage(message.fileUrl) ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowImage(true);
                  setImageURL(message.fileUrl);
                }}
              >
                <img
                  src={`${HOST}${message.fileUrl}`}
                  height={200}
                  width={300}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4 mx-10">
                <span className="text-white/8 text-3xl bg-black/20 rounded-full p-3">
                  <MdFolderZip />
                </span>
                <span>{message.fileUrl.split("/").pop()}</span>
                <span
                  className="cursor-pointer bg-black/20 p-3 text-2xl rounded-full hover:bg-[#111111] transition-all duration-300"
                  onClick={() => downloadFile(message.fileUrl)}
                >
                  <IoMdArrowRoundDown />
                </span>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-grey-600">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
      {showImage && (
        <div className="fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg flex-col">
          <div>
            <img
              src={`${HOST}${imageURL}`}
              className="h-[80vh] w-full bg-cover"
            />
            <div className="flex gap-5 fixed top-0 mt-5">
              <button
                className="cursor-pointer bg-black/20 p-3 text-2xl rounded-full hover:bg-[#111111] transition-all duration-300"
                onClick={() => downloadFile(imageURL)}
              >
                <IoMdArrowRoundDown />
              </button>
              <button
                className="cursor-pointer bg-black/20 p-3 text-2xl rounded-full hover:bg-[#111111] transition-all duration-300"
                onClick={() => {
                  setShowImage(false);
                  setImageURL(null);
                }}
              >
                <IoCloseSharp />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
