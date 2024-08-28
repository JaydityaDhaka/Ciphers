"use client"; // Ensure this runs on the client side

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import PlayfairGrid from '@/components/PlayfairGrid'; // Import the grid component

export default function Playfair() {
  "use client"; // Ensure this runs on the client side

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [passkey, setPasskey] = useState('old tavern');
  const [mode, setMode] = useState('encrypt');
  const [gridChars, setGridChars] = useState('abcdefghiklmnopqrstuvwxyz');
  const [playfairArray, setPlayfairArray] = useState<string[][]>([]); // Initialize as empty

  // Function to remove duplicate characters
  const removeDuplicateCharacters = (string: string) => {
    return string.split('').filter((item, pos, self) => self.indexOf(item) === pos).join('');
  };

  // Function to create the Playfair grid
  const createPlayfairGrid = (keyPhrase: string) => {
    let playfairArray: string[][] = [];
    let uniqueChars = removeDuplicateCharacters(keyPhrase);
    for (let i = 0; i < 25; i += 5) {
      playfairArray.push(uniqueChars.slice(i, i + 5).split(''));
    }
    return playfairArray;
  };

  // Effect to update the grid when passkey or gridChars change
  useEffect(() => {
    const updatedKey = prepareKey(passkey);
    setPlayfairArray(createPlayfairGrid(updatedKey));
  }, [passkey, gridChars]);

  // Function to clean the input string
  const stringCleaner = (string: string) => {
    return string.toLowerCase().replace(/[^a-z]/g, '').replace(/j/g, 'i');
  };

  // Function to prepare the key phrase
  const prepareKey = (keyPhrase: string) => {
    keyPhrase = stringCleaner(keyPhrase);
    keyPhrase += gridChars;
    return removeDuplicateCharacters(keyPhrase);
  };

  // Function to process the text
  const processText = (text: string, playfairArray: string[][], shift: number) => {
    let output = '';
    for (let i = 0; i < text.length; i += 2) {
      let digram = [text[i], text[i + 1]];
      let [newChar1, newChar2] = getNewCharacters(playfairArray, digram, shift);
      output += newChar1 + newChar2;
    }
    return output;
  };

  // Function to get the coordinates of a character in the grid
  const getCoord = (char: string, playfairArray: string[][]) => {
    for (let row = 0; row < playfairArray.length; row++) {
      let col = playfairArray[row].indexOf(char);
      if (col !== -1) return { row, col };
    }
    return null;
  };

  // Function to get new characters based on the grid and shift
  const getNewCharacters = (playfairArray: string[][], [char1, char2]: string[], shift: number) => {
    let coord1 = getCoord(char1, playfairArray);
    let coord2 = getCoord(char2, playfairArray);
    if (!coord1 || !coord2) return [char1, char2]; // handle edge cases
    if (coord1.row === coord2.row) {
      coord1.col = (coord1.col + shift + 5) % 5;
      coord2.col = (coord2.col + shift + 5) % 5;
    } else if (coord1.col === coord2.col) {
      coord1.row = (coord1.row + shift + 5) % 5;
      coord2.row = (coord2.row + shift + 5) % 5;
    } else {
      [coord1.col, coord2.col] = [coord2.col, coord1.col];
    }
    return [playfairArray[coord1.row][coord1.col], playfairArray[coord2.row][coord2.col]];
  };

  // Encryption function
  const encrypt = (plainText: string, keyPhrase: string) => {
    plainText = formatPlainText(plainText);
    keyPhrase = prepareKey(keyPhrase);
    const playfairArray = createPlayfairGrid(keyPhrase);
    return processText(plainText, playfairArray, 1);
  };

  // Decryption function
  const decrypt = (cipherText: string, keyPhrase: string) => {
    cipherText = stringCleaner(cipherText);
    keyPhrase = prepareKey(keyPhrase);
    const playfairArray = createPlayfairGrid(keyPhrase);
    return processText(cipherText, playfairArray, -1);
  };

  // Function to format the plain text
  const formatPlainText = (text: string) => {
    let formattedText = '';
    text = stringCleaner(text);
    for (let i = 0; i < text.length; i++) {
      formattedText += text[i];
      if (i < text.length - 1 && text[i] === text[i + 1]) {
        formattedText += 'x';
      }
    }
    if (formattedText.length % 2 !== 0) {
      formattedText += 'z';
    }
    return formattedText;
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMode(value);
    setInputText('');
    setOutputText('');
  };

  const handleSubmit = () => {
    const output = mode === 'encrypt' ? encrypt(inputText, passkey) : decrypt(inputText, passkey);
    setOutputText(output);
  };
  return (
    <Layout>
      {/* Title */}
      <div className="p-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center font-mono">
        <h1>Playfair Cipher</h1>
      </div>
      <div className="min-h-screen flex flex-col md:flex-row gap-3 font-mono">
        {/* Controls Box */}
        <div className="w-full md:w-1/3 px-4 pt-4 border rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Controls</h2>
          <form>
            {/* radio buttons */}
            <div className="flex space-x-4 mb-4">
              <div>
                <input
                  type="radio"
                  name="mode"
                  id="encrypt"
                  value="encrypt"
                  checked={mode === 'encrypt'}
                  onChange={handleRadioChange}
                  className="text-black"
                />
                <label htmlFor="encrypt">Encrypt</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="mode"
                  id="decrypt"
                  value="decrypt"
                  checked={mode === 'decrypt'}
                  onChange={handleRadioChange}
                  className="text-black"
                />
                <label htmlFor="decrypt">Decrypt</label>
              </div>
            </div>
            {/* Pass key */}
            <div className="mb-4">
              <label htmlFor="passkey" className="block text-sm font-medium text-white">Passkey:</label>
              <input
                type="text"
                id="passkey"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="text-black w-full border rounded p-2"
              />
            </div>
            {/* Alphabets key */}
            {/* <div className="mb-4">
              <label htmlFor="alphabet-input" className="block text-sm font-medium text-white">ALPHABET:</label>
              <input
                type="text"
                name="alphabet"
                id="alphabet-input"
                className="text-black w-full border rounded p-2"
                value={gridChars}
                onChange={(e) => setGridChars(e.target.value)}
              />
            </div> */}
            <div className="text-center">
              <button
                type="button"
                name="submit"
                id="submit"
                value="Submit"
                className="mt-4 p-2 bg-blue-500 text-white rounded w-full md:w-auto"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Input and Output Boxes */}
        <div className="w-full md:w-1/3 px-4 pt-4 border rounded-lg shadow-lg">
          {/* Input Box */}
          <div className="mb-4">
            <div className="p-4">
              <h2 id="heading-input" className="text-2xl font-semibold mb-2">{mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'}</h2>
              <textarea
                placeholder={mode === 'encrypt' ? 'Enter plaintext' : 'Enter ciphertext'}
                rows={6}
                id="input-text"
                className="w-full p-4 border rounded-lg text-black shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              ></textarea>
              <p id="status" className="mt-2 text-sm text-gray-600"></p>
            </div>
          </div>
          {/* Output Box */}
          <div className="p-4 ">
            <h2 id="heading-output" className="text-2xl font-semibold mb-2">{mode === 'encrypt' ? 'Ciphertext' : 'Plaintext'}</h2>
            <textarea
              readOnly
              id="output-text"
              value={outputText}
              rows={6}
              className="w-full p-2 border rounded text-black bg-gray-100"
              placeholder="Output will be shown here..."
            ></textarea>
          </div>
        </div>

        {/* Grid Display */}
        <div className="w-full md:w-1/3 px-4 pt-4 border rounded-lg shadow-lg">
          <PlayfairGrid grid={playfairArray} />
        </div>
      </div>
    </Layout>
  );
}
