/*
{
  _id: string,
  author: string,
  content: string,
  date: string,
  rating: number,
  platform: string,
}

*/

export const mockupData = [
  {
    _id: '8f00fe0397c16035f8ca790f72fa8991',
    author: 'Kasheena Campbell Frazier',
    content:
      'Mary is great I don’t have to tell her anything she knows what to work on.  She’s great!',
    date: '2020-01-28T01:45:05Z',
    rating: 5,
    platform: 'Google',
  },
  {
    _id: 'ce7e82c10ce564a905d9c9694d7c3357',
    author: 'Sonny Nottle',
    content:
      'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.  Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    date: '2019-09-02T14:51:45Z',
    rating: 2,
    platform: 'Faccebook',
  },
  {
    _id: 'd1c11650f946bbfec3a726adebd9be4c',
    author: 'Dell Dulin',
    content:
      'Mikasa is great I don’t have to tell her anything she knows what to work on.  She’s awesome!',
    date: '2019-08-29T01:36:18Z',
    rating: 5,
    platform: 'Faccebook',
  },
  {
    _id: 'dee9a7f2fa16037bfe6dc6a3c3ab64d0',
    author: "Bartholomeus D'Abbot-Doyle",
    content:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.  Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.  Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.!',
    date: '2019-09-19T08:12:23Z',
    rating: 1,
    platform: 'Google',
  },
  {
    _id: 'b382af6b60ab0696139e0b537d1ad9fc',
    author: 'Brigitte Charters',
    content:
      'Mary is bad I have to tell her anything! She does not know what to work on.  She’s terrble!',
    date: '2018-09-05T08:30:55Z',
    rating: 1,
    platform: 'Yahoo',
  },
  {
    _id: '886e381dd2559c79baaecb0a3dd20889',
    author: 'Nobie MacGovern',
    content:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    date: '2020-06-25T21:56:56Z',
    rating: 3,
    platform: 'Yelp',
  },
  {
    _id: 'db01697696a11914d6a7cc23dc37db22',
    author: 'Eren Yeager',
    content:
      'Stefan is awesome!!! Nam nulla. Integer pede justo, lacinia eget, tincidunt eget. He rules!',
    date: '2019-02-17T11:47:33Z',
    rating: 5,
    platform: 'Google',
  },
];

export const homePageData = {
  reviewStats: {
    mentionsThisMonth: 0,
    mentionsAllTime: 1,
    averageRatingAllTime: 5,
  },
  reviewSiteMentions: [
    {
      numOfReviews: 2,
      platform: 'Weedmaps',
    },
    {
      numOfReviews: 1,
      platform: 'Google',
    },
    {
      numOfReviews: 0,
      platform: 'Eyerate',
    },
  ],
  reviewMentions: [
    {
      _id: '60dc2ad4cbf89a4e89ac5128',
      content:
        "Joe is always so friendly when going in. It's like buying from someone youve known 20 years, even if you just met him.",
      rating: 5,
      platform: 'Google',
      name: 'Michael Greenleaf',
      created_at: '2021-06-26T08:00:00.000Z',
    },
  ],
  earningsStats: {
    allTimeEarnings: 18.5,
    thisMonthEarnings: 11,
    leaderboardRank: 3650,
  },
};
