export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            bzr-convert
          </h1>
        </div>
      </div>
    </header>
  );
}