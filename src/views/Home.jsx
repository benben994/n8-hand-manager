import { useState } from 'react';

import pokerHandsParser from 'utils/pokerHandsParser';

export default function Home() {
  const [uploadFiles, setUploadFiles] = useState([]);

  const uploadFileHandler = (event) => {
    let { files } = event.target;
    files = [...files];
    if (files.length) {
      setUploadFiles(files);
      Promise.all(files.map((file) => readFile(file)));
    }
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      parseHands(event.target.result);
    };
    reader.readAsText(file);
  };

  const parseHands = (text) => {
    const parser = new pokerHandsParser(text);
    console.log(parser.platform, parser.handCount);
  };

  function UploadFileList() {
    if (!uploadFiles.length) {
      return (
        <div className="flex items-center justify-center rounded-md border border-orange p-8">
          <label className="block cursor-pointer">
            <input type="file" accept=".txt" multiple onChange={uploadFileHandler} className="block file:mr-4 file:rounded-full file:border-0 file:bg-orange file:py-2 file:px-4 file:text-white" />
          </label>
        </div>
      );
    }

    return (
      <div className="rounded-md border border-orange p-8">
        <ul>
          {uploadFiles.map((file) => (
            <li className="my-2" key={file.name}>
              {file.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <UploadFileList />
    </div>
  );
}
