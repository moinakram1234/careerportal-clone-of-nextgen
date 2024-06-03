// Update the sidebarItems.js file
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlinePostAdd } from "react-icons/md";
import { IoDocumentAttach } from "react-icons/io5"; // Added IoTrash for deleted items
import { IoEye } from "react-icons/io5";
import { VscHistory } from "react-icons/vsc";
import { GrDocumentMissing } from "react-icons/gr";
import { HiDocumentCheck } from "react-icons/hi2";
const sidebarItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: AiOutlineHome,
  },
  {
    name: "Post a Job",
    href: "/dashboard/postjob",
    icon: MdOutlinePostAdd,
  },
  {
    name: "View Applications",
    href: "/dashboard/allApplications",
    icon: IoDocumentAttach,
  },
  {
    name: "Rejected Applications",
    href: "/dashboard/rejectedApplications",
    icon: GrDocumentMissing,
  },
  {
    name: "Accepted Applications",
    href: "/dashboard/acceptedApplications",
    icon: HiDocumentCheck,
  },
  {
    name: "View posts",
    href: "/dashboard/viewpost",
    icon: IoEye,
  },
  
  {
    name: "Archived",
    href: "/dashboard/Archived",
    icon: VscHistory, // Use the trash icon for the "History" main button
    subItems: [
      {
        name: "Archived Job Posts",
        href: "/dashboard/history/ArchivedJobPosts",
      },
      {
        name: "Archived Applications",
        href: "/dashboard/history/ArchivedApplications",
      },
    ],
  },
];

export default sidebarItems;
