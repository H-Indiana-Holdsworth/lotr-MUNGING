import React from 'react';

export default function CharacterList({ characters }) {
  return (
    <section className="characters">
      {characters.map((char) => (
        <div className="character" key={char[0]}>
          <a href={char.wikiUrl}>{char[0]}</a>
          <p>{char[1]}</p>
        </div>
      ))}
    </section>
  );
}
