import { useState, useEffect } from 'react';
import { useAuth } from '../../../app/providers/AuthContext';
import Toast from '../../../shared/components/Toast';
import { getSubUsersApi, createSubUserApi, updateSubUserApi, deleteSubUserApi } from '../api/subUserApi';
import { sendVerificationEmailApi } from '../api/verificationApi';
import editIcon from '../../../assets/images/edit-icon.svg';
import deleteIcon from '../../../assets/images/delete-icon.svg';
import './_subUsersPage.scss';

export default function SubUsersPage() {
  const { user } = useAuth();
  const tenantId = user?.tenantId;
  
  const [subUsers, setSubUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const [formData, setFormData] = useState({
    title: 'Mr',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    userType: 'RETAILER',
  });

  useEffect(() => {
    if (tenantId) {
      fetchSubUsers();
    }
  }, [tenantId]);

  useEffect(() => {
    if (searchEmail.trim() === '') {
      setFilteredUsers(subUsers);
    } else {
      const filtered = subUsers.filter(user => 
        user.email?.toLowerCase().includes(searchEmail.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchEmail, subUsers]);

  const fetchSubUsers = async () => {
    setLoading(true);
    try {
      const response = await getSubUsersApi(tenantId);
      console.log('=== SUB USERS API RESPONSE ===');
      console.log('Full Response:', response);
      const users = response?.userList || [];
      console.log('Users Array:', users);
      setSubUsers(users);
      setFilteredUsers(users);
    } catch (err) {
      console.error('Sub Users API Error:', err);
      console.error('Error Details:', err.response || err.message);
      setSubUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type) => setToast({ message, type });

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        title: user.title || 'Mr',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        mobileNumber: user.mobileNumber || '',
        email: user.email || '',
        userType: user.userType || 'RETAILER',
      });
    } else {
      setEditingUser(null);
      setFormData({
        title: 'Mr',
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        userType: 'RETAILER',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({
      title: 'Mr',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      userType: 'RETAILER',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName) {
      showToast('First name and last name are required', 'error');
      return;
    }
    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      showToast('Valid 10-digit mobile number is required', 'error');
      return;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      showToast('Valid email is required', 'error');
      return;
    }

    setLoading(true);
    try {
      if (editingUser) {
        // Update existing user
        const updatePayload = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          name: `${formData.title} ${formData.firstName} ${formData.lastName}`,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
          userType: formData.userType,
        };
        await updateSubUserApi(editingUser.userId, updatePayload);
        showToast('Sub user updated successfully!', 'success');
      } else {
        // Create new user using /ums/v1/users/register
        const fullName = `${formData.firstName} ${formData.lastName}`.trim();
        const registerPayload = {
          tenant: { tenantId },
          externalUserId: `SUB-USR-${Date.now()}`,
          role: 'AGENT',
          name: fullName,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          mobileNumber: formData.mobileNumber,
          passwordHash: `Temp@${formData.mobileNumber.slice(-4)}`, // Temporary password
          agentType: 'AGENCY',
          status: 'DISABLED',
          userSource: 'WEB',
          userAdditionalInfo: {
            rc: '',
            rfb: 'TENANT',
            grade: formData.userType === 'DISTRIBUTOR' ? 'B' : 'C',
            ft: 'PRIVATE',
            bal: [{
              bn: '',
              accNo: '',
              ifsc: '',
              cmts: '',
              ahn: fullName.toUpperCase(),
              vl: 'PRIMARY',
              bt: 'SAVINGS'
            }],
            ael: [],
            cncd: 'IN',
            curr: 'INR'
          },
          userProfileInfo: {
            gdr: 'MALE',
            dob: '1990-01-01',
            zip: '',
            fn: fullName.toUpperCase(),
            zd: '',
            co: '',
            pi: '',
            tz: 'Asia/Kolkata',
            language: 'EN',
            lurl: ''
          },
          userDocuments: {},
          addressInfo: {
            address: '',
            pinCode: '',
            cityName: '',
            state: '',
            country: 'India'
          },
          contactPersonInfo: {
            name: fullName,
            mobileNumber: formData.mobileNumber,
            email: formData.email
          },
          businessInfo: {
            bstp: 'TRAVEL',
            bsn: '',
            rflcd: ''
          },
          securityInfo: {
            ip: '',
            di: navigator.userAgent,
            gl: ''
          },
          kycInfo: {
            ks: 'PENDING',
            ksa: new Date().toISOString()
          },
          lifeCycleInfo: {
            iat: new Date().toISOString(),
            aat: null,
            sat: null,
            ovat: null
          }
        };
        
        const response = await createSubUserApi(registerPayload);
        await sendVerificationEmailApi(formData.email);
        showToast('Sub user created successfully! Verification email sent to ' + formData.email, 'success');
      }
      
      handleCloseModal();
      fetchSubUsers();
    } catch (err) {
      showToast(err.message || 'Failed to save sub user', 'error');
    } finally {
      setLoading(false);
    }
  };



  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this sub user?')) {
      return;
    }

    setLoading(true);
    try {
      await deleteSubUserApi(userId);
      showToast('Sub user deleted successfully!', 'success');
      fetchSubUsers();
    } catch (err) {
      showToast(err.message || 'Failed to delete sub user', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="sub-users-page">
        <div className="sub-users-header">
          <div>
            <h2>Sub Users</h2>
            <p>Manage your sub users (Retailers & Distributors)</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="email"
              placeholder="Search by email..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                width: '250px'
              }}
            />
            <button className="btn-primary" onClick={() => handleOpenModal()}>
              + Add User
            </button>
          </div>
        </div>

        {loading && !showModal ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="sub-users-table-wrapper">
            <table className="sub-users-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Name</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">
                      {searchEmail ? 'No users found matching your search.' : 'No sub users found. Click "Add User" to create one.'}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((subUser) => (
                    <tr key={subUser.userId}>
                      <td>{subUser.title || 'Mr'}</td>
                      <td>{`${subUser.firstName || ''} ${subUser.lastName || ''}`.trim() || subUser.name || '-'}</td>
                      <td>{subUser.mobileNumber}</td>
                      <td>{subUser.email}</td>
                      <td>
                        <span className={`status-badge status-${(subUser.status || 'DISABLED')?.toLowerCase()}`}>
                          {subUser.status === 'DISABLED' || !subUser.status ? 'In-Active' : subUser.status === 'ENABLED' ? 'Active' : subUser.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-action btn-edit" 
                            onClick={() => handleOpenModal(subUser)}
                            title="Edit"
                          >
                            <img src={editIcon} alt="Edit" />
                          </button>
                          <button 
                            className="btn-action btn-delete" 
                            onClick={() => handleDelete(subUser.userId)}
                            title="Delete"
                          >
                            <img src={deleteIcon} alt="Delete" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{editingUser ? 'Edit Sub User' : 'Add Sub User'}</h3>
                <button className="modal-close" onClick={handleCloseModal}>×</button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Title *</label>
                    <select 
                      value={formData.title} 
                      onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                      required
                    >
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Miss">Miss</option>
                      <option value="Dr">Dr</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>First Name *</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => setFormData(p => ({ ...p, firstName: e.target.value }))}
                      placeholder="Enter first name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name *</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => setFormData(p => ({ ...p, lastName: e.target.value }))}
                      placeholder="Enter last name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input 
                      type="tel" 
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData(p => ({ ...p, mobileNumber: e.target.value }))}
                      placeholder="Enter 10-digit mobile"
                      maxLength={10}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder="Enter email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>User Type *</label>
                    <select 
                      value={formData.userType}
                      onChange={(e) => setFormData(p => ({ ...p, userType: e.target.value }))}
                      required
                    >
                      <option value="RETAILER">Retailer</option>
                      <option value="DISTRIBUTOR">Distributor</option>
                    </select>
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Saving...' : editingUser ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
