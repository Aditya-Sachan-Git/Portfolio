export interface CodingProfile {
  id: string
  number: string
  platform: string
  username: string
  url: string
  ariaLabel: string
}

export const codingProfiles: CodingProfile[] = [
  {
    id: 'leetcode',
    number: '01',
    platform: 'LeetCode',
    username: '@OFrRtEanY1',
    url: 'https://leetcode.com/u/OFrRtEanY1/',
    ariaLabel: "View Aditya Sachan's LeetCode profile (opens in new tab)",
  },
  {
    id: 'codechef',
    number: '02',
    platform: 'CodeChef',
    username: '@fine_rainbow',
    url: 'https://www.codechef.com/users/fine_rainbow/',
    ariaLabel: "View Aditya Sachan's CodeChef profile (opens in new tab)",
  },
]
