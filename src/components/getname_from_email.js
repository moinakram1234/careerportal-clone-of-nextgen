const GetNameFromEmail = ({ email }) => {
  const extractName = (email) => {
    // Extract name from email by splitting at '@'
    const name = email.split('@')[0];

    // Remove numbers from the name
    const cleanedName = name.replace(/\d+/g, ''); // This will remove all numbers

    return cleanedName;
  };

  const name = extractName(email);

  return <span>{name}</span>;
};

export default GetNameFromEmail;
