'use client';

export default function SendBtn() {
  return (
    <button
      type="submit"
      className="
        flex justify-center items-center
        w-[156px] h-[44px]
        rounded-[12px]
        px-[51px] py-[12px]
        bg-[#3470ff] text-white text-[16px] leading-[1.25]
        transition-all duration-200
        hover:bg-[#0b44cd]
        cursor-pointer border-none
      "
    >
      Send
    </button>
  );
}
