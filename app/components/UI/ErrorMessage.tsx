export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl font-medium text-sm">
      {message}
    </div>
  );
}
