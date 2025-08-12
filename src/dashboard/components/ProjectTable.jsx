import React from "react";

const ProjectTable = ({ projects, onEdit, onDelete, setMonth, setYear }) => {
  return (
    <>
      {/* Filter */}
      <div className="flex gap-2 mb-4">
        <select
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2"
        >
          <option value="">Bulan</option>
          {[...Array(12)].map((_, i) => {
            const m = String(i + 1).padStart(2, "0");
            return (
              <option key={m} value={m}>
                {m}
              </option>
            );
          })}
        </select>
        <select
          onChange={(e) => setYear(e.target.value)}
          className="border p-2"
        >
          <option value="">Tahun</option>
          {[2024, 2025, 2026].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Judul</th>
            <th className="border p-2">Klien</th>
            <th className="border p-2">Kategori</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Tanggal</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td className="border p-2">{project.title}</td>
              <td className="border p-2">{project.client}</td>
              <td className="border p-2">{project.category}</td>
              <td className="border p-2">{project.status}</td>
              <td className="border p-2">
                {new Date(project.createdAt).toLocaleDateString()}
              </td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => onEdit(project)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(project._id)}
                  className="text-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProjectTable;
