import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlinePostAdd } from 'react-icons/md';
import { IoDocumentAttach } from 'react-icons/io5';
import { MdOutlinePerson4 } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { BiHomeAlt } from "react-icons/bi";
import { MdContactPhone } from "react-icons/md";
import { PiCertificate } from "react-icons/pi";
import { FaFilePdf } from "react-icons/fa6";
import { FcDepartment } from "react-icons/fc";
import { MdSummarize } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
export const HomeIcon = () => <div className='hover:text-blue-900'> <AiOutlineHome size={25} style={{opacity:"0.7",color:'#005997'}} /></div>
export const PostAddIcon = () => <div className='hover:text-blue-900'> <MdOutlinePostAdd size={25} style={{opacity:"0.7",color:'#005997'}} /></div>
export const DocumentAttachIcon = () => <div className='hover:text-blue-900'> <IoDocumentAttach size={25} style={{opacity:"0.7",color:'#005997'}} /></div>
export const PersonNaneicon=()=> <div className='hover:text-blue-900'><MdOutlinePerson4 size={25} style={{opacity:"0.7",color:'#005997'}} /></div>
export const ViewApp=()=><div className='hover:text-blue-900'><IoEye size={25}  /></div>
export const Contacticon=()=><div className='hover:text-blue-900'><MdContactPhone size={25} style={{opacity:"0.7",color:'#005997'}} /></div>
export const HomeAddress=()=><div className='hover:text-blue-900'><BiHomeAlt size={25} style={{opacity:"0.7",color:'#005997'}} /></div>
export const Degreeicon=()=> <div className='hover:text-blue-900'><PiCertificate size={25} style={{opacity:"0.7",color:'#005997'}} /></div>
export const Pdficon=()=> <div className='hover:text-blue-900'><FaFilePdf size={25} style={{opacity:"0.7",color:'#005997'}} /></div>
export const Departmenticon=()=> <div className='hover:text-blue-900'><FcDepartment size={25} style={{opacity:"0.7",color:'#005997'}} /></div>
export const Coverlettericon=()=> <div className='hover:text-blue-900'><MdSummarize size={25} style={{opacity:"0.7",color:'#005997'}} /></div>
export const Dropcv_icon=()=> <div className='hover:text-blue-900'><MdSummarize size={25} style={{opacity:"0.7",color:'#005997'}} /></div>
export const Emailicon=()=> <div className='hover:text-blue-900'><MdOutlineAlternateEmail size={25} style={{opacity:"0.7",color:'#005997'}} /></div>