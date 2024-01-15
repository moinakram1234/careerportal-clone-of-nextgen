import { predefinedQuestionsAndAnswers } from "@/Data/questions";
import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";
const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });
const Chatbot = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleQuestionClick = (index) => {
    setSelectedQuestion(index);
  };

  const handleSuggestionClick = (suggestion) => {
    setUserInput(suggestion);
    const matchingQuestion = predefinedQuestionsAndAnswers.find(
      (qa) => qa.question.toLowerCase() === suggestion.toLowerCase()
    );

    if (matchingQuestion) {
      setAnswer(matchingQuestion.answer);
    } else {
      setAnswer("Answer not found");
    }

    setSuggestions([]); // Clear suggestions after selecting one
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setUserInput(inputValue);

    const matchingSuggestions = predefinedQuestionsAndAnswers
      .filter((qa) =>
        qa.question.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((qa) => qa.question);

    setSuggestions(matchingSuggestions);
  };


  return (
    <div className="bg-white border rounded-xl lg:h-96 lg:w-full z-50 relative">
      <div className="flex grid-cols-2 h-full">
        <div className="w-[47%]">
          <Head>
            <title>Job Application Chatbot</title>
            <meta
              name="description"
              content="Job Application Chatbot using Next.js and Tailwind CSS"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className="p-4">
            <h1 className="text-xl font-semibold mb-4 text-gray-600">
              Job Application Chatbot
            </h1>

            {/* User Questions Section */}
            <div className="mt-8">
              <h2 className="text-xs font-semibold mb-2 text-gray-500">
                Ask a Question
              </h2>
              {/* Add a form for users to ask questions */}
              {/* For simplicity, just a basic input field */}
              <input
                type="text"
                placeholder="Type your question here..."
                className="p-2 border rounded-md w-full"
                value={userInput}
                onChange={handleInputChange}
              />

              {/* Display suggestions */}
              {suggestions.length > 0 && (
                <ul className="suggestions-list text-gray-500 overflow-y-auto max-h-40">
                  {suggestions.map((suggestion, index) => (
                    <li
                      className="p-1 text-blue-400 cursor-pointer hover:underline"
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </main>
        </div>
        <div className="border text-gray-500 w-[53%] overscroll-y-auto p-5">
        <Typewriter
  options={{
    strings: answer,
    autoStart: true,
    loop: false,
    delay: 20, // Adjust the type speed (measured in milliseconds)
  }}
/>
               
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
