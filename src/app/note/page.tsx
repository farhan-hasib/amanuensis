"use client";

import React, { useState, useEffect, useRef } from "react";
import { getLLMResponse } from "@/lib/llmUtils";
import NoteTextBox from "@/components/NoteTextBox";
import PromptTextBox from "@/components/PromptTextBox";
import ApiKeyModal from "@/components/ApiKeyModal";

type SpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
};

type SpeechRecognitionEvent = {
  resultIndex: number;
  results: {
    isFinal: boolean;
    [key: number]: {
      transcript: string;
    };
  }[];
};

type SpeechRecognitionErrorEvent = {
  error: string;
};

const NotePage = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState<string[]>([]);
  const [charCount, setCharCount] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [accumulatedText, setAccumulatedText] = useState("");
  const [displayedTexts, setDisplayedTexts] = useState<string[][]>([]);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(true);
  const MAX_CHAR_COUNT = 1000;

  useEffect(() => {
    setCharCount(text.length);
  }, [text]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          let transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ".";
          } else {
            interimTranscript += transcript;
          }
        }
        setAccumulatedText((prev) => {
          const newAccumulated = enforceCharLimit(
            capitalizeAfterPeriod(prev + finalTranscript),
          );
          return newAccumulated;
        });
        setInterimTranscript(capitalizeAfterPeriod(interimTranscript));
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("Speech recognition not supported in this browser.");
    }
  }, [cursorPosition, text]);

  const capitalizeAfterPeriod = (str: string) => {
    return str.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const enforceCharLimit = (str: string) => {
    return str.slice(0, MAX_CHAR_COUNT);
  };

  const handleTextChange = (newText: string) => {
    const limitedText = enforceCharLimit(newText);
    setText(limitedText);
    setCursorPosition(limitedText.length);
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
        setText((prev) => {
          const newText = enforceCharLimit(
            capitalizeAfterPeriod(prev + accumulatedText + interimTranscript),
          );
          return newText;
        });
        setAccumulatedText("");
        setInterimTranscript("");
      }
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  const handleSubmitPrompt = async () => {
    if (!apiKey || !model) return;
    const responseText = await getLLMResponse(text, prompt, apiKey, model);
    setResponses((prev) => [...prev, responseText]);
    displayTextWordByWord(responseText);
  };

  const displayTextWordByWord = (fullText: string) => {
    const words = fullText.split(" ");
    let currentIndex = 0;
    const newDisplayedText: string[] = [];

    const intervalId = setInterval(() => {
      if (currentIndex < words.length) {
        newDisplayedText.push(words[currentIndex]);
        setDisplayedTexts((prev) => {
          const updatedDisplayedTexts = [...prev];
          updatedDisplayedTexts[updatedDisplayedTexts.length - 1] =
            newDisplayedText;
          return updatedDisplayedTexts;
        });
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 20);

    setDisplayedTexts((prev) => [...prev, []]);
  };

  const handleCursorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCursorPosition(e.target.selectionStart);
  };

  const handleApiKeySubmit = (key: string, selectedModel: string) => {
    setApiKey(key);
    setModel(selectedModel);
    setShowModal(false);
  };

  return (
    <div className="note-page-container">
      {showModal && <ApiKeyModal onSubmit={handleApiKeySubmit} />}
      {!showModal && (
        <div className="note-box">
          <NoteTextBox
            text={text}
            accumulatedText={accumulatedText}
            interimTranscript={interimTranscript}
            handleTextChange={handleTextChange}
            handleCursorChange={handleCursorChange}
            toggleListening={toggleListening}
            isListening={isListening}
          />
          <div className="char-count">
            <p>
              {charCount}/{MAX_CHAR_COUNT} characters
            </p>
          </div>
          <PromptTextBox
            prompt={prompt}
            setPrompt={setPrompt}
            handleSubmitPrompt={handleSubmitPrompt}
          />
        </div>
      )}
      {!showModal && (
        <div className="amanuensis-response">
          <p className="amanuensis-title">Amanuensis:</p>
          {displayedTexts.map((displayedText, index) => (
            <div key={index} className="response-box">
              {displayedText.join(" ")}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotePage;
