import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import FontSize from "../extensions/FontSize";

import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconList,
  IconListNumbers,
  IconEraser,
} from "@tabler/icons-react";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const handleFontSizeChange = (e) => {
    const size = e.target.value;
    if (size) {
      editor.chain().focus().setFontSize(`${size}px`).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-100 rounded-md mb-4">
      {/* Text formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("bold") ? "bg-gray-300" : ""
        }`}
      >
        <IconBold size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("italic") ? "bg-gray-300" : ""
        }`}
      >
        <IconItalic size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("underline") ? "bg-gray-300" : ""
        }`}
      >
        <IconUnderline size={18} />
      </button>

      <span className="mx-2 border-l border-gray-300 h-5" />

      {/* Font size preset */}
      <select
        onChange={handleFontSizeChange}
        defaultValue=""
        className="p-2 rounded bg-white border border-gray-300"
      >
        <option value="">Font Size</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        <option value="22">22</option>
        <option value="24">24</option>
        <option value="26">26</option>
        <option value="28">28</option>
        <option value="36">36</option>
        <option value="48">48</option>
        <option value="72">72</option>
      </select>

      <span className="mx-2 border-l border-gray-300 h-5" />

      {/* Text alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
        }`}
      >
        <IconAlignLeft size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
        }`}
      >
        <IconAlignCenter size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
        }`}
      >
        <IconAlignRight size={18} />
      </button>

      <span className="mx-2 border-l border-gray-300 h-5" />

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("bulletList") ? "bg-gray-300" : ""
        }`}
      >
        <IconList size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-200 ${
          editor.isActive("orderedList") ? "bg-gray-300" : ""
        }`}
      >
        <IconListNumbers size={18} />
      </button>

      <span className="mx-2 border-l border-gray-300 h-5" />

      {/* Table features */}
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        className="p-2 rounded hover:bg-gray-200"
      >
        🗂️
      </button>

      <button
        onClick={() => editor.chain().focus().addRowAfter().run()}
        className="p-2 rounded hover:bg-gray-200"
      >
        ➕Row
      </button>

      <button
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        className="p-2 rounded hover:bg-gray-200"
      >
        ➕Col
      </button>

      <button
        onClick={() => editor.chain().focus().deleteTable().run()}
        className="p-2 rounded hover:bg-red-200"
      >
        ❌Tbl
      </button>

      <span className="mx-2 border-l border-gray-300 h-5" />

      {/* Clear formatting */}
      <button
        onClick={() =>
          editor.chain().focus().unsetAllMarks().clearNodes().run()
        }
        className="p-2 rounded hover:bg-gray-200"
      >
        <IconEraser size={18} />
      </button>
    </div>
  );
};

const TiptapEditor = ({ content, setContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ underline: false }),
      Underline,
      TextStyle, // required for FontSize
      FontSize,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Tulis catatanmu di sini...",
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-md p-4 bg-white">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="tiptap prose max-w-none min-h-[200px] max-h-[300px] overflow-y-auto"
      />
    </div>
  );
};

export default TiptapEditor;
