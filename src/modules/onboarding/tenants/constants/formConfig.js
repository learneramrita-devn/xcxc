// Field config shape: { name, label, type, placeholder, required, col, options }

export const REGISTRATION_TYPES = {
  AGENCY:      'agency',
  API_PARTNER: 'api_partner',
  WHITELABEL:  'whitelabel',
  CORPORATE:   'corporate',
};

// UserType options per agentType
export const USER_TYPE_OPTIONS = {
  agency:    ['Retailer', 'Distributor'],
  api_partner: ['Admin', 'Sub Admin'],
  whitelabel:  ['Admin', 'Sub Admin'],
  corporate:   ['Admin', 'Sub Admin', 'Employee'],
};

// agentType backend values
export const AGENT_TYPE_BACKEND = {
  agency:    'AGENCY',
  api_partner: 'API_PARTNER',
  whitelabel:  'WHITE_LABEL',
  corporate:   'CORP_PARTNER',
};

// agentType display labels for selection
export const AGENT_TYPE_LABELS = [
  { value: 'agency',      label: 'Agent / Merchant' },
  { value: 'api_partner', label: 'API Partner' },
  { value: 'whitelabel',  label: 'White Label' },
  { value: 'corporate',   label: 'Corporate' },
];

export const STEP1_FIELDS = [
  { name: 'agencyName',        label: 'Agency Name',                  type: 'text',   placeholder: 'Enter agency name',              required: true,  col: 6 },
  { name: 'userType',          label: 'User Type',                    type: 'select', placeholder: 'Select User Type',               required: true,  col: 6, options: ['Retailer', 'Distributor'] },
  { name: 'firstName',         label: 'First Name (Director/ Owner)', type: 'text',   placeholder: 'Enter first name',               required: true,  col: 6 },
  { name: 'lastName',          label: 'Last Name',                    type: 'text',   placeholder: 'Enter last name',                required: true,  col: 6 },
  { name: 'email',             label: 'Email Address',                type: 'email',  placeholder: 'Enter email address',            required: true,  col: 6 },
  { name: 'referralCode',      label: 'Referral Code',                type: 'text',   placeholder: 'Enter referral code (optional)', required: false, col: 6 },
];

export const CORPORATE_STEP1_FIELDS = [
  { name: 'companyName',  label: 'Corporate Company Name',       type: 'text',   placeholder: 'Enter company name',         required: true,  col: 12 },
  { name: 'firstName',    label: 'First Name (Director/ Owner)', type: 'text',   placeholder: 'Enter first name',           required: true,  col: 6 },
  { name: 'lastName',     label: 'Last Name',                    type: 'text',   placeholder: 'Enter last name',            required: true,  col: 6 },
  { name: 'email',        label: 'Communication Email Address',  type: 'email',  placeholder: 'Enter email address',        required: true,  col: 6 },
  { name: 'userType',     label: 'User Type',                    type: 'select', placeholder: 'Select User Type',           required: true,  col: 6, options: ['Admin', 'Sub Admin', 'Employee'] },
  { name: 'gender',       label: 'Gender',                       type: 'select', placeholder: 'Select Gender',              required: true,  col: 6, options: ['MALE', 'FEMALE', 'OTHER'] },
  { name: 'dob',          label: 'Date of Birth',                type: 'date',   placeholder: 'Select date of birth',       required: true,  col: 6 },
  { name: 'referralCode', label: 'Reference',                    type: 'text',   placeholder: 'Enter reference (optional)', required: false, col: 6 },
];

