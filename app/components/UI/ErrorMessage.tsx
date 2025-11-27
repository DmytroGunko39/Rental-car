export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
      {message}
    </div>
  );
}
