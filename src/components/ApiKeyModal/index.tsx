import React, { useState } from "react";

type ApiKeyModalProps = {
  onSubmit: (apiKey: string, model: string) => void;
};

const models = [
  "chatgpt-4o-latest",
  "gpt-4o",
  "gpt-4o-mini",
  "gpt-4-turbo",
  "gpt-4",
  "gpt-4-0125-preview",
  "gpt-4-1106-preview",
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-0125",
  "gpt-3.5-turbo-1106",
];

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("chatgpt-4o-latest");
  const handleSubmit = () => {
    if (apiKey) {
      onSubmit(apiKey, model);
    }
  };
  return (
    <div className="apikey-modal-overlay">
      <div className="apikey-modal signin-box">
        <h2 className="apikey-title">Please Put Your OpenAI API Key</h2>
        <div className="apikey-input-container">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="OpenAI API Key"
            className="prompt-textbox"
          />
          <h2 className="apikey-title">Choose a GPT model</h2>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="model-select"
          >
            {models.map((modelOption) => (
              <option key={modelOption} value={modelOption}>
                {modelOption}
              </option>
            ))}
          </select>
          <button onClick={handleSubmit} className="apikey-submit-button">
            ➔
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
