export default async function getLocations(req, res) {
  const locations = [
    {
      id: 1,
      title: 'CARDIFF',
      address: '#117 - 111 Chesterfield Dr Cardiff, CA, 92007',
      email: 'cardiff@smartfitmethod.com',
      phone: '(760) 276-6608',
      schedule: {
        weekdays: '06:00 AM - 07:00 PM',
        weekends: '08:00 AM - 02:00 PM',
      },
      days: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    },
    {
      id: 2,
      title: 'COSTA MESA',
      address: 'Suite E - 2675 Irvine Ave Costa Mesa, CA, 92627',
      email: 'costamesa@smartfitmethod.com',
      phone: '(760) 276-6608',
      schedule: {
        weekdays: '06:00 AM - 07:00 PM',
        weekends: '08:00 AM - 02:00 PM',
      },
      days: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    },
    {
      id: 3,
      title: 'KOLOA',
      address: 'Suite D203 - 5460 Koloa Rd Koloa, HI, 96756',
      email: 'koloa@smartfitmethod.com',
      phone: '(760) 276-6608',
      schedule: {
        weekdays: '06:00 AM - 07:00 PM',
        weekends: '08:00 AM - 02:00 PM',
      },
      days: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    },
    {
      id: 4,
      title: 'LA JOLLA',
      address: '#102 - 7863 Girard Ave La Jolla, CA, 92037',
      email: 'lajolla@smartfitmethod.com',
      phone: '(760) 276-6608',
      schedule: {
        weekdays: '06:00 AM - 07:00 PM',
        weekends: '08:00 AM - 02:00 PM',
      },
      days: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    },
    {
      id: 5,
      title: 'RANCHO SANTA FE',
      address: 'E5 - 16085 San Dieguito Rd Rancho Santa Fe, CA, 92091',
      email: 'rsf@smartfitmethod.com',
      phone: '(760) 276-6608',
      schedule: {
        weekdays: '06:00 AM - 07:00 PM',
        weekends: '08:00 AM - 02:00 PM',
      },
      days: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    },
    {
      id: 6,
      title: 'YORBA LINDA',
      address: '302 - 18220 Yorba Linda Blvd Yorba Linda, CA, 92886',
      email: 'yorbalinda@smartfitmethod.com',
      phone: '(760) 276-6608',
      schedule: {
        weekdays: '06:00 AM - 07:00 PM',
        weekends: '08:00 AM - 02:00 PM',
      },
      days: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    },
  ];

  res.status(200).json({ locations });
}
