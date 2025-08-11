import React from "react";

export default function BreadcrumbSection({
  title,
  path = [], // array of { name, href }
  bgImage,
}) {
  return (
    <section
      className="relative w-full h-96 flex items-center justify-center text-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Konten */}
      <div className="relative z-10 text-white px-4">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>

        {/* Breadcrumb */}
        <nav className="flex justify-center" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-300 hover:text-white"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </a>
            </li>

            {path.map((item, index) => (
              <li key={index} className="flex items-center">
                {index >= 0 && (
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                )}

                {index < path.length - 1 ? (
                  <a
                    href={item.href}
                    className="ms-1 text-sm font-medium text-gray-300 hover:text-white md:ms-2"
                  >
                    {item.name}
                  </a>
                ) : (
                  <span className="ms-1 text-sm font-medium text-gray-400 md:ms-2">
                    {item.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
