// Loader.jsx
const Loader = () => (
    <div id="loader" className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <img src="/xpense-logo.png" alt="Xpense Logo" className="w-20 h-20 animate-bounce" />
        <p className="mt-4 text-lg font-semibold animate-pulse">Preparing your dashboard...</p>
    </div>
);

export default Loader;