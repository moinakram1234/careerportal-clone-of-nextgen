import { AiOutlineHome } from "react-icons/ai";
import { MdOutlinePostAdd } from "react-icons/md";
import { IoDocumentAttach } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
const sidebarItems = [
  {
    name: "Home",
    href: "/admin/dashboard",
    icon: AiOutlineHome,
  },
  {
    name: "Post Job",
    href: "/admin/postjob",
    icon: MdOutlinePostAdd,
  },
  {
    name: "View Applications",
    href: "/admin/allApplications",
    icon: IoDocumentAttach,
  },
  {
    name: "View all job post",
    href: "/admin/viewpost",
    icon: IoEye,
  },
];

export default sidebarItems;
