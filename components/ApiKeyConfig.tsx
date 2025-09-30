
import React, { useState, useEffect } from 'react';

const API_KEY_STORAGE_KEY = 'gemini_api_key';

export const getStoredApiKey = (): string | null => {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
};

export const setStoredApiKey = (apiKey: string): void => {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
};

export const clearStoredApiKey = (): void => {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
};

interface ApiKeyConfigProps {
  onApiKeySet: (hasKey: boolean) => void;
}

export const ApiKeyConfig: React.FC<ApiKeyConfigProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [showInput, setShowInput] = useState<boolean>(false);
  const [hasStoredKey, setHasStoredKey] = useState<boolean>(false);

  useEffect(() => {
    const storedKey = getStoredApiKey();
    setHasStoredKey(!!storedKey);
    onApiKeySet(!!storedKey);
  }, [onApiKeySet]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      setStoredApiKey(apiKey.trim());
      setHasStoredKey(true);
      setShowInput(false);
      setApiKey('');
      onApiKeySet(true);
    }
  };

  const handleRemoveApiKey = () => {
    clearStoredApiKey();
    setHasStoredKey(false);
    setShowInput(false);
    setApiKey('');
    onApiKeySet(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveApiKey();
    }
  };

  if (hasStoredKey && !showInput) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-green-400 text-sm">✓ API Key configured</span>
        <button
          onClick={() => setShowInput(true)}
          className="text-indigo-400 hover:text-indigo-300 text-sm underline"
        >
          Update
        </button>
        <button
          onClick={handleRemoveApiKey}
          className="text-red-400 hover:text-red-300 text-sm underline"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your Gemini API key"
          className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-indigo-500 focus:outline-none flex-1 text-sm"
        />
        <button
          onClick={handleSaveApiKey}
          disabled={!apiKey.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm"
        >
          Save
        </button>
        {hasStoredKey && (
          <button
            onClick={() => {
              setShowInput(false);
              setApiKey('');
            }}
            className="text-gray-400 hover:text-gray-300 px-2 py-2 text-sm"
          >
            Cancel
          </button>
        )}
      </div>
      <p className="text-xs text-gray-400">
        Your API key is stored locally in your browser and never sent to any server except Google's Gemini API.
        {' '}
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 underline"
        >
          Get API key
        </a>
      </p>
    </div>
  );
};
