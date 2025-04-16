interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Left panel */}
      <div className='flex-1 bg-amber-900 flex items-center justify-center p-8 relative overflow-hidden'>
        <div className='relative z-10 text-center'>
          <h1 className='text-4xl md:text-5xl text-amber-100 font-serif mb-2'>
            Hogwarts School of
          </h1>
          <h1 className='text-4xl md:text-5xl text-amber-100 font-serif mb-8'>
            Witchcraft and Wizardry
          </h1>
          <p className='text-amber-200 font-serif'>By Quidditch Captain</p>
        </div>
      </div>

      {/* Right panel */}
      <div className='flex-1 bg-amber-900 flex flex-col items-center justify-center p-8 relative overflow-hidden'>
        <div className='relative z-10 text-center'>
          <h2 className='text-4xl md:text-5xl text-amber-100 font-serif mb-4'>
            The Quidditch Sorting
          </h2>
          <p className='text-xl text-amber-200 font-serif mb-12'>
            Which position matches your magical abilities?
          </p>

          <button
            onClick={onStart}
            className='border-2 border-amber-300 text-amber-100 px-6 py-3 hover:bg-amber-950 transition-colors font-serif tracking-wider'
          >
            BEGIN THE EXPERIENCE
          </button>
        </div>

        {/* Dividing line */}
        <div className='hidden md:block absolute left-0 top-0 bottom-0 w-px bg-amber-600'></div>
      </div>
    </div>
  );
}
