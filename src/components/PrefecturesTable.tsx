'use client';

import { FC, Fragment, useEffect, useState } from 'react';
import { parseStringPromise } from 'xml2js';
import Table from './Table';
import LinkButton from './LinkButton';

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

  return (
    <Table
      titles={titles}
      rows={rows}
      defaultSorting={{ column: 4, accending: true }}
      rightSection={
        <LinkButton
          href="/prefectures.xml"
          inNewTab
          className="border-slate-400 hover:bg-slate-300"
        >
          Открыть в формате XML
        </LinkButton>
      }
    />
  );
};
export default PrefecturesTable;
