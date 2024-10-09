'use client';

import { FC, Fragment, useEffect, useState } from 'react';
import { parseStringPromise } from 'xml2js';
import Table from './Table';

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

const parsedXmlToRows = (parsedXml: ParsedXml) =>
  parsedXml.Regions.Region.flatMap((region) =>
    region.Prefectures[0].Prefecture.map((prefecture) => [
      prefecture.Name[0],
      prefecture.KanaReading[0],
      prefecture.RomajiReading[0],
      +prefecture.Population[0],
      region.Name[0],
      region.KanaReading[0],
      region.RomajiReading[0],
    ]),
  );

const titles = [
  'Префектура',
  'Чтение (кана)',
  'Чтение (ромадзи)',
  'Население',
  'Окргуг',
  'Чтение (кана)',
  'Чтение (ромадзи)',
];

const PrefecturesTable: FC = () => {
  const [rows, setRows] = useState<(string | number)[][] | null>(null);

  useEffect(() => {
    fetch('/prefectures.xml')
      .then((response) => response.text())
      .then(parseStringPromise)
      .then(parsedXmlToRows)
      .then(setRows);
  }, []);

  if (!rows) return null;

  return <Table titles={titles} rows={rows} defaultSorting={{ column: 4, accending: true }} />;
};
export default PrefecturesTable;
