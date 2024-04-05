// Import statements
import { extendTheme } from "@chakra-ui/react";
import BaseLayout from "../../components/Baselayout";
import Loader from "../../components/loader";
import { createJobapplication } from "../../server_requests/client_requests";
import React, { useState } from "react";
import {
  ChakraProvider,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import "react-toastify/dist/ReactToastify.css";
import BottomSection from "../../components/bottomsection";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { Range } from "react-range";

//for jobdetails
// JobDetails.js
import { fetchJobPostDetails } from "@/server_requests/client_requests";
// ...

import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton, // Corrected import
  TwitterShareButton,
} from "next-share";

import {
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon, // Corrected import
  TwitterIcon,
} from "next-share";

// ...
import dynamic from "next/dynamic";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { WiTime5 } from "react-icons/wi";
import { PiBagSimpleFill } from "react-icons/pi";
import { Button } from "@chakra-ui/react";

//jobs
import {

  HStack,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { isTokenExpired } from ".././tokenUtils";
import { fetchJobPosts } from "@/server_requests/client_requests";
import { BsClock, BsFillBookmarkFill } from "react-icons/bs";
import { BiBriefcase, BiBuilding, BiLineChart, BiMap } from "react-icons/bi";
import { FaPersonChalkboard } from "react-icons/fa6";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// Export statements
export {
  BaseLayout,
  Loader,
  createJobapplication,
  React,
  useState,
  ChakraProvider,
  Radio,
  RadioGroup,
  Select,
  Stack,
  theme,
  useRouter,
  toast,
  BottomSection,
  ToastContainer,
  Image,
  Range,
  fetchJobPostDetails,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TwitterIcon,
  dynamic,
  FaLocationCrosshairs,
  WiTime5,
  PiBagSimpleFill,
  Button,
  HStack,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ChevronDownIcon,
  useSession,
  useSelector,
  isTokenExpired,
  fetchJobPosts,
  BsClock,
  BsFillBookmarkFill,
  BiBriefcase,
  BiBuilding,
  BiLineChart,
  BiMap,
  FaPersonChalkboard
};
