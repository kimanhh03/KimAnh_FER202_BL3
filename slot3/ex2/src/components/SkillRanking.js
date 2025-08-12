import React, { useMemo } from 'react';

const SkillRanking = ({ persons }) => {
  const skillRanking = useMemo(() => {
    return persons.reduce((acc, person) => {
      person.skills.forEach(skill => {
        acc[skill] = (acc[skill] || 0) + 1;
      });
      return acc;
    }, {});
  }, [persons]);

  const skillRankingArray = useMemo(() => {
    return Object.entries(skillRanking)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count);
  }, [skillRanking]);

  return (
    <div className="card">
      <div className="card-header">
        <h4>Skill Ranking</h4>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Skill</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {skillRankingArray.map(({skill, count}, index) => (
              <tr key={skill} className={index === 0 ? 'table-warning' : ''}>
                <td>{skill}</td>
                <td className={index === 0 ? 'fw-bold' : ''}>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkillRanking;