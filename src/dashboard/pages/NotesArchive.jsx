import React, { useState, useEffect } from "react";
import axios from "axios";
import TiptapEditor from "../components/TiptapEditor";
import { PageTransition } from "@/components/PageTransition";
import html2pdf from "html2pdf.js";

axios.defaults.baseURL = "http://localhost:4000";

const NotesArchive = () => {
  const [content, setContent] = useState("<p>Tulis catatanmu di sini...</p>");
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("");
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [title, setTitle] = useState("Untitled Note");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setAction("fetching");
      const res = await axios.get("/api/v1/notes");

      if (Array.isArray(res.data)) {
        const sortedNotes = res.data.sort((a, b) => {
          if (a.pinned === b.pinned) {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          }
          return a.pinned ? -1 : 1;
        });
        setNotes(sortedNotes);
      } else {
        setNotes([]);
        console.error("Notes response is not an array:", res.data);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    } finally {
      setLoading(false);
      setAction("");
    }
  };

  const handleSave = async () => {
    if (!content || content === "<p></p>") return;

    try {
      setLoading(true);
      setAction(editingId ? "updating" : "saving");

      if (editingId) {
        await axios.put(`/api/v1/notes/${editingId}`, { title, content });
        setEditingId(null);
      } else {
        await axios.post("/api/v1/notes", { title, content });
      }

      setContent("<p>Tulis catatanmu di sini...</p>");
      setTitle("Untitled Note");
      fetchNotes();
    } catch (error) {
      console.error("Failed to save note:", error);
    } finally {
      setLoading(false);
      setAction("");
    }
  };

  const handleUpdate = async () => {
    if (!selectedNote || !selectedNote.content) return;

    try {
      setLoading(true);
      await axios.put(`/api/v1/notes/${selectedNote._id}`, {
        content: selectedNote.content,
      });
      fetchNotes();
      setSelectedNote(null);
    } catch (error) {
      console.error("Failed to update note:", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setNoteToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!noteToDelete) return;

    try {
      setLoading(true);
      setAction("deleting");
      await axios.delete(`/api/v1/notes/${noteToDelete}`);
      fetchNotes();
      setShowDeleteModal(false);
      setNoteToDelete(null);
    } catch (error) {
      console.error("Failed to delete note:", error);
    } finally {
      setLoading(false);
      setAction("");
    }
  };

  const handleModalClose = () => {
    setSelectedNote(null);
  };

  const exportNoteToPDF = (note) => {
    const element = document.createElement("div");
    element.innerHTML = note.content;
    element.style.display = "block";
    element.style.width = "210mm";
    element.style.minHeight = "297mm";
    element.style.padding = "20mm";
    element.style.background = "white";
    element.style.fontSize = "14px";
    element.style.color = "black";
    element.className = "pdf-export";

    // Tambahkan style langsung ke head untuk hasil export yang rapi
    const style = document.createElement("style");
    style.textContent = `
    .pdf-export * {
      line-height: 1.6 !important;
      white-space: normal !important;
      margin-bottom: 0.75rem !important;
    }
    .pdf-export p {
      margin: 0 0 1rem 0 !important;
    }
  `;
    element.appendChild(style);

    document.body.appendChild(element);

    html2pdf()
      .set({
        margin: 10,
        filename: `note-${note._id}.pdf`,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save()
      .then(() => {
        document.body.removeChild(element);
      })
      .catch((error) => {
        console.error("Export PDF failed:", error);
        document.body.removeChild(element);
      });
  };

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-6 text-[#841618]">
          Archive Notulensi
        </h1>

        <input
          type="text"
          placeholder="Cari catatan..."
          className="mb-4 w-full p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="mb-8 bg-white rounded-lg shadow-md p-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul catatan"
            className="mb-2 w-full p-2 border rounded"
          />
          <div className="h-[400px] mb-4">
            <TiptapEditor content={content} setContent={setContent} />
          </div>
          <button
            onClick={handleSave}
            className={`mt-2 px-4 py-2 rounded w-full md:w-auto text-white transition ${
              editingId
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-[#841618] hover:bg-[#6d1012]"
            }`}
            disabled={loading}
          >
            {loading && action === "saving" && "Saving..."}
            {loading && action === "updating" && "Updating..."}
            {!loading && (editingId ? "Update Note" : "Save Note")}
          </button>
        </div>

        {loading && action === "fetching" ? (
          <p className="text-center text-gray-500">Loading notes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {notes
              .filter((note) =>
                note.content.toLowerCase().includes(search.toLowerCase())
              )
              .map((note) => (
                <div
                  key={note._id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                      {note.title || "Untitled Note"}
                    </h2>
                    <span className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                      {new Date(note.updatedAt).toLocaleDateString("id-ID")}
                    </span>
                  </div>

                  <hr className="border-gray-200" />

                  <div
                    className="prose prose-sm max-w-none line-clamp-5 cursor-pointer text-gray-700"
                    onClick={() => setSelectedNote(note)}
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />

                  <div className="flex justify-end items-center gap-3 mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(note._id);
                      }}
                      className="text-gray-400 hover:text-red-500 transition"
                      disabled={loading}
                      title="Hapus catatan"
                    >
                      ✕
                    </button>
                    <button
                      onClick={() => exportNoteToPDF(note)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Export PDF
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm transform transition-all scale-95 opacity-0 animate-modalFadeIn">
              <h2 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h2>
              <p className="mb-4">Yakin ingin menghapus catatan ini?</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded bg-[#841618] hover:bg-[#6d1012] text-white"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-[1060px] p-6 relative transform transition-all scale-95 opacity-0 animate-modalFadeIn max-h-[80vh] overflow-y-auto">
              <button
                onClick={handleModalClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              <TiptapEditor
                content={selectedNote.content}
                setContent={(newContent) =>
                  setSelectedNote({ ...selectedNote, content: newContent })
                }
              />
              <button
                onClick={handleUpdate}
                className="mt-4 bg-[#841618] hover:bg-[#6d1012] text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

        <style>{`
          @keyframes modalFadeIn {
            0% {
              transform: scale(0.95);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-modalFadeIn {
            animation: modalFadeIn 0.2s ease-out forwards;
          }

        `}</style>
      </div>
    </PageTransition>
  );
};

export default NotesArchive;
