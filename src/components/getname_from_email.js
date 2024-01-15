// components/GetNameFromEmail.js

const GetNameFromEmail = ({ email }) => {
    const extractName = (email) => {
      // Extract name from email by splitting at '@'
      const [name] = email.split('@');
      return name;
    };
  
    const name = extractName(email);
  
    return <span>{name}</span>;
  };
  
  export default GetNameFromEmail;
  