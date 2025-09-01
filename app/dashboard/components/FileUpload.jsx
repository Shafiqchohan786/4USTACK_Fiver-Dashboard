"use client";
import { useRef, useState } from "react";

export default function DashboardUpload({ onUploaded }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) {
      setFile(f);
      setFileName(f.name);
    }
  };

  const handleFileSelect = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setFileName(f.name);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select a file first!");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ File uploaded successfully! ${data.rows || "rows added."}`);
        setFile(null);
        setFileName("");

        // Callback to refresh dashboard after upload
        if (onUploaded) {
          onUploaded();
        }

        // 🔄 Auto-refresh page
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        setMessage(`❌ Upload failed: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed: Server error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-3xl p-8 w-full max-w-md border border-gray-200">
        <h3 className="font-bold text-2xl text-gray-800 mb-6 text-center">
          Upload Your Data
        </h3>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-gray-500 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
        >
          <div className="text-6xl mb-4">☁️⬆️</div>
          <p className="font-medium text-gray-700">Drag & drop your file here</p>
          <p className="text-sm text-gray-400 mt-1">or click to browse</p>

          {fileName && (
            <div className="mt-4 text-sm font-semibold text-blue-600 truncate max-w-full text-center">
              Selected: {fileName}
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx"
          className="hidden"
          onChange={handleFileSelect}
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => inputRef.current?.click()}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl py-3 shadow-sm transition"
          >
            Browse File
          </button>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3 shadow-md transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes("✅")
                ? "text-green-600"
                : message.includes("⚠️")
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