export const FIRM_TYPE_FIELDS = {
  Proprietor: [
    { name: 'firmType', label: 'Firm Type',      type: 'select', placeholder: 'Select Firm Type', required: true,  col: 6, options: ['Proprietor'] },
    { name: 'gst',      label: 'GST Number',     type: 'text',   placeholder: 'Enter GST number',  required: false, col: 6 },
    { name: 'pan',      label: 'PAN Number',     type: 'text',   placeholder: 'Enter PAN number',  required: true,  col: 6 },
    { name: 'aadhaar',  label: 'Aadhaar Number', type: 'text',   placeholder: 'Enter Aadhaar',     required: true,  col: 6 },
    { name: 'pincode',  label: 'Pincode',        type: 'text',   placeholder: 'Enter pincode',     required: true,  col: 6 },
    { name: 'city',     label: 'City',           type: 'text',   placeholder: 'Enter city',        required: true,  col: 6 },
    { name: 'state',    label: 'State',          type: 'text',   placeholder: 'Enter state',       required: true,  col: 6 },
    { name: 'address',  label: 'Address',        type: 'text',   placeholder: 'Enter address',     required: true,  col: 12 },
  ],
  Partnership: [
    { name: 'firmType',        label: 'Firm Type',                  type: 'select', placeholder: 'Select Firm Type', required: true,  col: 6, options: ['Partnership'] },
    { name: 'gst',             label: 'GST Number',                 type: 'text',   placeholder: 'Enter GST number',  required: false, col: 6 },
    { name: 'partner1Pan',     label: 'Partner 1 : PAN Number',     type: 'text',   placeholder: 'Enter PAN number',  required: true,  col: 6 },
    { name: 'partner1Aadhaar', label: 'Partner 1 : Aadhaar Number', type: 'text',   placeholder: 'Enter Aadhaar',     required: true,  col: 6 },
    { name: 'partner2Pan',     label: 'Partner 2 : PAN Number',     type: 'text',   placeholder: 'Enter PAN number',  required: true,  col: 6 },
    { name: 'partner2Aadhaar', label: 'Partner 2 : Aadhaar Number', type: 'text',   placeholder: 'Enter Aadhaar',     required: true,  col: 6 },
    { name: 'pincode',         label: 'Pincode',                    type: 'text',   placeholder: 'Enter pincode',     required: true,  col: 6 },
    { name: 'city',            label: 'City',                       type: 'text',   placeholder: 'Enter city',        required: true,  col: 6 },
    { name: 'state',           label: 'State',                      type: 'text',   placeholder: 'Enter state',       required: true,  col: 6 },
    { name: 'address',         label: 'Address',                    type: 'text',   placeholder: 'Enter address',     required: true,  col: 12 },
  ],
  'Pvt Ltd': [
    { name: 'firmType',         label: 'Firm Type',                 type: 'select', placeholder: 'Select Firm Type', required: true,  col: 6, options: ['Pvt Ltd'] },
    { name: 'gst',              label: 'GST Number',                type: 'text',   placeholder: 'Enter GST number',  required: false, col: 6 },
    { name: 'director1Pan',     label: 'Director 1 PAN Number',     type: 'text',   placeholder: 'Enter PAN number',  required: true,  col: 6 },
    { name: 'director1Aadhaar', label: 'Director 1 Aadhaar Number', type: 'text',   placeholder: 'Enter Aadhaar',     required: true,  col: 6 },
    { name: 'director2Pan',     label: 'Director 2 PAN Number',     type: 'text',   placeholder: 'Enter PAN number',  required: true,  col: 6 },
    { name: 'director2Aadhaar', label: 'Director 2 Aadhaar Number', type: 'text',   placeholder: 'Enter Aadhaar',     required: true,  col: 6 },
    { name: 'companyPan',       label: 'Company/LLP PAN Number',    type: 'text',   placeholder: 'Enter PAN number',  required: true,  col: 6 },
    { name: 'cin',              label: 'CIN',                       type: 'text',   placeholder: 'Enter CIN',         required: true,  col: 6 },
    { name: 'pincode',          label: 'Pincode',                   type: 'text',   placeholder: 'Enter pincode',     required: true,  col: 6 },
    { name: 'city',             label: 'City',                      type: 'text',   placeholder: 'Enter city',        required: true,  col: 6 },
    { name: 'state',            label: 'State',                     type: 'text',   placeholder: 'Enter state',       required: true,  col: 6 },
    { name: 'address',          label: 'Address',                   type: 'text',   placeholder: 'Enter address',     required: true,  col: 12 },
  ],
  OPC: [
    { name: 'firmType',        label: 'Firm Type',              type: 'select', placeholder: 'Select Firm Type', required: true,  col: 6, options: ['OPC'] },
    { name: 'gst',             label: 'GST Number',             type: 'text',   placeholder: 'Enter GST number',  required: false, col: 6 },
    { name: 'directorPan',     label: 'Director PAN Number',    type: 'text',   placeholder: 'Enter PAN number',  required: true,  col: 6 },
    { name: 'directorAadhaar', label: 'Director Aadhaar Number',type: 'text',   placeholder: 'Enter Aadhaar',     required: true,  col: 6 },
    { name: 'companyPan',      label: 'Company/LLP PAN Number', type: 'text',   placeholder: 'Enter PAN number',  required: true,  col: 6 },
    { name: 'cin',             label: 'CIN',                    type: 'text',   placeholder: 'Enter CIN',         required: true,  col: 6 },
    { name: 'pincode',         label: 'Pincode',                type: 'text',   placeholder: 'Enter pincode',     required: true,  col: 6 },
    { name: 'city',            label: 'City',                   type: 'text',   placeholder: 'Enter city',        required: true,  col: 6 },
    { name: 'state',           label: 'State',                  type: 'text',   placeholder: 'Enter state',       required: true,  col: 6 },
    { name: 'address',         label: 'Address',                type: 'text',   placeholder: 'Enter address',     required: true,  col: 12 },
  ],
};

