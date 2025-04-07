javascriptCopy// frontend/src/components/WorkLog.js
import React from 'react';
import './WorkLog.css';

function WorkLog({ logs, memberName }) {
  // Sorter loggene etter dato (nyeste først)
  const sortedLogs = logs ? [...logs].sort((a, b) => {
    const dateA = new Date(a._createdAt || a.date);
    const dateB = new Date(b._createdAt || b.date);
    return dateB - dateA;
  }) : [];

  return (
    <div className="work-log">
      <h2>{memberName ? `${memberName}s arbeidslogg` : 'Arbeidslogg'}</h2>
      <table>
        <thead>
          <tr>
            <th>Dato</th>
            {!memberName && <th>Navn</th>}
            <th>Oppgave</th>
            <th>Timer</th>
          </tr>
        </thead>
        <tbody>
          {sortedLogs.map((log, index) => {
            const date = new Date(log._createdAt || log.date);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            
            return (
              <tr key={index}>
                <td>{formattedDate}</td>
                {!memberName && <td>{log.memberName}</td>}
                <td>{log.description}</td>
                <td>{log.hours} timer</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}