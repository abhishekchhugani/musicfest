import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import sampleData from './sampleData.json'

const MusicFestivals = () => {
  const [festivalsData, setFestivalsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const result = await axios.get('https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals');
      // setFestivalsData(result.data);
      setFestivalsData(sampleData);      
    };
    fetchData();
  }, []);

  // Helper function to sort bands and record labels alphabetically
  const sortBands = (a, b) => a.name.localeCompare(b.name);
  const sortLabels = (a, b) => a.recordLabel.localeCompare(b.recordLabel);

  // Create a map of record label to bands
  const labelToBandsMap = festivalsData.reduce((acc, festival) => {
    festival.bands.forEach(band => {
      if (!acc[band.recordLabel]) {
        acc[band.recordLabel] = [];
      }
      acc[band.recordLabel].push(band);
    });
    return acc;
  }, {});

  // Get unique record labels
  const uniqueLabels = Object.keys(labelToBandsMap).sort();

  return (
    <ul>
      {uniqueLabels.map(label => (
        <li key={label}>
          {label || "\"\""}
          <ul>
            {labelToBandsMap[label].sort(sortBands).map(band => (
              <li key={band.name}>
                {band.name}
                <ul>
                  {festivalsData
                    .filter(festival =>
                      festival.bands.some(b => b.name === band.name)
                    )
                    // .sort(sortLabels)
                    .map(festival => (
                      <li key={festival.name}>{festival.name}</li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default MusicFestivals;
