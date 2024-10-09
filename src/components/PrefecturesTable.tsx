'use client';

import { FC, Fragment, useEffect, useState } from 'react';
import { parseStringPromise } from 'xml2js';

interface ParsedXml {
  Regions: {
    Region: {
      Name: [string];
      KanaReading: [string];
      RomajiReading: [string];
      Prefectures: [
        {
          Prefecture: {
            Name: [string];
            KanaReading: [string];
            RomajiReading: [string];
            Population: [string];
          }[];
        },
      ];
    }[];
  };
}

interface Region {
  name: string;
  kanaReading: string;
  romajiReading: string;
}

interface Prefecture {
  name: string;
  kanaReading: string;
  romajiReading: string;
  population: string;
  region: Region;
}

const getPrefecturesFromParsedXml = (parsedXml: ParsedXml): Prefecture[] =>
  parsedXml.Regions.Region.flatMap((region) =>
    region.Prefectures[0].Prefecture.map((prefecture) => ({
      name: prefecture.Name[0],
      kanaReading: prefecture.KanaReading[0],
      romajiReading: prefecture.RomajiReading[0],
      population: prefecture.Population[0],
      region: {
        name: region.Name[0],
        kanaReading: region.KanaReading[0],
        romajiReading: region.RomajiReading[0],
      },
    })),
  );

const PrefecturesTable: FC = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[] | null>(null);

  useEffect(() => {
    fetch('/prefectures.xml')
      .then((response) => response.text())
      .then(parseStringPromise)
      .then(getPrefecturesFromParsedXml)
      .then(setPrefectures);
  }, []);

  if (!prefectures) return null;

  return (
    <table className="border-2 border-slate-400 [&_:is(td,th)]:border [&_:is(td,th)]:border-slate-400 [&_:is(td,th)]:px-2 [&_:is(td,th)]:py-1 [&_:is(td,th)]:text-center [&_:is(td,th)]:align-top [&_th]:text-slate-600">
      <thead className="border-b-2 border-slate-400 bg-slate-300">
        <tr>
          <th>Префектура</th>
          <th>Чтение (кана)</th>
          <th>Чтение (ромадзи)</th>
          <th>Население</th>
          <th className="!border-l-2">Окргуг</th>
          <th>Чтение (кана)</th>
          <th>Чтение (ромадзи)</th>
        </tr>
      </thead>
      <tbody>
        {prefectures.map((prefecture, index) => (
          <tr key={index}>
            <th>{prefecture.name}</th>
            <td>{prefecture.kanaReading}</td>
            <td>{prefecture.romajiReading}</td>
            <td>{prefecture.population}</td>
            <th className="!border-l-2">{prefecture.region.name}</th>
            <td>{prefecture.region.kanaReading}</td>
            <td>{prefecture.region.romajiReading}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default PrefecturesTable;
