"use client";
import Image from "next/image";
import { useState ,useEffect} from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const TextToSpeech = () => {
    const [text, setText] = useState("");
    const [voice, setVoice] = useState(null);
    const [voices, setVoices] = useState([]);

    // Fetch available voices
    const loadVoices = () => {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      setVoices(voices);
      // Select the default voice
      if (voices.length > 0) {
        setVoice(voices[0]);
      }
    };

    // Handle voice change
    const handleVoiceChange = (e) => {
      const selectedVoice = voices.find(
        (voice) => voice.name === e.target.value
      );
      setVoice(selectedVoice);
    };

    // Handle text-to-speech
    const handleSpeak = () => {
      if ("speechSynthesis" in window) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        if (voice) {
          utterance.voice = voice;
        }
        synth.speak(utterance);
      } else {
        alert("Speech Synthesis not supported in this browser.");
      }
    };

    // Load voices when the component mounts
    useEffect(() => {
      loadVoices();
      // SpeechSynthesis event for voice loading
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    return (
      <div className="flex justify-center items-center m-5">
        <div className="row items-center">
          <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-center text-gray-900 md:text-5xl lg:text-6xl">
            Text To Speech
          </h1>
          <div className="col-12 text-center">
            <textarea
              rows="5"
              cols="40"
              value={text}
              className="p-4 w-full"
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text here"
            />
          </div>
          <div className="col-12 ">
            <div className="grid grid-cols-2 gap-2 justify-between px-3">
              <div className="col-6 text-left">
                <button
                  onClick={handleSpeak}
                  className="text-2xl text-black-900"
                >
                  <FontAwesomeIcon icon={faVolumeHigh} />
                </button>
              </div>
              <div className="col-6">
                <select
                  onChange={handleVoiceChange}
                  value={voice ? voice.name : ""}
                  className="w-full"
                >
                  {voices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  return <TextToSpeech />;
}
