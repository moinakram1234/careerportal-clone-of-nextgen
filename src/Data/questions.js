// components/Chatbot.js
import { useState } from 'react';

export const predefinedQuestionsAndAnswers = [
    {
        question: 'Can you tell us a little about yourself?',
        answer: 'I am a chatbot. You can call me ChatGPT.🎉🎉',
    },
    {
        question: 'What motivated you to apply for this position?',
        answer: 'The chatbot displays predefined questions. Click on a question, and I will show you the answer.🥳🥳',
    },
    {
        question: 'How do you handle stress and pressure?',
        answer: 'I handle stress and pressure by staying calm and focused on the task at hand. I prioritize tasks and break them down into manageable steps.🥳🥳🥳',
    },
    {
        question: 'What is your greatest professional achievement?',
        answer: 'My greatest professional achievement is [insert achievement]. It taught me valuable skills and helped me grow in my career.🥳🥳🥳',
    },
    {
        question: 'How do you stay updated with industry trends?',
        answer: 'I stay updated with industry trends by regularly reading industry publications, attending conferences, and participating in online forums and discussions.🥳🥳🥳',
    },
    {
        question: 'Can you provide an example of a challenging situation you faced at work?',
        answer: 'In a previous role, I faced a challenging situation when [describe situation]. I addressed it by [explain your approach] and learned valuable lessons from the experience.🥳🥳🥳',
    },
    {
        question: 'What are your strengths as a team member?',
        answer: 'My strengths as a team member include strong communication skills, collaboration, and the ability to adapt to different working styles. I value teamwork and contribute positively to group dynamics.🥳🥳🥳',
    },
    {
        question: 'How do you handle constructive criticism?',
        answer: 'I view constructive criticism as an opportunity for growth. I appreciate feedback, reflect on it, and use it to improve my skills and performance.🥳🥳🥳',
    },
    {
        question: 'What are your career goals for the next five years?',
        answer: 'In the next five years, I aim to [describe your career goals]. I plan to enhance my skills, take on more responsibilities, and contribute to the success of the organization.🥳🥳🥳',
    },
    {
        question: 'How do you prioritize tasks and manage your time effectively?',
        answer: 'I prioritize tasks based on urgency and importance. I use time management tools, set clear goals, and break down tasks into smaller steps to ensure efficient use of my time.🥳🥳🥳',
    },
    // Add 10 more predefined questions and answers
];