export const API_PARTNER_STEP1_FIELDS = [
  { name: 'companyName',  label: 'API Partner Company Name',     type: 'text',   placeholder: 'Enter company name',         required: true,  col: 12 },
  { name: 'firstName',    label: 'First Name (Director/ Owner)', type: 'text',   placeholder: 'Enter first name',           required: true,  col: 6 },
  { name: 'lastName',     label: 'Last Name',                    type: 'text',   placeholder: 'Enter last name',            required: true,  col: 6 },
  { name: 'email',        label: 'Communication Email Address',  type: 'email',  placeholder: 'Enter email address',        required: true,  col: 6 },
  { name: 'userType',     label: 'User Type',                    type: 'select', placeholder: 'Select User Type',           required: true,  col: 6, options: ['Admin', 'Sub Admin'] },
  { name: 'gender',       label: 'Gender',                       type: 'select', placeholder: 'Select Gender',              required: true,  col: 6, options: ['MALE', 'FEMALE', 'OTHER'] },
  { name: 'dob',          label: 'Date of Birth',                type: 'date',   placeholder: 'Select date of birth',       required: true,  col: 6 },
  { name: 'referralCode', label: 'Reference',                    type: 'text',   placeholder: 'Enter reference (optional)', required: false, col: 6 },
];

export const WHITELABEL_STEP1_FIELDS = [
  { name: 'companyName',  label: 'Whitelabel Company Name',      type: 'text',   placeholder: 'Enter company name',         required: true,  col: 12 },
  { name: 'firstName',    label: 'First Name (Director/ Owner)', type: 'text',   placeholder: 'Enter first name',           required: true,  col: 6 },
  { name: 'lastName',     label: 'Last Name',                    type: 'text',   placeholder: 'Enter last name',            required: true,  col: 6 },
  { name: 'email',        label: 'Communication Email Address',  type: 'email',  placeholder: 'Enter email address',        required: true,  col: 6 },
  { name: 'userType',     label: 'User Type',                    type: 'select', placeholder: 'Select User Type',           required: true,  col: 6, options: ['Admin', 'Sub Admin'] },
  { name: 'gender',       label: 'Gender',                       type: 'select', placeholder: 'Select Gender',              required: true,  col: 6, options: ['MALE', 'FEMALE', 'OTHER'] },
  { name: 'dob',          label: 'Date of Birth',                type: 'date',   placeholder: 'Select date of birth',       required: true,  col: 6 },
  { name: 'referralCode', label: 'Reference',                    type: 'text',   placeholder: 'Enter reference (optional)', required: false, col: 6 },
];

export const STEP3_FIELDS = [
  { name: 'password',        label: 'Password',         type: 'password', placeholder: 'Enter password',        required: true, col: 12 },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm your password', required: true, col: 12 },
];
