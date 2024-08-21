import React from "react";

interface PromptTextBoxProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  handleSubmitPrompt: () => void;
}

const PromptTextBox: React.FC<PromptTextBoxProps> = ({
  prompt,
  setPrompt,
  handleSubmitPrompt,
}) => {
  return (
    <div className="prompt-textbox-container">
      <input
        type="text"
        placeholder="Enter your prompt (e.g., summarize the text)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="prompt-textbox"
      />
      <button onClick={handleSubmitPrompt} className="prompt-submit-button">
        ➔
      </button>
    </div>
  );
};

export default PromptTextBox;
