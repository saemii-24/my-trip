import React from 'react';
//
function decodeHTMLEntities(str: string) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

export default function parseSentenceToJSX(text: string): JSX.Element[] {
  const decoded = decodeHTMLEntities(text);
  const cleaned = decoded
    .replace(/[\uFEFF]/g, '')
    .replace(/(\r\n|\n|\r){2,}/g, '\n')
    .replace(/(\r\n|\n|\r)/g, '');

  const blocks = cleaned
    .replace(/(?:\s)*(?=○|□|ㅇ)/g, '\n\n$&')
    .replace(/(?:\s)*(?=①|②|③|④|⑤|⑥|⑦|⑧|⑨|⑩|- |\* |※)/g, '\n$&')
    .split(/\n{1,2}/g);

  const result: JSX.Element[] = [];

  blocks.forEach((block, blockIndex) => {
    if (!block.trim()) return;

    const elements = block
      .split(/(https?:\/\/[^\s\)\]]+|www\.[^\s\)\]]+)/g)
      .map((part, i) => {
        if (/^(https?:\/\/|www\.)/.test(part)) {
          const href = part.startsWith('http') ? part : `https://${part}`;
          return (
            <a
              key={`link-${blockIndex}-${i}`}
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              className='text-green-500 underline items-center gap-1'
            >
              {part}
            </a>
          );
        } else {
          return <React.Fragment key={`text-${blockIndex}-${i}`}>{part}</React.Fragment>;
        }
      });

    result.push(
      <div key={`block-${blockIndex}`} className='mb-2 leading-relaxed text-lg'>
        {elements}
      </div>,
    );
  });

  return result;
}
