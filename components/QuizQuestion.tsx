import { Question, Option } from '@/types/quiz';
import { ANSWER_COLORS } from '@/constants/quiz';

interface QuizQuestionProps {
  question: Question;
  currentAnswerIndex: number;
  setCurrentAnswerIndex: (index: number) => void;
  handleAnswer: (option: Option) => void;
  questionNumber: number;
  totalQuestions: number;
  isTiebreaker: boolean;
  colorAssignments: number[];
}

export function QuizQuestion({
  question,
  currentAnswerIndex,
  setCurrentAnswerIndex,
  handleAnswer,
  questionNumber,
  totalQuestions,
  isTiebreaker,
  colorAssignments,
}: QuizQuestionProps) {
  const handleNextAnswer = () => {
    if (currentAnswerIndex < question.options.length - 1) {
      setCurrentAnswerIndex(currentAnswerIndex + 1);
    }
  };

  const handlePrevAnswer = () => {
    if (currentAnswerIndex > 0) {
      setCurrentAnswerIndex(currentAnswerIndex - 1);
    }
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Left panel - Question */}
      <div className='flex-1 bg-neutral-900 flex items-center justify-center p-8'>
        <div className='max-w-md'>
          <h2 className='text-2xl md:text-3xl text-white font-serif mb-8'>
            {question.text}
          </h2>

          <div className='text-sm text-gray-400 mt-12'>
            Question {questionNumber} of {totalQuestions}
            {isTiebreaker && <span className='italic ml-2'>(Tiebreaker)</span>}
          </div>
        </div>
      </div>

      {/* Right panel - Only showing current option */}
      <div
        className={`flex-1 ${
          ANSWER_COLORS[colorAssignments[currentAnswerIndex] || 0]
        } flex flex-col items-center justify-center relative`}
      >
        {/* Main content container */}
        <div className='w-full max-w-md px-8 flex flex-col items-center justify-center h-full relative'>
          {/* Question text in the middle with left and right arrows */}
          <div className='flex w-full items-center justify-center py-32 md:py-0'>
            {/* Left/Up arrows */}
            <button
              onClick={handlePrevAnswer}
              disabled={currentAnswerIndex === 0}
              className={`md:hidden absolute left-6 ${
                currentAnswerIndex === 0
                  ? 'opacity-20 cursor-not-allowed'
                  : 'opacity-70 hover:opacity-100 cursor-pointer'
              } transition-opacity`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-white'
              >
                <polyline points='15 18 9 12 15 6'></polyline>
              </svg>
            </button>

            <button
              onClick={handlePrevAnswer}
              disabled={currentAnswerIndex === 0}
              className={`hidden md:block absolute top-1/2 -translate-y-1/2 left-6 ${
                currentAnswerIndex === 0
                  ? 'opacity-20 cursor-not-allowed'
                  : 'opacity-70 hover:opacity-100 cursor-pointer'
              } transition-opacity`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='40'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-white'
              >
                <polyline points='15 18 9 12 15 6'></polyline>
              </svg>
            </button>

            <div className='w-full text-center text-xl text-white font-serif px-12 md:px-16'>
              {question.options[currentAnswerIndex].text}
            </div>

            {/* Right/Down arrows */}
            <button
              onClick={handleNextAnswer}
              disabled={currentAnswerIndex >= question.options.length - 1}
              className={`md:hidden absolute right-6 ${
                currentAnswerIndex >= question.options.length - 1
                  ? 'opacity-20 cursor-not-allowed'
                  : 'opacity-70 hover:opacity-100 cursor-pointer'
              } transition-opacity`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-white'
              >
                <polyline points='9 18 15 12 9 6'></polyline>
              </svg>
            </button>

            <button
              onClick={handleNextAnswer}
              disabled={currentAnswerIndex >= question.options.length - 1}
              className={`hidden md:block absolute top-1/2 -translate-y-1/2 right-6 ${
                currentAnswerIndex >= question.options.length - 1
                  ? 'opacity-20 cursor-not-allowed'
                  : 'opacity-70 hover:opacity-100 cursor-pointer'
              } transition-opacity`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='40'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='text-white'
              >
                <polyline points='9 18 15 12 9 6'></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Position indicators */}
        <div className='absolute md:right-8 md:top-1/2 bottom-24 left-1/2 md:left-auto transform md:-translate-y-1/2 -translate-x-1/2 md:translate-x-0 flex md:flex-col flex-row gap-3'>
          {question.options.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx === currentAnswerIndex ? 'bg-white' : 'bg-white/40'
              }`}
              onClick={() => setCurrentAnswerIndex(idx)}
              style={{ cursor: 'pointer' }}
            ></div>
          ))}
        </div>

        {/* SELECT button */}
        <button
          onClick={() => handleAnswer(question.options[currentAnswerIndex])}
          className='absolute bottom-12 border border-white text-white text-sm px-8 py-2 uppercase tracking-wider hover:bg-white/10 transition-colors'
        >
          SELECT
        </button>
      </div>
    </div>
  );
}
