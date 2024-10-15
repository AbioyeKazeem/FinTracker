import React from "react";
import { spendingAnalyze } from "../utils/utils";

function FinancialTips({ tips = [] }) {
  return (
    <div className="financial-tips-container">
      <h5>Financial Tips</h5>
      <ul>
        {tips.length > 0 ? (
          tips.map((tip, index) => (
            <li key={index} className="financial-tip">{tip}</li>
          ))
        ) : (
          <li>No tips available at the moment.</li>
        )}
      </ul>
    </div>
  );
}

export default FinancialTips;
