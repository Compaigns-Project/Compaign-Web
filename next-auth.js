import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  // Other configuration options...
  secret: 'YOUR_RANDOM_SECRET_STRING_HERE',
});
