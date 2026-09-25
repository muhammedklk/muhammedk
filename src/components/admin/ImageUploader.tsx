import React, { useRef } from "react";
import { Upload, X, Image as ImageIcon, Link as LinkIcon, RefreshCw } from "lucide-react";

interface ImageUploaderProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export function ImageUploader({
  label = "IMAGE ASSET",
  value = "",
  onChange,
  placeholder = "Upload image file or enter image URL...",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 5MB for clean data URL)
    if (file.size > 8 * 1024 * 1024) {
      alert("Image is too large. Please select an image smaller than 8MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onChange(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: "11px",
            fontWeight: "700",
            color: "#475569",
            marginBottom: "8px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {label}
        </label>
      )}

      {value ? (
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            borderRadius: "10px",
            padding: "12px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
          }}
        >
          <img
            src={value}
            alt="Asset Preview"
            style={{
              width: "72px",
              height: "72px",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#1e293b", display: "block" }}>
              CURRENT IMAGE ATTACHED
            </span>
            <span
              style={{
                fontSize: "10px",
                color: "#64748b",
                wordBreak: "break-all",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                marginTop: "2px",
              }}
            >
              {value.startsWith("data:") ? "[ Uploaded Local Desktop Image File ]" : value}
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: "8px 12px",
                background: "#f1f5f9",
                color: "#2563eb",
                border: "1px solid #cbd5e1",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: "600",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <RefreshCw style={{ width: 14, height: 14 }} /> Replace
            </button>
            <button
              type="button"
              onClick={handleClear}
              style={{
                padding: "8px 12px",
                background: "#fef2f2",
                color: "#dc2626",
                border: "1px solid #fecaca",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: "600",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <X style={{ width: 14, height: 14 }} /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* File Picker Upload Button */}
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: "2px dashed #cbd5e1",
              background: "#f8fafc",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <Upload style={{ width: 28, height: 28, color: "#2563eb", margin: "0 auto 8px" }} />
            <p style={{ fontSize: "12px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px" }}>
              Upload Image from Computer / Desktop
            </p>
            <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>
              Supports PNG, JPG, WEBP, SVG (Click to browse files)
            </p>
          </div>

          {/* Or URL input */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <LinkIcon
                style={{
                  width: 14,
                  height: 14,
                  color: "#94a3b8",
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                style={{
                  width: "100%",
                  padding: "8px 10px 8px 32px",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: "#0f172a",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
