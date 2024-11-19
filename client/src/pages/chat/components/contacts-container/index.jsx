import { bgThemes } from "@/lib/utils";
import ProfileInfo from "./components/profile-info";
import NewDM from "./components/profile-info/new-dm";
import { useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACTS_ROUTES } from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactList from "@/components/contact-list";

const ContactsContainer = () => {
  const { setDirectMessagesContacts, directMessagesContacts } = useAppStore();

  useEffect(() => {
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES, {
        withCredentials: true,
      });
      if (response.data.contacts) {
        //console.log(response.data.contacts);
        setDirectMessagesContacts(response.data.contacts);
      }
    };
    getContacts();
  }, []);

  return (
    <div
      className={`relative md:w-[35vw] lg:w-[30vw] xl:w-[20x] ${bgThemes[1]} border-r-2 border-[#2f303b] w-full`}
    >
      <div className="pt-3">
        <Logo />
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Direct Messages" />
          <NewDM />
        </div>
      </div>

      <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
        <ContactList contacts={directMessagesContacts} />
      </div>

      {/* <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="Channels" />
        </div>
      </div> */}
      <ProfileInfo />
    </div>
  );
};

const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center">
      <svg
        id="logo-38"
        width="78"
        height="32"
        viewBox="0 0 181 164"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 128V38.375V0L32 32V39V48V80V128H0ZM16 0H144V16L128 32H48L16 0ZM69 132L37 164H181V148L165 132H69ZM37 92V148L69 116V84L85 68H165L181 52V36H69L37 68V92Z"
          fill="#18D618"
        />
      </svg>
      <svg
        width="175"
        height="32"
        viewBox="0 0 1361 163"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 163V48.8682V0L40.75 40.75V61.125H142.625V81.5L122.25 101.875H40.75V163H0ZM61.125 40.75L20.375 0H183.375V20.375L163 40.75H61.125ZM216.486 163L250.236 129.25H334.611L351.486 146.125V163H216.486ZM199.611 163V68.4736V28H233.361V129.25L199.611 163ZM364.934 163V151.135V146.125L415.559 95.5L364.934 44.875V28H398.684L449.309 78.625H499.934V112.375H449.309L432.434 129.25H499.934L516.809 146.125V163H364.934ZM449.309 61.75L415.559 28H516.809V44.875L499.934 61.75H449.309ZM648.381 163L614.631 129.25L639.943 103.938L682.131 146.125V163H648.381ZM572.443 87.0625L530.256 44.875V33.0098V28H564.006L597.756 61.75L572.443 87.0625ZM530.256 163V151.135V146.125L648.381 28H682.131V44.875L564.006 163H530.256ZM695.578 163L736.328 122.25H858.578L878.953 142.625V163H695.578ZM695.578 142.625V71.3125V40.75L736.328 0H878.953V20.375L858.578 40.75H756.703L736.328 61.125V101.875L695.578 142.625ZM895.189 163V68.4736V28H928.939V78.625H962.689L928.939 112.375V163H895.189ZM1013.31 163V112.375H945.814L979.564 78.625H1013.31V28H1047.06V163H1013.31ZM1060.51 163V68.4736V28H1094.26L1212.39 146.125V163H1178.64L1094.26 78.625V112.375H1111.14L1144.89 146.125H1094.26V163H1060.51ZM1276.46 163V61.75H1225.83V38.1514V28H1360.83V44.875L1343.96 61.75H1310.21V163H1276.46Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

const Title = ({ text }) => {
  return (
    <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">
      {text}
    </h6>
  );
};

export default ContactsContainer;
