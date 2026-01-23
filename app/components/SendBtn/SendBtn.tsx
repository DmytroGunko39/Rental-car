'use client';

export default function SendBtn() {
  return (
    <button
      type="submit"
      className="
        flex justify-center items-center
        w-[156px] h-11
        rounded-xl
        px-12 py-3
        bg-[#3470ff] text-white text-base font-semibold
        transition-all duration-300 ease-out
        hover:bg-[#0b44cd] hover:shadow-lg hover:shadow-blue-500/30
        active:scale-[0.98]
        cursor-pointer border-none
      "
    >
      Send
    </button>
  );
}
