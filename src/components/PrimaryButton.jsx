export default function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-red-600 text-white font-semibold px-5 py-2 rounded-full transition-transform duration-300 hover:bg-red-700 hover:scale-105 active:scale-95"
    >
      {children}
    </button>
  );
}
