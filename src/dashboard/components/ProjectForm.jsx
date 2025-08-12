import React, { useEffect, useState } from "react";

const initialForm = {
  title: "",
  description: "",
  client: "",
  category: "",
  tags: "",
  status: "",
  mediaLinks: "",
  thumbnail: "",
};

const ProjectForm = ({ onSubmit, selectedProject, cancelEdit }) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (selectedProject) {
      setFormData({
        ...selectedProject,
        tags: selectedProject.tags?.join(","),
        mediaLinks: selectedProject.mediaLinks?.join(","),
      });
    }
  }, [selectedProject]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      mediaLinks: formData.mediaLinks.split(",").map((link) => link.trim()),
    };
    onSubmit(payload, selectedProject?._id);
    setFormData(initialForm);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
      <input
        name="title"
        placeholder="Judul"
        value={formData.title}
        onChange={handleChange}
        className="border p-2"
        required
      />
      <input
        name="client"
        placeholder="Klien"
        value={formData.client}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        name="category"
        placeholder="Kategori"
        value={formData.category}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        name="status"
        placeholder="Status"
        value={formData.status}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        name="tags"
        placeholder="Tag (pisah dengan koma)"
        value={formData.tags}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        name="mediaLinks"
        placeholder="Link (pisah dengan koma)"
        value={formData.mediaLinks}
        onChange={handleChange}
        className="border p-2"
      />
      <input
        name="thumbnail"
        placeholder="Link Thumbnail"
        value={formData.thumbnail}
        onChange={handleChange}
        className="border p-2"
      />
      <textarea
        name="description"
        placeholder="Deskripsi"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 col-span-2"
      />

      <div className="col-span-2 flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded"
        >
          {selectedProject ? "Update Project" : "Tambah Project"}
        </button>
        {selectedProject && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Batal Edit
          </button>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;
