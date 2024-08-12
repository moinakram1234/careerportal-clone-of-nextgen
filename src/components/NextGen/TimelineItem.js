import { motion } from 'framer-motion';

const TimelineItem = ({ date, title, content, isRight }) => {
  return (
    <div className={`flex ${isRight ? 'justify-end' : 'justify-start'} mb-8 w-full`}>
      <motion.div 
        initial={{ opacity: 0, x: isRight ? 100 : -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-6 max-w-md"
      >
        <div className={`text-${isRight ? 'right' : 'left'}`}>
          <div className="text-lg font-bold">{title}</div>
          <div className="text-sm text-gray-500">{date}</div>
          <div className="mt-2 text-gray-700">{content}</div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineItem;
