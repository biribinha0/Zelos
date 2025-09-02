"use client";

export default function Table({ data, columns, title }) {
  return (
    <div className="mt-4">
      {title && <h4 className="mb-3">{title}</h4>}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            {columns.map(col => <th key={col.key}>{col.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr className="text-capitalize" key={i}>
              {columns.map(col => <td key={col.key}>{row[col.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
