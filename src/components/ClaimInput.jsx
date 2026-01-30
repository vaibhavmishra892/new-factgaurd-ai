import React, { useState, useRef } from 'react';
import { Search, Sparkles, Type, Link, Image as ImageIcon, X } from 'lucide-react';

export default function ClaimInput({ value, onChange, onVerify, isVerifying }) {

  const [mode, setMode] = useState('text'); // text | url | image
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const getPlaceholder = () =>
    mode === 'url'
      ? "Paste a URL to a news article or social media post..."
      : "Paste a news claim or statement here...";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        // Pass object to parent: { image: base64 }
        onChange({ image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onChange(""); // reset
  };

  const handleTextChange = (text) => {
    onChange(text);
  };

  const handleVerifyClick = () => {
    // If image mode, pass object. If text mode, pass string (handled by parent logic update)
    if (mode === 'image' && selectedImage) {
      onVerify(); // Parent already has the image from onChange
    } else {
      onVerify();
    }
  };

  return (
    <div className="glass-panel p-6 mb-8 relative overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm font-semibold body-text-muted flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          Analyze a Statement
        </label>

        {/* MODE SWITCH */}
        <div className="flex bg-slate-900/60 p-1 rounded-lg border border-white/10">
          <button
            type="button"
            onClick={() => setMode('text')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all
              ${mode === 'text'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
          >
            <Type className="w-3 h-3 inline mr-1" />
            Text
          </button>

          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all
              ${mode === 'url'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
          >
            <Link className="w-3 h-3 inline mr-1" />
            Link
          </button>

          <button
            type="button"
            onClick={() => setMode('image')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all
              ${mode === 'image'
                ? 'bg-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
          >
            <ImageIcon className="w-3 h-3 inline mr-1" />
            Image
          </button>
        </div>
      </div>

      {/* INPUT AREA */}
      <div className="relative">
        {mode === 'image' ? (
          <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-purple-500/50 transition-colors min-h-[140px] flex flex-col items-center justify-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            {selectedImage ? (
              <div className="relative group">
                <img src={selectedImage} alt="Preview" className="h-48 object-contain rounded-lg shadow-lg" />
                <button
                  onClick={clearImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <ImageIcon className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <p className="text-sm text-slate-400 font-medium">Click to upload an image</p>
                <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WEBP</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <textarea
              className="
                    glass-input
                    w-full
                    min-h-[140px]
                    p-5
                    text-base
                    rounded-xl
                    resize-none
                    placeholder-slate-500
                    text-slate-100
                    focus:outline-none
                    focus:ring-2
                    focus:ring-purple-500/40
                "
              placeholder={getPlaceholder()}
              value={typeof value === 'string' ? value : ''}
              onChange={(e) => handleTextChange(e.target.value)}
              disabled={isVerifying}
            />
            <div className="absolute bottom-4 right-4 text-xs body-text-muted font-mono">
              {typeof value === 'string' ? value.length : 0} chars
            </div>
          </>
        )}
      </div>

      {/* ACTION AREA */}
      <div className="flex items-center justify-between mt-5 gap-4">
        <p className="text-xs body-text-muted">
          <span className="text-purple-500 font-medium">Try:</span>{" "}
          {mode === 'url'
            ? "https://twitter.com/news/status/123..."
            : mode === 'image'
              ? "Upload a screenshot of a headline"
              : '"Gold prices surged yesterday..."'}
        </p>

        <button
          onClick={handleVerifyClick}
          disabled={!value || isVerifying}
          className="
            flex items-center gap-2
            text-sm font-semibold
            px-6 py-3
            rounded-xl
            text-white
            bg-fuchsia-600
            hover:bg-fuchsia-700
            shadow-lg
            shadow-fuchsia-500/30
            transition-all
            duration-200
            disabled:opacity-50
            disabled:cursor-not-allowed
            active:scale-95
          "
        >
          {isVerifying ? "Verifying..." : (
            <>
              <Search className="w-4 h-4" />
              Verify Result
            </>
          )}
        </button>
      </div>

    </div>
  );
}
