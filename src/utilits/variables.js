export const HOSTNAME = process.env.HOSTNAME;

export const navLinks = [
  {
    name: 'Location',
    path: '/location',
  },
  {
    name: 'Services',
    path: '/services',
  },
  {
    name: 'Trainers',
    path: '/trainers',
  },
  {
    name: 'Media',
    path: '/media',
  },
  {
    name: 'Franchise',
    path: '/franchise',
  },
];

export const getProgress = (a, b) => Math.round((+a / +b) * 100);

export const locationMapStyles = [
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [
      {
        saturation: 36,
      },
      {
        color: '#333333',
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#ffffff',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#fefefe',
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#fefefe',
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dedede',
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f2f2f2',
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e9e9e9',
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        saturation: '0',
      },
      {
        lightness: '-13',
      },
    ],
  },
];

export const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Not specified', value: 'not specified' },
];

export const TYPE_OF_FRANCHISING_OPTIONS = [
  { id: 1, label: 'Group', value: 'group' },
  { id: 2, label: 'Individual', value: 'individual' },
];

export const CASH_TO_INVEST = [
  { id: 1, label: 'Under $150k in liquid capital', value: '<150000' },
  {
    id: 2,
    label: 'Under $150k in liquid capital but access to investors, partners and equity',
    value: '<150000+access',
  },
  { id: 3, label: '$450k+ in liquid capital', value: '$450k+' },
];

export const USA_STATES = [
  { abbreviation: 'AL', name: 'Alabama' },
  { abbreviation: 'AK', name: 'Alaska' },
  { abbreviation: 'AZ', name: 'Arizona' },
  { abbreviation: 'AR', name: 'Arkansas' },
  { abbreviation: 'CA', name: 'California' },
  { abbreviation: 'CO', name: 'Colorado' },
  { abbreviation: 'CT', name: 'Connecticut' },
  { abbreviation: 'DE', name: 'Delaware' },
  { abbreviation: 'FL', name: 'Florida' },
  { abbreviation: 'GA', name: 'Georgia' },
  { abbreviation: 'HI', name: 'Hawaii' },
  { abbreviation: 'ID', name: 'Idaho' },
  { abbreviation: 'IL', name: 'Illinois' },
  { abbreviation: 'IN', name: 'Indiana' },
  { abbreviation: 'IA', name: 'Iowa' },
  { abbreviation: 'KS', name: 'Kansas' },
  { abbreviation: 'KY', name: 'Kentucky' },
  { abbreviation: 'LA', name: 'Louisiana' },
  { abbreviation: 'ME', name: 'Maine' },
  { abbreviation: 'MD', name: 'Maryland' },
  { abbreviation: 'MA', name: 'Massachusetts' },
  { abbreviation: 'MI', name: 'Michigan' },
  { abbreviation: 'MN', name: 'Minnesota' },
  { abbreviation: 'MS', name: 'Mississippi' },
  { abbreviation: 'MO', name: 'Missouri' },
  { abbreviation: 'MT', name: 'Montana' },
  { abbreviation: 'NE', name: 'Nebraska' },
  { abbreviation: 'NV', name: 'Nevada' },
  { abbreviation: 'NH', name: 'New Hampshire' },
  { abbreviation: 'NJ', name: 'New Jersey' },
  { abbreviation: 'NM', name: 'New Mexico' },
  { abbreviation: 'NY', name: 'New York' },
  { abbreviation: 'NC', name: 'North Carolina' },
  { abbreviation: 'ND', name: 'North Dakota' },
  { abbreviation: 'OH', name: 'Ohio' },
  { abbreviation: 'OK', name: 'Oklahoma' },
  { abbreviation: 'OR', name: 'Oregon' },
  { abbreviation: 'PA', name: 'Pennsylvania' },
  { abbreviation: 'RI', name: 'Rhode Island' },
  { abbreviation: 'SC', name: 'South Carolina' },
  { abbreviation: 'SD', name: 'South Dakota' },
  { abbreviation: 'TN', name: 'Tennessee' },
  { abbreviation: 'TX', name: 'Texas' },
  { abbreviation: 'UT', name: 'Utah' },
  { abbreviation: 'VT', name: 'Vermont' },
  { abbreviation: 'VA', name: 'Virginia' },
  { abbreviation: 'WA', name: 'Washington' },
  { abbreviation: 'WV', name: 'West Virginia' },
  { abbreviation: 'WI', name: 'Wisconsin' },
  { abbreviation: 'WY', name: 'Wyoming' },
  { abbreviation: 'DC', name: 'District of Columbia' },
  { abbreviation: 'AS', name: 'American Samoa' },
  { abbreviation: 'GU', name: 'Guam' },
  { abbreviation: 'MP', name: 'Northern Mariana Islands' },
  { abbreviation: 'PR', name: 'Puerto Rico' },
  { abbreviation: 'UM', name: 'United States Minor Outlying Islands' },
  { abbreviation: 'VI', name: 'Virgin Islands, U.S.' },
];

export const USA_STATES_OPTIONS = [
  { label: '*Other', value: 'other' },
  ...USA_STATES.map((state) => ({ label: state.name, value: state.name })),
];

export const HEAR_ABOUT_US_OPTIONS = [
  { id: 1, label: '*Other', value: 'other' },
  { id: 2, label: 'Existing Member', value: 'Existing Member' },
  { id: 3, label: 'Newspaper or Magazine', value: 'Newspaper or Magazine' },
  { id: 4, label: 'Podcast', value: 'Podcast' },
  { id: 5, label: 'Radio', value: 'Radio' },
  { id: 6, label: 'Referral', value: 'Referral' },
  {
    id: 7,
    label: 'Search Engine (Google, Yahoo etc.)',
    value: 'Search Engine (Google, Yahoo etc.)',
  },
  {
    id: 8,
    label: 'Social Media (Facebook, Instagram etc)',
    value: 'Social Media (Facebook, Instagram etc)',
  },
  {
    id: 9,
    label: 'Website',
    value: 'Website',
  },
  {
    id: 10,
    label: 'Word of Mouth',
    value: 'Word of Mouth',
  },
];
