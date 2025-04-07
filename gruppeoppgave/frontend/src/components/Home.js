javascriptCopy// frontend/src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { client } from '../sanityClient';
import MemberCard from '../components/MemberCard';
import WorkLog from '../components/WorkLog';
import './Home.css';

function Home() {
  const [members, setMembers] = useState([]);
  const [allLogs, setAllLogs] = useState([]);

  useEffect(() => {
    // Hent gruppemedlemmer
    client
      .fetch(`*[_type == "member"] {
        _id,
        firstName,
        lastName,
        email,
        image
      }`)
      .then((data) => {
        setMembers(data);
      })
      .catch(console.error);

    // Hent alle loggføringer
    client
      .fetch(`*[_type == "member"] {
        firstName,
        "logs": logs[] {
          description,
          date,
          hours,
          _createdAt
        }
      }`)
      .then((data) => {
        // Kombiner alle loggene fra alle medlemmer
        const logs = [];
        data.forEach(member => {
          if (member.logs) {
            member.logs.forEach(log => {
              logs.push({
                ...log,
                memberName: member.firstName
              });
            });
          }
        });
        
        setAllLogs(logs);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="home">
      <h1>Gruppemedlemmer</h1>
      <div className="member-grid">
        {members.map(member => (
          <MemberCard key={member._id} member={member} />
        ))}
      </div>
      
      <WorkLog logs={allLogs} />
    </div>
  );
}

