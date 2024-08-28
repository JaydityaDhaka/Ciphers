"use client"; // This is important for client-side rendering

import React, { useEffect } from 'react';
import Layout from '@/components/layout';

export default function caesar() {

    useEffect(() => {
      const form = document.getElementById("controls") as HTMLFormElement;
      const hInput = document.querySelector("#heading-input") as HTMLHeadingElement;
      const hOutput = document.querySelector("#heading-output") as HTMLHeadingElement;
      const selectEncodeOrDecode = document.getElementsByName("code") as NodeListOf<HTMLInputElement>;
      const inputText = document.getElementById("input-text") as HTMLTextAreaElement;
      const outputText = document.getElementById("output-text") as HTMLTextAreaElement;
      const shiftKey = document.getElementById("shift-input") as HTMLInputElement;
      const modulo = document.getElementById("mod-input") as HTMLInputElement;
      const alphabet = document.getElementById("alphabet-input") as HTMLInputElement;
      const letterCase = document.getElementById("letter-case") as HTMLSelectElement;
      const foreignChars = document.getElementById("foreign-chars") as HTMLSelectElement;

      const handleRadioChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.value === "encode") {
          hInput.textContent = "Plaintext";
          hOutput.textContent = "Ciphertext";
        } else if (target.value === "decode") {
          hInput.textContent = "Ciphertext";
          hOutput.textContent = "Plaintext";
        }
        inputText.value = "";
        outputText.textContent = "";
      };

      const removeForeignChars = (input: string) => {
        const regex = /[^a-zA-Z0-9 ]/g;
        return input.replace(regex, "");
      };

      const caesarCipher = (decode: string, text: string, shift: number, mod: number, charset: string, foreignChars: string) => {
        if (decode === "decode") shift = -shift;
        if (foreignChars === "1") text = removeForeignChars(text);
        charset = charset.toLowerCase();
        let result = "";
        for (let i = 0; i < text.length; i++) {
          let char = text.charAt(i);
          const index = charset.indexOf(char.toLowerCase());
          if (index !== -1) {
            let newIndex = (index + shift) % mod;
            if (newIndex < 0) newIndex += mod;
            char = char === char.toLowerCase() ? charset[newIndex] : charset[newIndex].toUpperCase();
          }
          result += char;
        }
        return result;
      };


      const handleSubmit = (event: Event) => {
        event.preventDefault();
        const selectedOption = Array.from(selectEncodeOrDecode).find((option) => (option as HTMLInputElement).checked) as HTMLInputElement;
        const shiftValue = parseInt(shiftKey.value);
        const moduloValue = parseInt(modulo.value);
        const alphabetValue = alphabet.value;
        const letterCaseValue = letterCase.value;
        const foreignCharsValue = foreignChars.value;

        let cipherOutput = caesarCipher(selectedOption.value, inputText.value, shiftValue, moduloValue, alphabetValue, foreignCharsValue);

        if (letterCaseValue === "2") {
          cipherOutput = cipherOutput.toLowerCase();
        } else if (letterCaseValue === "3") {
          cipherOutput = cipherOutput.toUpperCase();
        }

        outputText.textContent = cipherOutput;
      };

      selectEncodeOrDecode.forEach((option) => {
        option.addEventListener("click", handleRadioChange);
      });

      form.addEventListener("submit", handleSubmit);

      return () => {
        form.removeEventListener("submit", handleSubmit);
        selectEncodeOrDecode.forEach((option) => {
          option.removeEventListener("click", handleRadioChange);
        });
      };
    }, []);

  return (
    <Layout>
      <div className="min-h-screen flex flex-col font-mono">
        {/* Title */}
        <div className="p-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
          <h1>Caesar Cipher</h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* Controls Box */}
          <div id="controls" className="w-full md:w-1/3 px-4 pt-4 border rounded-lg shadow-lg">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-center">Controls</h2>
            </div>
            <form>
              <div className="flex space-x-4 mb-4">
                <div>
                  <input
                    type="radio"
                    name="code"
                    id="encode"
                    className="text-black"
                    value="encode"
                    defaultChecked
                  />
                  <label htmlFor="encode">Encode</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="code"
                    id="decode"
                    className="text-black"
                    value="decode"
                  />
                  <label htmlFor="decode">Decode</label>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                <div className="mb-2 md:mb-0">
                  <label htmlFor="shift-input" className="block text-sm font-medium text-white">
                    Shift Key:
                  </label>
                  <input
                    type="text"
                    name="shift"
                    id="shift-input"
                    className="text-black w-full md:w-20 border rounded p-2"
                    maxLength={4}
                    size={4}
                    defaultValue="3"
                  />
                </div>
                <div>
                  <label htmlFor="mod-input" className="block text-sm font-medium text-white">
                    Modulo:
                  </label>
                  <input
                    type="text"
                    name="mod"
                    id="mod-input"
                    className="text-black w-full md:w-20 border rounded p-2"
                    maxLength={4}
                    size={4}
                    defaultValue="26"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="alphabet-input" className="block text-sm font-medium text-white">
                  ALPHABET:
                </label>
                <input
                  type="text"
                  name="alphabet"
                  id="alphabet-input"
                  className="text-black w-full border rounded p-2"
                  defaultValue="abcdefghijklmnopqrstuvwxyz"
                />
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                <div className="mb-2 md:mb-0">
                  <label htmlFor="letter-case" className="block text-sm font-medium text-white">
                    LETTER CASE:
                  </label>
                  <select name="letter-case" id="letter-case" className="text-black w-full border rounded p-2">
                    <option value="1">Maintain Case</option>
                    <option value="2">Lower Case</option>
                    <option value="3">Upper Case</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="foreign-chars" className="block text-sm font-medium text-white">
                    FOREIGN CHARS:
                  </label>
                  <select name="foreign-chars" id="foreign-chars" className="text-black w-full border rounded p-2">
                    <option value="1">Remove</option>
                    <option value="2">Ignore</option>
                  </select>
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  name="submit"
                  id="submit"
                  value="Submit"
                  className="mt-4 p-2 bg-blue-500 text-white rounded w-full md:w-auto"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Input and Output Boxes */}
          <div className="w-full md:w-2/3 space-y-4">
            <div className="p-4 border rounded-lg shadow-lg">
              <div>
                <h2 id="heading-input" className="text-2xl font-semibold mb-2">Plaintext</h2>
              </div>
              <textarea
                placeholder="Enter plaintext"
                rows={10}
                id="input-text"
                className="w-full p-4 border rounded-lg text-black shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <p id="status" className="mt-2 text-sm text-gray-600"></p>
            </div>
            <div className="p-4 border rounded-lg shadow-lg">
              <div>
                <h2 id="heading-output" className="text-2xl font-semibold mb-2">Ciphertext</h2>
              </div>
              <textarea
                readOnly
                placeholder="Output"
                rows={10}
                id="output-text"
                className="w-full p-4 border rounded-lg text-black shadow-inner bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
