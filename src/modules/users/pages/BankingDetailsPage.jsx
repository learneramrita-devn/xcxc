import { useState, useEffect } from 'react';
import { useAuth } from '../../../app/providers/AuthContext';
import Toast from '../../../shared/components/Toast';
import { getProfileApi, updateAdditionalInfoApi } from '../api/userApi';
import './_profilePage.scss';

export default function BankingDetailsPage() {
  const { user } = useAuth();
  const userId = user?.userId;
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [bankForm, setBankForm] = useState({ accountName: '', accountNumber: '', ifscCode: '', bankName: '', branch: '' });

  useEffect(() => {
    if (!userId) return;
    getProfileApi(userId).then((res) => {
      const u = res?.userList?.[0] || res;
      if (!u) return;
      setBankForm({
        accountName: u.userAdditionalInfo?.bal?.[0]?.ahn || '',
        accountNumber: u.userAdditionalInfo?.bal?.[0]?.accNo || '',
        ifscCode: u.userAdditionalInfo?.bal?.[0]?.ifsc || '',
        bankName: u.userAdditionalInfo?.bal?.[0]?.bn || '',
        branch: u.userAdditionalInfo?.bal?.[0]?.cmts || '',
      });
    }).catch(() => {});
  }, [userId]);

  const showToast = (message, type) => setToast({ message, type });

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateAdditionalInfoApi(userId, { bal: [{ ...bankForm }] });
      showToast('Saved successfully!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to save.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="profile-page-wrapper">
        <section className="profile-content">
          <div className="profile-content__header">
            <h2>Banking Details</h2>
            <p>Manage your bank account information</p>
          </div>

          <form onSubmit={handleSave}>
            <div className="profile-form-card">
              <h3 className="profile-form-card__title">Banking Details</h3>
              <div className="profile-form-grid">
                <div className="profile-form-group">
                  <label>Account Holder Name</label>
                  <input type="text" value={bankForm.accountName} onChange={(e) => setBankForm(p => ({ ...p, accountName: e.target.value }))} placeholder="Enter account holder name" />
                </div>
                <div className="profile-form-group">
                  <label>Account Number</label>
                  <input type="text" value={bankForm.accountNumber} onChange={(e) => setBankForm(p => ({ ...p, accountNumber: e.target.value }))} placeholder="Enter account number" />
                </div>
                <div className="profile-form-group">
                  <label>IFSC Code</label>
                  <input type="text" value={bankForm.ifscCode} onChange={(e) => setBankForm(p => ({ ...p, ifscCode: e.target.value }))} placeholder="Enter IFSC code" />
                </div>
                <div className="profile-form-group">
                  <label>Bank Name</label>
                  <input type="text" value={bankForm.bankName} onChange={(e) => setBankForm(p => ({ ...p, bankName: e.target.value }))} placeholder="Enter bank name" />
                </div>
                <div className="profile-form-group full-width">
                  <label>Branch</label>
                  <input type="text" value={bankForm.branch} onChange={(e) => setBankForm(p => ({ ...p, branch: e.target.value }))} placeholder="Enter branch name" />
                </div>
              </div>
            </div>

            <div className="profile-form-actions">
              <button type="button" className="cancel-btn">Cancel</button>
              <button type="submit" className="save-btn" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
