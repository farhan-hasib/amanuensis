import React, { useRef } from "react";
import MicIcon from "@mui/icons-material/Mic";

interface NoteTextBoxProps {
  text: string;
  accumulatedText: string;
  interimTranscript: string;
  handleTextChange: (newText: string) => void;
  handleCursorChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  toggleListening: () => void;
  isListening: boolean;
}

const NoteTextBox: React.FC<NoteTextBoxProps> = ({
  text,
  accumulatedText,
  interimTranscript,
  handleTextChange,
  handleCursorChange,
  toggleListening,
  isListening,
}) => {
  const textBoxRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div className="note-textbox-container">
      <textarea
        value={text + accumulatedText + interimTranscript}
        placeholder="Start typing or click the mic button to transcribe speech to text..."
        onChange={(e) => {
          handleTextChange(e.target.value);
          handleCursorChange(e);
        }}
        rows={15}
        ref={textBoxRef}
        className="note-textbox"
      />
      <button
        onClick={toggleListening}
        className={`mic-button ${isListening ? "bg-red-500" : "bg-green-500"}`}
      >
        <MicIcon style={{ color: isListening ? "white" : "black" }} />
      </button>
    </div>
  );
};

export default NoteTextBox;
