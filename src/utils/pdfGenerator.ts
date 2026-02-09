/**
 * PDF Generation Utility for StartupOps
 * Generates downloadable PDFs for reports and documents
 */

export interface PDFContent {
  title: string;
  subtitle?: string;
  date: string;
  sections: Array<{
    heading: string;
    content: string | string[];
  }>;
  footer?: string;
}

export function generateAndDownloadPDF(content: PDFContent, filename: string) {
  // Create a simple HTML string for the PDF content
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${content.title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 900px;
          margin: 40px auto;
          padding: 20px;
        }
        h1 {
          color: #6366f1;
          border-bottom: 3px solid #6366f1;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
        .subtitle {
          color: #666;
          font-size: 16px;
          margin-bottom: 20px;
        }
        .date {
          color: #999;
          font-size: 14px;
          margin-bottom: 30px;
        }
        h2 {
          color: #333;
          font-size: 18px;
          margin-top: 25px;
          margin-bottom: 12px;
          border-left: 4px solid #6366f1;
          padding-left: 12px;
        }
        .content {
          margin-bottom: 20px;
          font-size: 14px;
        }
        .content ul {
          margin: 10px 0;
          padding-left: 30px;
        }
        .content li {
          margin: 8px 0;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          color: #666;
          font-size: 12px;
          text-align: center;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
        }
        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f5f5f5;
          font-weight: bold;
          color: #333;
        }
        .success {
          color: #10b981;
          font-weight: bold;
        }
        .warning {
          color: #f59e0b;
          font-weight: bold;
        }
        .break-page {
          page-break-after: always;
        }
      </style>
    </head>
    <body>
      <h1>${content.title}</h1>
      ${content.subtitle ? `<div class="subtitle">${content.subtitle}</div>` : ''}
      <div class="date">Generated on ${content.date}</div>
      
      ${content.sections
        .map(
          (section) => `
        <h2>${section.heading}</h2>
        <div class="content">
          ${
            Array.isArray(section.content)
              ? `<ul>${section.content.map((item) => `<li>${item}</li>`).join('')}</ul>`
              : section.content
          }
        </div>
      `
        )
        .join('')}
      
      ${
        content.footer
          ? `<div class="footer">${content.footer}</div>`
          : `<div class="footer">StartupOps Intelligence Platform - Confidential</div>`
      }
    </body>
    </html>
  `;

  // Create blob and download
  const blob = new Blob([htmlContent], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Specialized PDF generators
export function generateCapTablePDF() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return generateAndDownloadPDF(
    {
      title: 'Capitalization Table (Cap Table)',
      subtitle: 'TechVenture Inc. - Ownership & Equity Distribution',
      date: formattedDate,
      sections: [
        {
          heading: 'Executive Summary',
          content: [
            'Total Shares Outstanding: 10,000,000',
            'Post-Money Valuation: $12.0M',
            'Number of Shareholders: 24',
            'Latest Round: Seed Round - $3.5M',
          ],
        },
        {
          heading: 'Shareholder Breakdown',
          content: `
            <table>
              <tr>
                <th>Shareholder</th>
                <th>Shares</th>
                <th>Ownership %</th>
                <th>Notes</th>
              </tr>
              <tr>
                <td>Jane Doe (Founder & CEO)</td>
                <td>5,000,000</td>
                <td class="success">50.0%</td>
                <td>Common Stock</td>
              </tr>
              <tr>
                <td>Sequoia Capital</td>
                <td>2,000,000</td>
                <td>20.0%</td>
                <td>Series A Lead</td>
              </tr>
              <tr>
                <td>a16z (Andreessen Horowitz)</td>
                <td>1,200,000</td>
                <td>12.0%</td>
                <td>Series A</td>
              </tr>
              <tr>
                <td>Y Combinator</td>
                <td>600,000</td>
                <td>6.0%</td>
                <td>Pre-seed</td>
              </tr>
              <tr>
                <td>Angel Investors (15)</td>
                <td>1,200,000</td>
                <td>12.0%</td>
                <td>Diversified</td>
              </tr>
            </table>
          `,
        },
        {
          heading: 'Funding History',
          content: [
            'Pre-seed Round (Jan 2023): $500K @ $2M valuation',
            'Seed Round (Aug 2023): $3.5M @ $8M valuation',
            'Bridge Round (Mar 2024): $1.2M @ $10M valuation',
            'Current Valuation: $12.0M (Post-money)',
          ],
        },
        {
          heading: 'Key Metrics',
          content: [
            'Fully Diluted Ownership: Jane Doe 50%, VCs 40%, Employees/Angels 10%',
            'Employee Pool: 500,000 shares reserved',
            'Vesting Schedule: 4-year vesting with 1-year cliff',
            'Liquidation Preference: 1x non-participating preferred',
          ],
        },
      ],
      footer: 'This cap table is confidential and for authorized recipients only.',
    },
    'cap-table-techventure'
  );
}

export function generateAnalyticsReportPDF() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return generateAndDownloadPDF(
    {
      title: 'Analytics Report - Monthly Summary',
      subtitle: 'TechVenture Inc. | January 2026 Performance Review',
      date: formattedDate,
      sections: [
        {
          heading: 'Financial Performance',
          content: [
            'Monthly Revenue: $124K (↑18% MoM)',
            'Monthly Burn Rate: $165K',
            'Net Burn: $41K',
            'Cash Runway: 18 months',
          ],
        },
        {
          heading: 'User Metrics',
          content: [
            'Active Users: 1,520 (↑19% MoM)',
            'New Signups: 287 this month',
            'Churn Rate: 2.3% (Target: 3%)',
            'Net MRR Growth: +$18.5K',
          ],
        },
        {
          heading: 'Product Health',
          content: [
            'Feature Adoption Rate: 76%',
            'Daily Active Users: 892',
            'Weekly Retention: 68%',
            'NPS Score: 68 (Excellent)',
          ],
        },
        {
          heading: 'Key Insights',
          content: [
            'Customer acquisition cost trending up - consider content marketing shift',
            'Engineering team velocity 23% above benchmark',
            'Product-market fit confirmed with strong NPS',
            'Recommended focus: Optimize paid marketing channels',
          ],
        },
      ],
    },
    'analytics-report-jan2026'
  );
}

export function generateInvestorReportPDF() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return generateAndDownloadPDF(
    {
      title: 'Investor Report - Quarterly Update',
      subtitle: 'TechVenture Inc. | Q1 2026 Investor Update',
      date: formattedDate,
      sections: [
        {
          heading: 'Business Summary',
          content: [
            'Total Funding Raised: $12.0M',
            'Current Valuation: $12.0M (Post-money)',
            'Team Size: 24 employees',
            'Geographic Reach: 5 countries',
          ],
        },
        {
          heading: 'Financial Status',
          content: [
            'Cash Position: $3.8M',
            'Monthly Burn: $165K',
            'Runway: 18 months',
            'Path to Profitability: Q4 2026 (projected)',
          ],
        },
        {
          heading: 'Key Achievements',
          content: [
            'Product-market fit achieved (NPS 68)',
            '1,520 active users with 68% weekly retention',
            '$124K monthly recurring revenue',
            'Completed Series A investor outreach',
          ],
        },
        {
          heading: 'Next Steps & Milestones',
          content: [
            'Q2 2026: Close Series A round ($12M target)',
            'Q3 2026: Break-even on unit economics',
            'Q4 2026: Expand to 2 new markets',
            'H2 2026: Achieve $200K MRR milestone',
          ],
        },
      ],
      footer: 'This investor report contains forward-looking statements and is confidential.',
    },
    'investor-report-q1-2026'
  );
}
