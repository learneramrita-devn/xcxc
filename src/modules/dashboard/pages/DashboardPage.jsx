import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../app/providers/AuthContext';
import SEOMeta from '../../../shared/components/SEOMeta';
import './_dashboardPage.scss';

export default function DashboardPage() {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(false);
  const [balance] = useState(50000);

  const recentUpdates = [
    { id: 1, title: 'New Flight Routes Added', date: '2024-01-15', type: 'info' },
    { id: 2, title: 'System Maintenance Scheduled', date: '2024-01-14', type: 'warning' },
    { id: 3, title: 'Commission Structure Updated', date: '2024-01-13', type: 'success' },
  ];

  const shortcuts = [
    { label: 'My Bookings', path: '/my-bookings', icon: '📋' },
    { label: 'Ledger', path: '/ledger', icon: '📊' },
    { label: 'Invoices', path: '/invoices', icon: '🧾' },
    { label: 'Reports', path: '/reports', icon: '📈' },
    { label: 'Check-In', path: '/check-in', icon: '✅' },
    { label: 'Pax Calendar', path: '/pax-calendar', icon: '📅' },
  ];

  const commissionData = [
    { product: 'Flights', sale: 150000, commission: 4500, refund: 5000, refundCommission: -150, total: 4350 },
    { product: 'Hotels', sale: 80000, commission: 3200, refund: 2000, refundCommission: -80, total: 3120 },
    { product: 'Bus', sale: 25000, commission: 750, refund: 1000, refundCommission: -30, total: 720 },
    { product: 'Train', sale: 40000, commission: 1200, refund: 0, refundCommission: 0, total: 1200 },
  ];

  const miniStatement = [
    { refNo: 'TXN001', product: 'Flight', desc: 'DEL-BOM', dateTime: '2024-01-15 10:30', amount: -15000, type: 'Debit', closing: 35000 },
    { refNo: 'TXN002', product: 'Deposit', desc: 'Bank Transfer', dateTime: '2024-01-14 14:20', amount: 50000, type: 'Credit', closing: 50000 },
    { refNo: 'TXN003', product: 'Hotel', desc: 'Mumbai Booking', dateTime: '2024-01-13 09:15', amount: -8000, type: 'Debit', closing: 0 },
  ];

  return (
    <>
      <SEOMeta title="Dashboard – TravelApp" description="Manage your travel business dashboard" />
      <div className="dashboard-page">
        <div className="dashboard-header">
          <h1>Welcome, {user?.name || 'User'}!</h1>
          <p>Manage your travel business from here</p>
        </div>

        <div className="dashboard-grid">
          {/* Account Balance */}
          <div className="dashboard-card balance-card">
            <div className="card-header">
              <h3>Account Balance</h3>
              <button className="eye-btn" onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <div className="balance-amount">
              {showBalance ? `₹${balance.toLocaleString('en-IN')}` : '₹ ••••••'}
            </div>
            <div className="balance-actions">
              <Link to="/view-statement" className="btn-link">View Statement</Link>
              <Link to="/add-money" className="btn-primary-small">Add Money</Link>
            </div>
          </div>

          {/* Recent Updates */}
          <div className="dashboard-card updates-card">
            <h3>Recently Operational Updates</h3>
            <div className="updates-list">
              {recentUpdates.map((update) => (
                <div key={update.id} className={`update-item ${update.type}`}>
                  <span className="update-title">{update.title}</span>
                  <span className="update-date">{update.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Report */}
          <div className="dashboard-card sales-card">
            <h3>Sales Report</h3>
            <div className="sales-stats">
              <div className="stat-item">
                <span className="stat-label">Total Sales</span>
                <span className="stat-value">₹2,95,000</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Commission</span>
                <span className="stat-value">₹9,650</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Bookings</span>
                <span className="stat-value">47</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shortcuts */}
        <div className="dashboard-section">
          <h2>Shortcuts</h2>
          <div className="shortcuts-grid">
            {shortcuts.map((shortcut) => (
              <Link key={shortcut.path} to={shortcut.path} className="shortcut-card">
                <span className="shortcut-icon">{shortcut.icon}</span>
                <span className="shortcut-label">{shortcut.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Commission Sale Report */}
        <div className="dashboard-section">
          <h2>Commission Sale Report</h2>
          <div className="table-responsive">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Sale</th>
                  <th>Net Commission incl. TDS</th>
                  <th>Refund</th>
                  <th>Net Commission incl. TDS</th>
                  <th>Total (Sale − Refund)</th>
                </tr>
              </thead>
              <tbody>
                {commissionData.map((row) => (
                  <tr key={row.product}>
                    <td>{row.product}</td>
                    <td>₹{row.sale.toLocaleString('en-IN')}</td>
                    <td className="positive">₹{row.commission.toLocaleString('en-IN')}</td>
                    <td>₹{row.refund.toLocaleString('en-IN')}</td>
                    <td className={row.refundCommission < 0 ? 'negative' : ''}>
                      ₹{row.refundCommission.toLocaleString('en-IN')}
                    </td>
                    <td className="total">₹{row.total.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mini Statement */}
        <div className="dashboard-section">
          <h2>Mini Statement</h2>
          <div className="table-responsive">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Ref. No</th>
                  <th>Product</th>
                  <th>Description</th>
                  <th>Date & Time</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Closing Balance</th>
                </tr>
              </thead>
              <tbody>
                {miniStatement.map((row) => (
                  <tr key={row.refNo}>
                    <td>{row.refNo}</td>
                    <td>{row.product}</td>
                    <td>{row.desc}</td>
                    <td>{row.dateTime}</td>
                    <td className={row.amount < 0 ? 'negative' : 'positive'}>
                      ₹{Math.abs(row.amount).toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span className={`badge ${row.type.toLowerCase()}`}>{row.type}</span>
                    </td>
                    <td>₹{row.closing.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
