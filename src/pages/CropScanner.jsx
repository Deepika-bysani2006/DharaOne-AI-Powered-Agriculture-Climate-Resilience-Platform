import React from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ImagePlus, ScanSearch, Trash2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { analyzeCropImage, saveScanHistory } from "../lib/agriInsights.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { storage } from "../lib/firebase.js";

const maxImageSize = 10 * 1024 * 1024;

export default function CropScanner() {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const clearImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImage(null);
    setPreviewUrl("");
    setResult(null);
    setError("");
    setSaveStatus("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files?.[0];
    if (!selectedImage) return;

    if (!selectedImage.type.startsWith("image/")) {
      setError("Choose a JPG, PNG, WebP, or other image file.");
      return;
    }
    if (selectedImage.size > maxImageSize) {
      setError("Choose an image smaller than 10 MB.");
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setImage(selectedImage);
    setPreviewUrl(URL.createObjectURL(selectedImage));
    setResult(null);
    setError("");
    setSaveStatus("");
  };

  const handleAnalysis = async () => {
    if (!image) {
      setError("Choose a crop image before starting a scan.");
      return;
    }

    setSaving(true);
    const nextResult = analyzeCropImage(image);
    const cleanName = image.name.replace(/[^a-zA-Z0-9._-]/g, "-");

    try {
      const imageRef = ref(storage, `crop-scans/${currentUser.uid}/${Date.now()}-${cleanName}`);
      await uploadBytes(imageRef, image, { contentType: image.type });
      nextResult.imageUrl = await getDownloadURL(imageRef);
      setSaveStatus("Image saved to your DharaOne crop records.");
    } catch {
      setSaveStatus("Image analysed on this device. Cloud saving needs Firebase Storage to be enabled with signed-in upload rules.");
    }

    saveScanHistory(nextResult);
    setResult(nextResult);
    setError("");
    setSaving(false);
  };

  return (
    <main className="page-content">
      <section className="page-hero compact-hero">
        <div>
          <span className="eyebrow">Crop Disease Scanner</span>
          <h1>Scan crop symptoms</h1>
          <p>Upload a clear leaf or stem image to review possible disease signals and next actions.</p>
        </div>
      </section>

      <section className="scanner-workspace" aria-label="Crop image scanner">
        <div className="scanner-zone">
          {previewUrl ? (
            <img alt={`Selected crop image: ${image.name}`} className="scan-preview" src={previewUrl} />
          ) : (
            <>
              <ScanSearch aria-hidden="true" size={34} />
              <h2>Choose a crop image</h2>
              <p>Use a close, well-lit photo of a single leaf, stem, or visible symptom.</p>
            </>
          )}

          <input accept="image/*" className="sr-only" id="crop-image" onChange={handleImageChange} ref={inputRef} type="file" />
          <div className="scanner-actions">
            <label className="secondary-button" htmlFor="crop-image">
              <Upload aria-hidden="true" size={18} />
              {image ? "Choose another image" : "Upload crop image"}
            </label>
            {image && (
              <button className="icon-button" onClick={clearImage} title="Remove selected image" type="button">
                <Trash2 aria-hidden="true" size={18} />
              </button>
            )}
          </div>
          {image && <strong className="scan-file-name">{image.name}</strong>}
          {error && <p className="scanner-error" role="alert">{error}</p>}
        </div>

        <div className="scan-result" aria-live="polite">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Crop visual triage</span>
              <h2>{result?.finding || "Ready to analyse"}</h2>
            </div>
            <ImagePlus aria-hidden="true" size={24} />
          </div>
          {result ? (
            <>
              <p>{result.summary}</p>
              <span className="scan-confidence">{result.confidence}</span>
              <h3>Suggested next steps</h3>
              <ul>
                {result.actions.map((action) => <li key={action}>{action}</li>)}
              </ul>
            </>
          ) : (
            <p>Select an image, then start the scan to create a field record and recommended checks.</p>
          )}
          {saveStatus && <p className="scanner-status" role="status">{saveStatus}</p>}
          <button className="primary-button" disabled={!image || saving} onClick={handleAnalysis} type="button">
            <ScanSearch aria-hidden="true" size={18} />
            {saving ? "Saving and analysing..." : "Analyse crop image"}
          </button>
        </div>
      </section>
    </main>
  );
}
