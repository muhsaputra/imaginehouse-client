import React from "react";

const NoteCard = ({ title, content, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-md transition border border-gray-200"
    >
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div
        className="text-gray-600 text-sm prose max-w-none line-clamp-5"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default NoteCard;
