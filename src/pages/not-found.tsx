import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-2xl font-medium text-white">
        Oops! Parece que te has perdido...
      </p>
      <p className="text-xl text-white mt-2">
        La página que estás buscando no existe.
      </p>
      <a
        href="/"
        className="mt-4 text-white underline hover:text-gray-200 text-lg"
      >
        Volver a la página de inicio
      </a>
    </div>
  );
};

export default NotFound;
